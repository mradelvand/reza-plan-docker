# Reza's Plan — Setup Guide (v3)

## What changed from v2
- Data now saved to a FILE on your computer (`data/progress.json`)
  instead of the browser — survives restarts, port changes, browser clears
- One command starts everything: `npm start`
- Port is fixed at 5173 — no more switching
- Saturday export tab: generate a text summary, paste to Claude, get weekly coaching — NO API key needed

---

## First-time setup (do this once)

### Step 1 — Install Node.js if you don't have it
Open terminal. Check:
```
node --version
```
If you see v18 or higher → skip to Step 2.
If not → go to https://nodejs.org → download LTS → install.

### Step 2 — Extract the project
**Mac/Linux:**
```bash
cd ~
tar -xzf reza-plan-v3.tar.gz
cd reza-plan
```

**Windows (PowerShell):**
```powershell
cd C:\Users\YourName\Downloads
tar -xzf reza-plan-v3.tar.gz
cd reza-plan
```

### Step 3 — Install dependencies (once)
```
npm install
```

---

## Every day: start the app

```
npm start
```

This starts TWO things at once:
- The data server on port 3001 (saves to data/progress.json)
- The React app on port 5173 (always the same port now)

Open your browser: **http://localhost:5173**

To stop everything: press **Ctrl+C** in the terminal.

---

## Every Saturday: get your weekly coaching

1. Open the app → click **Saturday export** tab
2. Click **Generate weekly summary**
3. Click **Copy all**
4. Go to **claude.ai**
5. Paste and type: *"Give me my weekly coaching review based on this."*

That's it. No API key needed. Claude will give you a full review of your week,
tell you if you're on pace, and lay out exactly what to focus on next week.

---

## Your data file

All progress is saved here:
```
reza-plan/data/progress.json
```

This is a plain text file. You can open it in any text editor to see all your entries.
Back it up anywhere (USB, Google Drive, email it to yourself).

To check it's working: after you save your first entry, open that file and you'll see your data.

---

## Troubleshooting

**"Port 5173 is already in use"**
Something else is using that port. Stop it, or edit `vite.config.js` and change 5173 to 5174.

**"Could not save — is server.js running?"**
The data server crashed. Open a second terminal, go to the reza-plan folder, run:
```
node server.js
```
Then try saving again.

**History is empty after restart**
This is the bug that was fixed in v3. Your data is in `data/progress.json`.
If you upgraded from v2 and had localStorage data, see migration below.

---

## Migrating data from v2 (localStorage) to v3

If you had entries saved in v2, they're still in your browser's localStorage.
To move them to the file:

1. Open Chrome, go to http://localhost:5173
2. Press F12 → Application tab → Local Storage → http://localhost:5173
3. Find the key `reza_progress_v1` → copy the entire value (it starts with `[{`)
4. Open a terminal in your reza-plan folder and run:
```bash
node -e "
const fs = require('fs');
const data = JSON.parse('[PASTE YOUR DATA HERE]');
fs.writeFileSync('data/progress.json', JSON.stringify(data, null, 2));
console.log('Migrated', data.length, 'entries');
"
```
Replace `[PASTE YOUR DATA HERE]` with the value you copied.

---

## Make it easy to start (optional shortcuts)

**Mac — add alias to ~/.zshrc:**
```bash
alias rezaplan="cd ~/reza-plan && npm start"
```
Then just type `rezaplan` in any terminal.

**Windows — create start.bat:**
```bat
cd C:\Users\YourName\reza-plan
npm start
pause
```
Double-click to start everything.
