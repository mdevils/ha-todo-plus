// Shared types for the Todo Plus card.

export type Priority = 'low' | 'normal' | 'high';
export type Unit = 'days' | 'weeks' | 'months';
export type Mode = 'after_completion' | 'fixed';
export type Status = 'needs_action' | 'completed';

/** iCal RRULE frequency (fixed mode). */
export type Freq = 'daily' | 'weekly' | 'monthly' | 'yearly';
/** iCal BYDAY weekday code. */
export type Weekday = 'MO' | 'TU' | 'WE' | 'TH' | 'FR' | 'SA' | 'SU';

/** Next occurrence scheduled `interval` `unit`s after the task is completed. */
export interface AfterCompletionRecurrence {
  mode: 'after_completion';
  interval: number;
  unit: Unit;
}

/** A fixed calendar schedule described by an iCal RRULE. Mirrors the structured
 *  fields the integration stores/serves; unused parts are `null`. */
export interface FixedRecurrence {
  mode: 'fixed';
  freq: Freq;
  interval: number;
  byday?: Weekday[] | null;
  bymonthday?: number | null;
  bysetpos?: number | null;
  bymonth?: number | null;
  count?: number | null;
  until?: string | null;
}

export type Recurrence = AfterCompletionRecurrence | FixedRecurrence;

/** An assignable person, from a `person.*` entity. A task's `assignee` stores the id. */
export interface Person {
  id: string;
  name: string;
}

/** One task as published by the integration in the entity's `tasks` attribute. */
export interface Task {
  uid: string;
  summary: string;
  description: string | null;
  status: Status;
  due: string | null;
  start: string | null;
  priority: Priority;
  assignee: string | null;
  recurrence: Recurrence | null;
}

export interface HassEntity {
  state: string;
  attributes: Record<string, unknown> & {
    friendly_name?: string;
    tasks?: Task[];
  };
}

/** Home Assistant's `FrontendLocaleData` (the subset the card uses). `language`
 *  may be the sentinel `"system"`, meaning "use the browser/OS locale". */
export interface Locale {
  language: string;
  number_format?: string;
  time_format?: string;
  date_format?: string;
  time_zone?: string;
  first_weekday?: string;
}

/** The subset of Home Assistant's `hass` object the card uses. */
export interface Hass {
  states: Record<string, HassEntity>;
  locale?: Locale;
  callService(domain: string, service: string, data?: Record<string, unknown>): Promise<unknown>;
}

/** A group of tasks shown under its own heading.
 *  - `todo`: actionable now.
 *  - `scheduled`: not yet actionable — a future start (upcoming recurring
 *    occurrence) or a due date still in the future.
 *  - `completed`: done. */
export type Section = 'todo' | 'scheduled' | 'completed';

/** An action a button can trigger. */
export type Action = 'add_task' | 'clear_completed';

/** Button fill. The first five map to a Home Assistant primary/accent colour
 *  variable; `subtle` is a semi-transparent tint. Defaults to `primary`. */
export type ButtonVariant = 'primary' | 'dark' | 'darker' | 'light' | 'accent' | 'subtle';

/** Button size. Defaults to `medium` (sections default to `small`). */
export type ButtonSize = 'small' | 'medium' | 'large';

/** A configurable button (used in the header and, later, elsewhere). */
export interface ActionButton {
  action: Action;
  /** Label. Omit for the action's default; `null`/`""` for an icon-only button. */
  text?: string | null;
  /** MDI icon name. Omit for the action's default; `null`/`""` for no icon. */
  icon?: string | null;
  /** Keep the button when it would otherwise auto-hide (e.g. `clear_completed`
   *  with nothing to clear). */
  persist?: boolean;
  /** Fill colour. Defaults to `primary`. */
  variant?: ButtonVariant;
  /** Size. Overrides the surrounding context's default. */
  size?: ButtonSize;
}

/** How a row of buttons is distributed across its width. */
export type ButtonsAlign = 'left' | 'right' | 'center' | 'space_around' | 'space_between';

/** One block in the card layout, rendered top-to-bottom in `layout` order. */
export type LayoutItem =
  | {
      type: 'header';
      /** Heading text. Omit for the card title; `null`/`""` hides it. */
      title?: string | null;
      buttons?: ActionButton[];
    }
  | {
      type: 'todo';
      /** When the Completed block is absent, keep a just-checked item here
       *  (struck-through) until the page reloads. Defaults to true. */
      linger_completed?: boolean;
      /** Heading text. Omit for the default label; `null`/`""` hides it. */
      title?: string | null;
      /** Buttons shown to the right of the section header. */
      buttons?: ActionButton[];
    }
  | { type: 'scheduled'; title?: string | null; buttons?: ActionButton[] }
  | { type: 'completed'; title?: string | null; buttons?: ActionButton[] }
  /** `placeholder` overrides the input's placeholder text. */
  | { type: 'quick_add'; placeholder?: string }
  /** A standalone row of buttons. `align` defaults to `left`. */
  | { type: 'buttons'; buttons: ActionButton[]; align?: ButtonsAlign }
  /** A message shown only when there are no tasks at all. `text` overrides the
   *  default. */
  | { type: 'empty'; text?: string }
  /** Separators are dropped unless they sit between two visible blocks; set
   *  `persist` to always render them (leading/trailing/consecutive included). */
  | { type: 'divider'; persist?: boolean }
  /** `height` is the gap in pixels (defaults to 12). */
  | { type: 'spacer'; persist?: boolean; height?: number };

export interface CardConfig {
  type: string;
  entity: string;
  title?: string;
  /** Ordered blocks: task sections, a quick-add input, and dividers. */
  layout?: LayoutItem[];
}

/** Values read from the add/edit dialog. */
export interface FormValues {
  summary: string;
  description: string;
  due: string;
  start: string;
  priority: Priority;
  assignee: string;
  recurring: boolean;
  interval: number;
  unit: Unit;
  mode: Mode;
}

/** Context passed to the pure render functions. */
export interface RenderCtx {
  t: (key: string) => string;
  fmtDate: (iso: string | null) => string;
  persons: string[];
}
