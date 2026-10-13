import type { Freq, LayoutItem, Mode, Priority, Unit, Weekday } from './types';

export const UNITS: Unit[] = ['days', 'weeks', 'months'];
export const MODE_VALUES: Mode[] = ['after_completion', 'fixed'];
export const FREQS: Freq[] = ['daily', 'weekly', 'monthly', 'yearly'];
export const WEEKDAYS: Weekday[] = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];
export const PRIORITIES: Priority[] = ['low', 'normal', 'high'];
export const PRIO_RANK: Record<Priority, number> = { high: 0, normal: 1, low: 2 };
export const DEFAULT_LAYOUT: LayoutItem[] = [
  { type: 'header' },
  { type: 'empty' },
  { type: 'todo', title: null },
  { type: 'quick_add' },
  { type: 'spacer', height: 24 },
  { type: 'completed', buttons: [{ action: 'clear_completed', text: null, variant: 'subtle' }] },
  { type: 'scheduled', buttons: [{ action: 'add_task', text: null, variant: 'subtle' }] },
];
