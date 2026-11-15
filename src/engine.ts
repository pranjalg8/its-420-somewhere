import type { Place } from './places';

const secFmt = new Map<string, Intl.DateTimeFormat>();
const clockFmt = new Map<string, Intl.DateTimeFormat>();

function getFmt(cache: Map<string, Intl.DateTimeFormat>, tz: string, opts: Intl.DateTimeFormatOptions) {
  let f = cache.get(tz);
  if (!f) {
    f = new Intl.DateTimeFormat('en-US', { timeZone: tz, ...opts });
    cache.set(tz, f);
  }
  return f;
}

/** Seconds elapsed since local midnight in the given zone. */
export function secondsOfDay(d: Date, tz: string): number {
  const parts = getFmt(secFmt, tz, { hourCycle: 'h23', hour: 'numeric', minute: 'numeric', second: 'numeric' }).formatToParts(d);
  let h = 0, m = 0, s = 0;
  for (const p of parts) {
    if (p.type === 'hour') h = +p.value % 24;
    else if (p.type === 'minute') m = +p.value;
    else if (p.type === 'second') s = +p.value;
  }
  return h * 3600 + m * 60 + s;
}

export function clock(d: Date, tz: string): string {
  return getFmt(clockFmt, tz, { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true }).format(d);
}

const DAY = 86400;
const TARGETS = [
  { at: 4 * 3600 + 20 * 60, label: '4:20 AM' },
  { at: 16 * 3600 + 20 * 60, label: '4:20 PM' },
];

export interface Status {
  place: Place;
  now: boolean;
  /** Seconds until the next 4:20 starts (0 while it is 4:20). */
  until: number;
  /** Seconds left in the current 4:20 minute (only when now). */
  remaining: number;
  label: string;
}

export function statusFor(place: Place, d: Date): Status {
  const s = secondsOfDay(d, place.tz);
  let best = { until: Infinity, label: '' };
  for (const t of TARGETS) {
    if (s >= t.at && s < t.at + 60) {
      return { place, now: true, until: 0, remaining: t.at + 60 - s, label: t.label };
    }
    const delta = (t.at - s + DAY) % DAY;
    if (delta < best.until) best = { until: delta, label: t.label };
  }
  return { place, now: false, until: best.until, remaining: 0, label: best.label };
}

/** All places sorted by how soon their 4:20 arrives. */
export function rank(places: Place[], d: Date): Status[] {
  return places.map((p) => statusFor(p, d)).sort((a, b) => a.until - b.until);
}

export function hms(total: number): string {
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const pad = (n: number) => String(n).padStart(2, '0');
  return h > 0 ? `${h}h ${pad(m)}m ${pad(s)}s` : `${m}m ${pad(s)}s`;
}

export function flag(cc: string): string {
  return cc.toUpperCase().replace(/./g, (c) => String.fromCodePoint(127397 + c.charCodeAt(0)));
}
