# How to modify the app yourself

You don't need to be a developer. Every change you'll ever want to make
is in ONE file: `src/AgentPanel.jsx`

Open it with any text editor (Notepad on Windows, TextEdit on Mac, or
VS Code if you have it — VS Code is free and makes this much easier).

The file has clear comments like:
  // ── TO ADD A TASK: ...
  // ── TO CHANGE THE FEEDBACK STYLE: ...

You find those lines, make your change, save the file, and the app
updates automatically while `npm run dev` is running.

---

## The most common changes

---

### 1. Add or remove a task from the checkbox list

Open: `src/AgentPanel.jsx`
Find this section near the top (around line 20):

```
const TASKS = [
  { id: 'monitoring',  label: 'Monitoring — Prometheus / Grafana / Loki',  badge: 'b-devops' },
  { id: 'blog_write',  label: 'Blog post — writing or drafting',           badge: 'b-blog'   },
  ...
];
```

**To add a new task** (e.g. when you start GitOps section):
Copy any existing line and paste it at the end of the list.
Change the id (must be unique, no spaces), the label, and the badge colour.

Example — adding a GitOps task:
```
  { id: 'gitops', label: 'GitOps & EKS — lab or videos', badge: 'b-devops' },
```

Colour options for badge:
  b-devops  → green  (use for hands-on technical work)
  b-blog    → purple (use for writing/publishing)
  b-cert    → red    (use for SC-900, AZ-104, etc.)
  b-review  → gray   (use for reading, watching only)

**To remove a task**: just delete that line.
Old entries that used it will still show the label in History — it just
won't appear as a checkbox for new entries.

**IMPORTANT**: Never change an existing `id` value. If you change
`id: 'monitoring'` to `id: 'prometheus'`, all your old entries that
had "monitoring" checked will lose that tag in History.

---

### 2. Change the AI feedback style

Open: `src/AgentPanel.jsx`
Find this comment (around line 130):

```
// ── TO CHANGE THE FEEDBACK STYLE: edit the text below ──────────────────
const prompt = `You are a supportive but honest career coach...
```

Everything between the backticks (`) is the instruction sent to Claude.
You can change the tone, add new context, or change what the response includes.

Examples of edits you might make:

**Make feedback shorter:**
Change `150–200 words` to `80–100 words` in the prompt.

**Update your current section focus:**
Find this line:
```
- Current status (May 2026): finished Monitoring section...
```
Change it to whatever is true now, e.g.:
```
- Current status (June 2026): Docker section done, working on AWS VPC.
```

**Add more personal context:**
After the "Known challenge" line, add anything new:
```
- Currently writing monitoring blog post, goal is to publish by end of week
```

The same principle applies to the weekly and monthly review prompts.
Search for `getWeeklyReview` and `getMonthlyReview` in the file to find them.

---

### 3. Add a new section that automatically unchecks after completing

You don't need to do anything special — just add the task to TASKS,
and remove it later when the section is done. Old entries are kept.

---

### 4. Change the progress bar targets

Open: `src/AgentPanel.jsx`
Find the Stats tab section (search for `TAB: STATS`).

The weekly target is shown here:
```
<strong style={{ fontFamily: 'var(--mono)' }}>{weekMins}</strong> / 270 min
```
Change `270` to whatever your new target is (e.g. `300`).

The ProgressBar for weekly also has `max={270}` — change that too.

---

### 5. Change the date picker range (default: last 30 days)

Find this line (near the bottom of the main component):
```
const dateOptions = buildDateOptions(30);
```
Change `30` to however many days back you want to be able to log.
E.g. `buildDateOptions(60)` gives you 60 days back.

---

## How to apply a change while the app is running

1. Make sure `npm run dev` is running in your terminal
2. Open `src/AgentPanel.jsx` in your text editor
3. Make your change and save the file (Ctrl+S or Cmd+S)
4. Switch to your browser — the page updates automatically within 1–2 seconds
   (you don't need to refresh)

If the page goes blank or shows an error, it means there's a syntax mistake
in the file — usually a missing comma or bracket. Open the terminal where
`npm run dev` is running and read the error — it tells you which line.

---

## Quick reference: which file controls what

| What you want to change        | File to edit              |
|-------------------------------|---------------------------|
| Checkboxes (task list)         | src/AgentPanel.jsx — TASKS array |
| AI feedback content/style      | src/AgentPanel.jsx — prompt text |
| Stats targets (270 min, etc.)  | src/AgentPanel.jsx — Stats tab |
| Sidebar menu items             | src/App.jsx — navItems array |
| Course section videos          | src/data.js — SECTIONS array |
| Weekly schedule rows           | src/data.js — BASIC_WEEKS / PRO_WEEKS |
| All colours and fonts          | src/index.css — :root variables |
| App name "Reza's Plan"         | src/App.jsx — s-logo section |

---

## Getting help

Paste the relevant section of code into Claude and say:
"I want to change X — show me exactly what to change"

Claude can read the code and tell you the exact line to edit.
