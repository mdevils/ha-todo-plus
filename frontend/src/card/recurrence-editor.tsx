import { Fragment, h } from 'preact';
import { useMemo } from 'preact/hooks';

import { DatePicker } from '../components/date-picker';
import { Row } from '../components/row';
import { Select, type SelectOption } from '../components/select';
import { TextField } from '../components/text-field';
import { FREQS, MODE_VALUES, UNITS, WEEKDAYS } from '../constants';
import { css } from '../dom/css';
import { registerCss } from '../dom/css-registry';
import { useLocale } from '../providers/locale';
import { T } from '../providers/translations';
import type { FixedRecurrence, Freq, Mode, Recurrence, Unit, Weekday } from '../types';

/** Flat builder state for the recurrence editor. Keeps a value for every branch
 *  so toggling mode/frequency preserves what the user already typed. */
export interface RecurrenceDraft {
  mode: Mode;
  interval: number;
  unit: Unit; // after_completion
  freq: Freq; // fixed
  weekdays: Weekday[]; // fixed weekly (BYDAY)
  monthlyMode: 'day' | 'weekday'; // fixed monthly/yearly pattern
  monthday: number; // BYMONTHDAY: 1..31, or -1 (last day)
  setpos: number; // BYSETPOS: 1..4, or -1 (last)
  weekday: Weekday; // the weekday for the nth-weekday pattern
  month: number; // BYMONTH: 1..12 (yearly)
  end: 'never' | 'count' | 'until';
  count: number; // COUNT
  until: string; // UNTIL (YYYY-MM-DD)
}

export function defaultRecurrenceDraft(): RecurrenceDraft {
  return {
    mode: 'after_completion',
    interval: 1,
    unit: 'months',
    freq: 'weekly',
    weekdays: [],
    monthlyMode: 'day',
    monthday: 1,
    setpos: 1,
    weekday: 'MO',
    month: 1,
    end: 'never',
    count: 10,
    until: '',
  };
}

/** Populate the builder from a task's stored recurrence (for editing). */
export function recurrenceDraftFromTask(
  recurrence: Recurrence | null | undefined,
): RecurrenceDraft {
  const draft = defaultRecurrenceDraft();
  if (!recurrence) return draft;
  if (recurrence.mode === 'after_completion') {
    return {
      ...draft,
      mode: 'after_completion',
      interval: recurrence.interval,
      unit: recurrence.unit,
    };
  }
  const next: RecurrenceDraft = {
    ...draft,
    mode: 'fixed',
    freq: recurrence.freq,
    interval: recurrence.interval,
  };
  if (recurrence.freq === 'weekly') {
    next.weekdays = recurrence.byday ?? [];
  } else if (recurrence.freq === 'monthly' || recurrence.freq === 'yearly') {
    if (recurrence.bysetpos != null) {
      next.monthlyMode = 'weekday';
      next.setpos = recurrence.bysetpos;
      next.weekday = recurrence.byday?.[0] ?? 'MO';
    } else if (recurrence.bymonthday != null) {
      next.monthlyMode = 'day';
      next.monthday = recurrence.bymonthday;
    }
  }
  if (recurrence.freq === 'yearly' && recurrence.bymonth != null) next.month = recurrence.bymonth;
  if (recurrence.count != null) {
    next.end = 'count';
    next.count = recurrence.count;
  } else if (recurrence.until) {
    next.end = 'until';
    next.until = recurrence.until;
  }
  return next;
}

/** Collapse the builder state into the canonical structured recurrence. */
export function recurrenceToValue(draft: RecurrenceDraft): Recurrence {
  if (draft.mode === 'after_completion') {
    return { mode: 'after_completion', interval: Math.max(1, draft.interval), unit: draft.unit };
  }
  const value: FixedRecurrence = {
    mode: 'fixed',
    freq: draft.freq,
    interval: Math.max(1, draft.interval),
    byday: null,
    bymonthday: null,
    bysetpos: null,
    bymonth: null,
    count: null,
    until: null,
  };
  if (draft.freq === 'weekly') {
    value.byday = draft.weekdays.length ? [...draft.weekdays] : null;
  } else if (draft.freq === 'monthly' || draft.freq === 'yearly') {
    if (draft.monthlyMode === 'weekday') {
      value.byday = [draft.weekday];
      value.bysetpos = draft.setpos;
    } else {
      value.bymonthday = draft.monthday;
    }
    if (draft.freq === 'yearly') value.bymonth = draft.month;
  }
  if (draft.end === 'count') value.count = Math.max(1, draft.count);
  else if (draft.end === 'until' && draft.until) value.until = draft.until;
  return value;
}

