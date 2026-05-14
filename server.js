/**
 * server.js — production server for the containerized Reza's Plan app
 *
 * In production (Docker):
 *   - Serves the built React app from /dist as static files
 *   - Serves the API on the same port
 *   - Data is saved to /app/data/progress.json inside the container
 *     which is mounted as a volume so it persists
 *
 * Endpoints:
 *   GET  /api/entries   — load all entries
 *   POST /api/entries   — save one entry
 *   GET  /api/export    — plain-text weekly summary to paste to Claude
 *   GET  /*             — serves the React app (catch-all)
 */

import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// In Docker: data lives in /app/data (mounted as a volume)
// Locally:   data lives next to server.js in ./data
const DATA_FILE = path.join(__dirname, 'data', 'progress.json');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());

// ── Serve built React app as static files ─────────────────────────────────────
const DIST = path.join(__dirname, 'dist');
if (fs.existsSync(DIST)) {
  app.use(express.static(DIST));
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function readEntries() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch { return []; }
}

function writeEntries(entries) {
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(entries, null, 2), 'utf8');
}

// ── GET /api/entries ──────────────────────────────────────────────────────────
app.get('/api/entries', (req, res) => {
  res.json(readEntries());
});

// ── POST /api/entries ─────────────────────────────────────────────────────────
app.post('/api/entries', (req, res) => {
  const entry = req.body;
  if (!entry?.date) return res.status(400).json({ error: 'entry must have a date' });
  const entries = readEntries();
  const idx = entries.findIndex(e => e.date === entry.date);
  if (idx >= 0) entries[idx] = entry;
  else { entries.unshift(entry); entries.sort((a, b) => b.date.localeCompare(a.date)); }
  writeEntries(entries);
  res.json({ ok: true, total: entries.length });
});

// ── GET /api/export ───────────────────────────────────────────────────────────
app.get('/api/export', (req, res) => {
  const entries = readEntries();
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 7);
  const cutoffStr = cutoff.toLocaleDateString('en-CA');
  const week = entries.filter(e => e.date >= cutoffStr);

  const totalDays = entries.filter(e => e.duration > 0).length;
  const totalMins = entries.reduce((a, e) => a + (e.duration || 0), 0);
  const blogCount = entries.filter(e => (e.tasks || []).some(t => t.toLowerCase().includes('blog'))).length;
  const weekMins  = week.reduce((a, e) => a + (e.duration || 0), 0);
  const weekDays  = week.filter(e => e.duration > 0).length;

  const lines = [
    '=== REZA WEEKLY PROGRESS SUMMARY ===',
    `Generated: ${new Date().toLocaleDateString('en-CA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`,
    '',
    '── ALL-TIME TOTALS ──',
    `Study days logged : ${totalDays}`,
    `Total time studied: ${Math.round(totalMins / 60 * 10) / 10}h (${totalMins} min)`,
    `Blog posts logged : ${blogCount + 2} (includes 2 Ansible posts from before app)`,
    '',
    '── THIS WEEK ──',
    `Active study days : ${weekDays} / 5 target`,
    `Total time        : ${weekMins} min (Basic target: 270 min | Pro target: 600 min)`,
    '',
  ];

  if (week.length === 0) {
    lines.push('No entries logged this week.');
  } else {
    lines.push('Daily breakdown:');
    for (const e of week) {
      const d = new Date(e.date + 'T12:00:00');
      const dayLabel = d.toLocaleDateString('en-CA', { weekday: 'long', month: 'short', day: 'numeric' });
      lines.push('', dayLabel,
        `  Duration : ${e.duration > 0 ? e.duration + ' min' : 'Rest day'}`,
        `  Tasks    : ${(e.tasks || []).join(', ') || 'none'}`,
        `  Mood     : ${e.mood || 'not set'}`,
        ...(e.notes ? [`  Notes    : ${e.notes}`] : [])
      );
    }
  }

  lines.push('', '── RECENT 30-DAY PATTERN ──');
  entries.slice(0, 30).forEach(e => {
    lines.push(`${e.date}: ${e.duration}min | ${(e.tasks||[]).join(', ')||'none'} | mood: ${e.mood||'?'}`);
  });

  lines.push('', '=== END OF SUMMARY ===', 'Paste this entire block to Claude and ask for your weekly coaching review.');
  res.type('text/plain').send(lines.join('\n'));
});

// ── Catch-all: serve React app for any non-API route ─────────────────────────
app.get('*', (req, res) => {
  const index = path.join(DIST, 'index.html');
  if (fs.existsSync(index)) {
    res.sendFile(index);
  } else {
    res.status(404).send('App not built. Run: npm run build');
  }
});

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n✓ Reza's Plan running at http://localhost:${PORT}`);
  console.log(`  Data file : ${DATA_FILE}`);
  console.log(`  Export    : http://localhost:${PORT}/api/export\n`);
});
