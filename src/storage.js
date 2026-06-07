/**
 * storage.js — all data persistence via the local Express server
 * Data lives in data/progress.json and data/weekplans.json on your machine.
 * Nothing goes to the internet.
 */

// ── Progress entries ──────────────────────────────────────────────────────────

export async function loadEntries() {
  try {
    const res = await fetch('/api/entries');
    if (!res.ok) return [];
    return await res.json();
  } catch {
    console.warn('Could not reach local server. Is server.js running?');
    return [];
  }
}

export async function saveEntry(entry) {
  try {
    const res = await fetch('/api/entries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry),
    });
    return res.ok;
  } catch {
    console.warn('Could not save entry — is server.js running?');
    return false;
  }
}

// ── Week plans ────────────────────────────────────────────────────────────────

export async function loadWeekPlans() {
  try {
    const res = await fetch('/api/weekplans');
    if (!res.ok) return {};
    return await res.json();
  } catch {
    return {};
  }
}

export async function saveWeekPlan(weekOf, plan) {
  try {
    const res = await fetch('/api/weekplans', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ weekOf, plan }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

// ── Weekly export text ────────────────────────────────────────────────────────

export async function fetchExport() {
  try {
    const res = await fetch('/api/export');
    if (!res.ok) return 'Error fetching export.';
    return await res.text();
  } catch {
    return 'Could not reach server. Make sure server.js is running (npm start).';
  }
}

// ── API key (localStorage — not sensitive, just config) ───────────────────────

export function loadApiKey() {
  return localStorage.getItem('reza_apikey_v1') || '';
}

export function saveApiKey(key) {
  localStorage.setItem('reza_apikey_v1', key);
}

// ── Date helpers ──────────────────────────────────────────────────────────────

export function todayStr() {
  return new Date().toLocaleDateString('en-CA');
}

export function displayDate(str) {
  return new Date(str + 'T12:00:00').toLocaleDateString('en-CA', {
    weekday: 'short', month: 'short', day: 'numeric',
  });
}

// ── Stat calculators ──────────────────────────────────────────────────────────

export function calcStreak(entries) {
  let streak = 0;
  for (let i = 0; i < 60; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const ds = d.toLocaleDateString('en-CA');
    const e = entries.find(x => x.date === ds);
    if (e && e.duration > 0) streak++;
    else break;
  }
  return streak;
}

export function calcTotalMins(entries) {
  return entries.reduce((a, e) => a + (e.duration || 0), 0);
}

export function calcWeekMins(entries) {
  const weekStart = new Date();
  weekStart.setDate(weekStart.getDate() - weekStart.getDay());
  const ws = weekStart.toLocaleDateString('en-CA');
  return entries.filter(e => e.date >= ws).reduce((a, e) => a + (e.duration || 0), 0);
}

export function calcMonthMins(entries) {
  const now = new Date();
  const monthStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  return entries.filter(e => e.date.startsWith(monthStr)).reduce((a, e) => a + (e.duration || 0), 0);
}

export function calcBlogCount(entries) {
  return entries.filter(e =>
    (e.tasks || []).some(t => t.toLowerCase().includes('blog'))
  ).length;
}