/** The structured recurrence as service-call fields (nulls/empties omitted). */
export function recurrenceServiceData(recurrence: Recurrence): Record<string, unknown> {
  if (recurrence.mode === 'after_completion') {
    return { mode: 'after_completion', interval: recurrence.interval, unit: recurrence.unit };
  }
  const data: Record<string, unknown> = {
    mode: 'fixed',
    freq: recurrence.freq,
    interval: recurrence.interval,
  };
  if (recurrence.byday && recurrence.byday.length) data.byday = recurrence.byday;
  if (recurrence.bymonthday != null) data.bymonthday = recurrence.bymonthday;
  if (recurrence.bysetpos != null) data.bysetpos = recurrence.bysetpos;
  if (recurrence.bymonth != null) data.bymonth = recurrence.bymonth;
  if (recurrence.count != null) data.count = recurrence.count;
  if (recurrence.until) data.until = recurrence.until;
  return data;
}

export function RecurrenceEditor({
  value,
  onPatch,
}: {
  value: RecurrenceDraft;
  onPatch: (patch: Partial<RecurrenceDraft>) => void;
}) {
  const { language } = useLocale();
  // `"system"` -> browser/OS locale, mirroring how dates are formatted.
  const loc = language === 'system' ? undefined : language;

  // Localised weekday/month names via Intl (2024-01-01 is a Monday).
  const weekdayShort = useMemo(() => {
    const fmt = new Intl.DateTimeFormat(loc, { weekday: 'short' });
    return WEEKDAYS.map((_, i) => fmt.format(new Date(2024, 0, 1 + i)));
  }, [loc]);
  const weekdayLong = useMemo(() => {
    const fmt = new Intl.DateTimeFormat(loc, { weekday: 'long' });
    return WEEKDAYS.map((_, i) => fmt.format(new Date(2024, 0, 1 + i)));
  }, [loc]);
  const monthLong = useMemo(() => {
    const fmt = new Intl.DateTimeFormat(loc, { month: 'long' });
    return Array.from({ length: 12 }, (_, m) => fmt.format(new Date(2024, m, 1)));
  }, [loc]);

  const modeOptions: SelectOption<Mode>[] = MODE_VALUES.map((mode) => ({
    value: mode,
    label: <T token={`card.mode_${mode}`} />,
  }));
  const unitOptions: SelectOption<Unit>[] = UNITS.map((unit) => ({
    value: unit,
    label: <T token={`card.unit_${unit}`} />,
  }));
  const freqOptions: SelectOption<Freq>[] = FREQS.map((freq) => ({
    value: freq,
    label: <T token={`card.freq_${freq}`} />,
  }));
  const monthlyModeOptions: SelectOption<'day' | 'weekday'>[] = [
    { value: 'day', label: <T token="card.by_monthday" /> },
    { value: 'weekday', label: <T token="card.by_weekday" /> },
  ];
  const posOptions: SelectOption<string>[] = [
    { value: '1', label: <T token="card.pos_1" /> },
    { value: '2', label: <T token="card.pos_2" /> },
    { value: '3', label: <T token="card.pos_3" /> },
    { value: '4', label: <T token="card.pos_4" /> },
    { value: '-1', label: <T token="card.pos_last" /> },
  ];
  const weekdayOptions: SelectOption<Weekday>[] = WEEKDAYS.map((wd, i) => ({
    value: wd,
    label: weekdayLong[i],
  }));
  const monthOptions: SelectOption<string>[] = monthLong.map((name, i) => ({
    value: String(i + 1),
    label: name,
  }));
  const monthdayOptions: SelectOption<string>[] = [
    ...Array.from({ length: 31 }, (_, i) => ({ value: String(i + 1), label: String(i + 1) })),
    { value: '-1', label: <T token="card.day_last" /> },
  ];
  const endOptions: SelectOption<RecurrenceDraft['end']>[] = [
    { value: 'never', label: <T token="card.ends_never" /> },
    { value: 'count', label: <T token="card.ends_after" /> },
    { value: 'until', label: <T token="card.ends_on" /> },
  ];

  const toggleWeekday = (wd: Weekday) => {
    const chosen = new Set(value.weekdays);
    if (chosen.has(wd)) chosen.delete(wd);
    else chosen.add(wd);
    onPatch({ weekdays: WEEKDAYS.filter((d) => chosen.has(d)) });
  };

  const intervalField = (
    <TextField
      label={<T token="card.every" />}
      type="number"
      min={1}
      max={999}
      value={String(value.interval)}
      onChange={(v) => onPatch({ interval: parseInt(v, 10) || 1 })}
    />
  );

  return (
    <div class="recurrence">
      <Select
        label={<T token="card.mode" />}
        value={value.mode}
        options={modeOptions}
        onChange={(mode) => onPatch({ mode })}
      />

      {value.mode === 'after_completion' ? (
        <Row>
          {intervalField}
          <Select
            label={<T token="card.unit" />}
            value={value.unit}
            options={unitOptions}
            onChange={(unit) => onPatch({ unit })}
          />
        </Row>
      ) : (
        <Fragment>
          <Row>
            {intervalField}
            <Select
              label={<T token="card.unit" />}
              value={value.freq}
              options={freqOptions}
              onChange={(freq) => onPatch({ freq })}
            />
          </Row>

          {value.freq === 'weekly' && (
            <div class="weekday-row" role="group">
              {WEEKDAYS.map((wd, i) => (
                <button
                  type="button"
                  key={wd}
                  class="weekday"
                  data-selected={value.weekdays.includes(wd) || undefined}
                  aria-pressed={value.weekdays.includes(wd)}
                  onClick={() => toggleWeekday(wd)}
                >
                  {weekdayShort[i]}
                </button>
              ))}
            </div>
          )}

          {(value.freq === 'monthly' || value.freq === 'yearly') && (
            <Fragment>
              {value.freq === 'yearly' && (
                <Select
                  label={<T token="card.month" />}
                  value={String(value.month)}
                  options={monthOptions}
                  onChange={(v) => onPatch({ month: parseInt(v, 10) })}
                />
              )}
              <Select
                label={<T token="card.on" />}
                value={value.monthlyMode}
                options={monthlyModeOptions}
                onChange={(monthlyMode) => onPatch({ monthlyMode })}
              />
              {value.monthlyMode === 'day' ? (
                <Select
                  label={<T token="card.day" />}
                  value={String(value.monthday)}
                  options={monthdayOptions}
                  onChange={(v) => onPatch({ monthday: parseInt(v, 10) })}
                />
              ) : (
                <Row>
                  <Select
                    label={<T token="card.which" />}
                    value={String(value.setpos)}
                    options={posOptions}
                    onChange={(v) => onPatch({ setpos: parseInt(v, 10) })}
                  />
                  <Select
                    label={<T token="card.weekday" />}
                    value={value.weekday}
                    options={weekdayOptions}
                    onChange={(weekday) => onPatch({ weekday })}
                  />
                </Row>
              )}
            </Fragment>
          )}

          <Row>
            <Select
              label={<T token="card.ends" />}
              value={value.end}
              options={endOptions}
              onChange={(end) => onPatch({ end })}
            />
            {value.end === 'count' && (
              <TextField
                label={<T token="card.occurrences" />}
                type="number"
                min={1}
                max={9999}
                value={String(value.count)}
                onChange={(v) => onPatch({ count: parseInt(v, 10) || 1 })}
              />
            )}
            {value.end === 'until' && (
              <DatePicker
                label={<T token="card.ends_on" />}
                value={value.until}
                onChange={(until) => onPatch({ until })}
              />
            )}
          </Row>
        </Fragment>
      )}

      <p class="recurrence-hint">
        <T token="card.hint" />
      </p>
    </div>
  );
}

registerCss(css`
  .recurrence {
    border: 1px solid var(--divider-color);
    border-radius: 8px;
    padding: 10px;
    margin-bottom: 12px;
  }
  .recurrence-hint {
    margin: 0;
    font-size: 0.74rem;
    color: var(--secondary-text-color);
  }
  .weekday-row {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 12px;
  }
  .weekday {
    min-width: 34px;
    padding: 6px 8px;
    border: 1px solid var(--divider-color);
    border-radius: 16px;
    background: none;
    color: var(--primary-text-color);
    cursor: pointer;
    font: inherit;
    font-size: 0.82rem;
  }
  .weekday[data-selected] {
    background: var(--primary-color);
    color: var(--text-primary-color, #fff);
    border-color: var(--primary-color);
  }
`);
