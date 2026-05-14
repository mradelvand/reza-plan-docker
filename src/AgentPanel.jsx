import { useState, useEffect, useCallback } from 'react';
import {
  loadEntries, saveEntry as saveEntryToFile,
  loadApiKey, saveApiKey, fetchExport,
  todayStr, displayDate,
  calcStreak, calcTotalMins, calcWeekMins, calcMonthMins, calcBlogCount
} from './storage.js';

// ─────────────────────────────────────────────────────────────────────────────
// TASK LIST
// To add a task: copy a line, give it a new unique id, change the label.
// To remove a task: delete the line.
// Never change an existing id — old entries rely on it for display in History.
//
// badge colours:
//   b-devops → green  (hands-on technical work)
//   b-blog   → purple (writing or publishing)
//   b-cert   → red    (certifications)
//   b-review → gray   (reading, watching only)
// ─────────────────────────────────────────────────────────────────────────────
const TASKS = [
  { id: 'monitoring', label: 'Monitoring — Prometheus / Grafana / Loki', badge: 'b-devops' },
  { id: 'blog_write', label: 'Blog post — writing or drafting',          badge: 'b-blog'   },
  { id: 'blog_pub',   label: 'Blog post — published live',               badge: 'b-blog'   },
  { id: 'github',     label: 'GitHub — commit or project work',          badge: 'b-devops' },
  { id: 'docker',     label: 'Docker — videos or hands-on lab',          badge: 'b-devops' },
  { id: 'aws',        label: 'AWS free tier — hands-on practice',        badge: 'b-devops' },
  { id: 'sc900',      label: 'SC-900 — Microsoft Learn module',          badge: 'b-cert'   },
  { id: 'killercoda', label: 'KillerCoda — K8s scenario',                badge: 'b-devops' },
  { id: 'udemy',      label: 'Udemy — video watching only',              badge: 'b-review' },
  { id: 'review',     label: 'Review / reading (no hands-on)',           badge: 'b-review' },
  // Uncomment when you start GitOps section:
  // { id: 'gitops', label: 'GitOps & EKS — lab or videos', badge: 'b-devops' },
];

const MOODS = ['Stuck', 'Slow', 'Ok', 'Good', 'Great'];

const BADGE_COLORS = {
  'b-devops': ['#E1F5EE', '#0F6E56'],
  'b-blog':   ['#EEEDFE', '#3C3489'],
  'b-cert':   ['#FAECE7', '#993C1D'],
  'b-review': ['#F1EFE8', '#444441'],
};

// Last N days as dropdown options
function buildDateOptions(days = 30) {
  const opts = [];
  for (let i = 0; i < days; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const value = d.toLocaleDateString('en-CA');
    const label =
      i === 0 ? `Today — ${d.toLocaleDateString('en-CA', { weekday: 'long', month: 'short', day: 'numeric' })}` :
      i === 1 ? `Yesterday — ${d.toLocaleDateString('en-CA', { weekday: 'long', month: 'short', day: 'numeric' })}` :
      d.toLocaleDateString('en-CA', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' });
    opts.push({ value, label });
  }
  return opts;
}

function StreakDots({ entries }) {
  const today = todayStr();
  const dots = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const ds = d.toLocaleDateString('en-CA');
    const e = entries.find(x => x.date === ds);
    const label = d.toLocaleDateString('en-CA', { weekday: 'narrow' });
    let cls = 's-miss';
    if (ds === today) cls = (e && e.duration > 0) ? 's-done' : 's-today';
    else if (e && e.duration > 0) cls = 's-done';
    dots.push(<div key={ds} className={`s-dot ${cls}`} title={ds}>{label}</div>);
  }
  return <div className="streak-dots">{dots}</div>;
}

function ProgressBar({ value, max, color }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className="pbar-wrap">
      <div className="pbar" style={{ width: `${pct}%`, background: color || 'var(--teal)' }} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function AgentPanel() {
  const [tab, setTab] = useState('log');
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [serverOk, setServerOk] = useState(true);

  // API key (optional — only needed if you want inline AI feedback)
  const [apiKey, setApiKeyState] = useState('');
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [showKeyForm, setShowKeyForm] = useState(false);

  // Log form
  const [selectedDate, setSelectedDate] = useState(todayStr());
  const [duration, setDuration] = useState('0');
  const [checked, setChecked] = useState({});
  const [mood, setMood] = useState('');
  const [notes, setNotes] = useState('');

  // Save state
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');

  // AI feedback (optional — only shown if API key is set)
  const [feedback, setFeedback] = useState('');
  const [feedbackState, setFeedbackState] = useState('');

  // Saturday export
  const [exportText, setExportText] = useState('');
  const [exportLoading, setExportLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // Weekly / monthly AI reviews (optional)
  const [weeklyFeedback, setWeeklyFeedback] = useState('');
  const [weeklyState, setWeeklyState] = useState('');
  const [monthlyFeedback, setMonthlyFeedback] = useState('');
  const [monthlyState, setMonthlyState] = useState('');

  // ── Load entries from local server on mount ──
  const refreshEntries = useCallback(async () => {
    setLoading(true);
    const data = await loadEntries();
    if (!Array.isArray(data)) {
      setServerOk(false);
    } else {
      setEntries(data);
      setServerOk(true);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    refreshEntries();
    setApiKeyState(loadApiKey());
    setApiKeyInput(loadApiKey());
  }, [refreshEntries]);

  // ── Pre-fill form when user picks a date ──
  function handleDateChange(date) {
    setSelectedDate(date);
    setFeedback('');
    setFeedbackState('');
    setSaveMsg('');
    const existing = entries.find(e => e.date === date);
    if (existing) {
      setDuration(String(existing.duration || '0'));
      setMood(existing.mood || '');
      setNotes(existing.notes || '');
      const c = {};
      TASKS.forEach(t => { c[t.id] = (existing.tasks || []).includes(t.label); });
      setChecked(c);
    } else {
      setDuration('0');
      setMood('');
      setNotes('');
      setChecked({});
    }
  }

  function toggleTask(id) { setChecked(prev => ({ ...prev, [id]: !prev[id] })); }
  function getCheckedLabels() { return TASKS.filter(t => checked[t.id]).map(t => t.label); }

  // ── Save entry to file ──
  async function saveEntryHandler() {
    setSaving(true);
    setSaveMsg('');
    setFeedback('');
    setFeedbackState('');

    const tasks = getCheckedLabels();
    const entry = { date: selectedDate, duration: parseInt(duration), tasks, mood, notes, ts: Date.now() };

    const ok = await saveEntryToFile(entry);
    if (ok) {
      await refreshEntries();
      setSaveMsg('✓ Saved to progress.json');

      // If API key is set, also get AI feedback
      if (loadApiKey()) {
        setFeedbackState('loading');
        try {
          const text = await callClaude(buildDailyPrompt(entry, entries));
          setFeedback(text);
          setFeedbackState('done');
        } catch (err) {
          setFeedback(`Could not get AI feedback: ${err.message}`);
          setFeedbackState('error');
        }
      }
    } else {
      setSaveMsg('⚠ Could not save — is server.js running? See terminal.');
      setServerOk(false);
    }
    setSaving(false);
  }

  // ── Saturday export ──
  async function handleExport() {
    setExportLoading(true);
    setExportText('');
    setCopied(false);
    const text = await fetchExport();
    setExportText(text);
    setExportLoading(false);
  }

  async function copyExport() {
    try {
      await navigator.clipboard.writeText(exportText);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // fallback: select the textarea
    }
  }

  // ── Anthropic API call (optional) ──
  async function callClaude(prompt) {
    const key = loadApiKey();
    if (!key) throw new Error('NO_KEY');
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        messages: [{ role: 'user', content: prompt }],
      }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error?.message || `HTTP ${res.status}`);
    }
    const data = await res.json();
    return data.content?.map(c => c.text || '').join('') || '';
  }

  function buildDailyPrompt(entry, allEntries) {
    const recent = allEntries.slice(0, 7).map(e =>
      `${e.date}: ${e.duration}min, tasks=[${(e.tasks||[]).join(', ')||'none'}], mood=${e.mood||'?'}, notes="${e.notes||''}"`
    ).join('\n');
    const isPast = entry.date !== todayStr();
    return `You are a supportive but honest career coach for Reza (mradelvand) in Montreal.

Context:
- Full-time IT support/sysadmin, self-studying toward Cloud/DevSecOps
- Background: CCNA, Entra ID/Intune, DevOps Udemy course ~57% done, AWS free tier active
- Plan started Apr 19 2026. Entry date: ${entry.date}${isPast ? ' (backdated)' : ''}
- Current status (May 2026): finished Monitoring section (videos + hands-on). Blog post not yet published. Docker Deep Dive is next.
- Blog at mradelvand.github.io — 2 Ansible posts live
- Known challenge: perfectionism — delays publishing until everything feels 100%
- Study mode: Pro (1h morning + 1h evening) when possible, Basic (45 min) otherwise

Entry for ${entry.date}:
- Duration: ${entry.duration} min
- Tasks: ${entry.tasks.join(', ') || 'nothing checked'}
- Mood: ${entry.mood || 'not set'}
- Notes: "${entry.notes || ''}"

Recent 7 days:
${recent}

Write 150–200 words:
1. One honest observation about this entry
2. One specific action for the next study session
3. If mood is Stuck or Slow — address perfectionism directly
4. One sentence of genuine encouragement (not cheesy)

Be direct, warm, specific. No generic quotes.`;
  }

  async function getWeeklyReview() {
    setWeeklyState('loading'); setWeeklyFeedback('');
    const recent = entries.slice(0, 14).map(e =>
      `${e.date}: ${e.duration}min, tasks=[${(e.tasks||[]).join(', ')||'none'}], mood=${e.mood||'?'}, notes="${e.notes||''}"`
    ).join('\n');
    const prompt = `Career coach doing a weekly review for Reza (mradelvand), Montreal IT → Cloud/DevSecOps.

Today: ${todayStr()}. Plan started Apr 19 2026.
Current: Monitoring done, blog post pending, Docker Deep Dive next.
Targets: 45–60 min/day × 5 days (Basic) or 1h+1h (Pro). Blog 1 post per section.

Last 14 days:
${recent || 'No entries.'}

Weekly review (200–250 words):
1. What pattern in the data? (honest)
2. Where is perfectionism showing up?
3. One concrete routine adjustment for next week
4. One thing to be genuinely proud of
5. One specific measurable goal for next week

Be a mentor, not a cheerleader. Use the actual data.`;
    try {
      setWeeklyFeedback(await callClaude(prompt)); setWeeklyState('done');
    } catch (err) {
      setWeeklyFeedback(err.message === 'NO_KEY' ? 'Add your API key first (optional).' : `Error: ${err.message}`);
      setWeeklyState('error');
    }
  }

  async function getMonthlyReview() {
    setMonthlyState('loading'); setMonthlyFeedback('');
    const recent = entries.slice(0, 31).map(e =>
      `${e.date}: ${e.duration}min, tasks=[${(e.tasks||[]).join(', ')||'none'}], mood=${e.mood||'?'}`
    ).join('\n');
    const prompt = `Career coach doing a monthly review for Reza (mradelvand), Montreal IT → Cloud/DevSecOps.

Today: ${todayStr()}. Phase 1 goals: course 100%, SC-900, Monitoring+Docker+AWS VPC+GitOps projects, 8+ blog posts.
Basic finish: Jun 6. Pro finish: May 19. Current: Monitoring done, Docker next.

Stats: days=${entries.filter(e=>e.duration>0).length}, total mins=${calcTotalMins(entries)}, blogs logged=${calcBlogCount(entries)} (+2 Ansible = ${calcBlogCount(entries)+2}), this month=${calcMonthMins(entries)} min.

All entries (up to 31 days):
${recent || 'No entries.'}

Monthly review (300–350 words):
1. Pace: which mode tracking toward?
2. Topic gaps?
3. Perfectionism — improving or blocking? Specific example.
4. Three actions for next month by career impact
5. Honest projection: when job-search ready at this pace?`;
    try {
      setMonthlyFeedback(await callClaude(prompt)); setMonthlyState('done');
    } catch (err) {
      setMonthlyFeedback(err.message === 'NO_KEY' ? 'Add your API key first (optional).' : `Error: ${err.message}`);
      setMonthlyState('error');
    }
  }

  function saveKey() { saveApiKey(apiKeyInput); setApiKeyState(apiKeyInput); setShowKeyForm(false); }

  // Computed stats
  const streak    = calcStreak(entries);
  const totalMins = calcTotalMins(entries);
  const weekMins  = calcWeekMins(entries);
  const monthMins = calcMonthMins(entries);
  const blogCount = calcBlogCount(entries);
  const totalDays = entries.filter(e => e.duration > 0).length;
  const dateOptions = buildDateOptions(30);
  const existingEntry = entries.find(e => e.date === selectedDate);

  // ── Shared inline styles ──
  const tabBtn = (id) => ({
    padding: '6px 14px', borderRadius: 20, fontSize: 12,
    border: '0.5px solid var(--border)',
    background: tab === id ? 'var(--text)' : 'transparent',
    color: tab === id ? '#fff' : 'var(--text-m)',
    cursor: 'pointer', fontFamily: 'var(--font)',
    fontWeight: tab === id ? 500 : 400,
  });

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div>
      <div className="ph">
        <div className="ph-title">Progress coach</div>
        <div className="ph-sub">Daily log saved to your computer. Saturday: export summary → paste to Claude for weekly review.</div>
      </div>

      {/* Server status warning */}
      {!serverOk && (
        <div className="banner b-coral" style={{ marginBottom: '1rem' }}>
          <strong>Local server not responding.</strong> Open a second terminal, go to your reza-plan folder, and run: <code style={{ background: 'rgba(0,0,0,0.1)', padding: '1px 5px', borderRadius: 3 }}>node server.js</code>
          <br />Your data is safe in <code>data/progress.json</code> — it just can't be read until the server is running.
        </div>
      )}

      {/* Optional API key for inline AI feedback */}
      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => setShowKeyForm(v => !v)}
          style={{ fontSize: 12, padding: '5px 12px', borderRadius: 'var(--rs)', border: '0.5px solid var(--border)', background: apiKey ? 'var(--teal-l)' : 'var(--gray-l)', color: apiKey ? 'var(--teal-d)' : 'var(--gray-d)', cursor: 'pointer', fontFamily: 'var(--font)' }}>
          {apiKey ? '✓ API key set (optional inline feedback enabled)' : '+ Add Anthropic API key (optional — not needed for weekly export)'}
        </button>
        {showKeyForm && (
          <div className="api-key-wrap" style={{ marginTop: 8 }}>
            <label className="form-label">Anthropic API key — optional. Only needed for inline AI feedback on save.</label>
            <input type="password" className="api-key-input" value={apiKeyInput} onChange={e => setApiKeyInput(e.target.value)} placeholder="sk-ant-..." />
            <button className="save-key-btn" onClick={saveKey}>Save key</button>
            <div style={{ fontSize: 11, color: 'var(--text-h)', marginTop: 6 }}>
              The weekly export works without this. Get a key at console.anthropic.com → API Keys if you want it.
            </div>
          </div>
        )}
      </div>

      {/* Tab bar */}
      <div style={{ display: 'flex', gap: 6, marginBottom: '1.25rem', flexWrap: 'wrap' }}>
        {[['log','Daily log'],['saturday','Saturday export'],['stats','Stats'],['history','History'],['weekly','Weekly AI'],['monthly','Monthly AI']].map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)} style={tabBtn(id)}>{label}</button>
        ))}
      </div>

      {loading && <div style={{ color: 'var(--text-m)', fontSize: 13, padding: '1rem 0' }}>Loading entries from file...</div>}

      {/* ═══ DAILY LOG ═══════════════════════════════════════════════════════ */}
      {!loading && tab === 'log' && (
        <div>
          <div className="agent-card" style={{ marginBottom: '1rem' }}>

            {/* Date picker + streak */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', flexWrap: 'wrap', gap: 8 }}>
              <div style={{ flex: 1, minWidth: 240 }}>
                <label className="form-label" style={{ marginBottom: 4 }}>Logging for which day?</label>
                <select className="form-select" value={selectedDate} onChange={e => handleDateChange(e.target.value)} style={{ fontFamily: 'var(--mono)', fontSize: 12 }}>
                  {dateOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
                {existingEntry && <div style={{ fontSize: 11, color: 'var(--amber-d)', marginTop: 4 }}>✎ Editing existing entry — save to overwrite</div>}
                {selectedDate !== todayStr() && !existingEntry && <div style={{ fontSize: 11, color: 'var(--text-h)', marginTop: 4 }}>No entry for this day yet</div>}
              </div>
              <StreakDots entries={entries} />
            </div>

            {/* Duration */}
            <label className="form-label">How long did you study?</label>
            <select className="form-select" value={duration} onChange={e => setDuration(e.target.value)} style={{ marginBottom: '1rem' }}>
              <option value="0">Rest day — no study today</option>
              <option value="15">~15 min</option>
              <option value="30">~30 min</option>
              <option value="45">~45 min (Basic target)</option>
              <option value="60">~60 min</option>
              <option value="90">~90 min</option>
              <option value="120">2h+ (Pro full session)</option>
            </select>

            {/* Tasks — edit TASKS array at top of file to change these */}
            <label className="form-label">What did you work on?</label>
            <div className="check-list" style={{ marginBottom: '1rem' }}>
              {TASKS.map(task => (
                <label key={task.id} className="check-row">
                  <input type="checkbox" checked={!!checked[task.id]} onChange={() => toggleTask(task.id)} />
                  {task.label}
                </label>
              ))}
            </div>

            {/* Mood */}
            <label className="form-label">How do you feel about your progress?</label>
            <div className="mood-row" style={{ marginBottom: '1rem' }}>
              {MOODS.map(m => (
                <button key={m} className={`mood-btn ${mood === m ? 'selected' : ''}`} onClick={() => setMood(m)}>{m}</button>
              ))}
            </div>

            {/* Notes */}
            <label className="form-label">Notes — what did you do? what blocked you?</label>
            <textarea className="form-textarea" value={notes} onChange={e => setNotes(e.target.value)}
              placeholder="e.g. Finished Prometheus setup, Grafana running. Need to write the monitoring blog post. Will draft it tomorrow morning."
              style={{ marginBottom: '1rem' }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <button className="save-btn" onClick={saveEntryHandler} disabled={saving}>
                {saving ? 'Saving...' : selectedDate === todayStr() ? 'Save to file →' : `Save ${selectedDate} →`}
              </button>
              {saveMsg && <span style={{ fontSize: 12, color: saveMsg.startsWith('✓') ? 'var(--teal-d)' : 'var(--coral-d)' }}>{saveMsg}</span>}
            </div>
          </div>

          {/* Optional inline AI feedback */}
          {(feedback || feedbackState === 'loading') && (
            <div className={`ai-box ${feedbackState === 'loading' ? 'loading' : feedbackState === 'error' ? 'error' : ''}`}>
              {feedbackState === 'loading' ? 'Getting AI feedback...' : feedback}
            </div>
          )}

          {!apiKey && (
            <div style={{ fontSize: 12, color: 'var(--text-h)', marginTop: 8 }}>
              Tip: entries are saved to file even without an API key. Use the <strong>Saturday export</strong> tab to get weekly coaching from Claude without needing an API key.
            </div>
          )}
        </div>
      )}

      {/* ═══ SATURDAY EXPORT ═════════════════════════════════════════════════
          This is the main coaching workflow. No API key needed.
          Every Saturday: click Generate → Copy → paste to Claude.
          ══════════════════════════════════════════════════════════════════════ */}
      {!loading && tab === 'saturday' && (
        <div>
          <div className="banner b-teal" style={{ marginBottom: '1rem' }}>
            <strong>Saturday workflow — no API key needed.</strong><br />
            Every Saturday: click Generate → Copy all → open Claude.ai → paste → ask for your weekly coaching review.
            This gives you better, more thoughtful feedback than the quick inline version.
          </div>

          <div className="agent-card" style={{ marginBottom: '1rem' }}>
            <div className="form-label" style={{ marginBottom: 8 }}>What Claude will see</div>
            <div style={{ fontSize: 13, color: 'var(--text-m)', lineHeight: 1.7 }}>
              Your complete weekly log (all entries from the past 7 days) plus your all-time stats.
              Claude will give you an honest pace analysis, spot any patterns, and tell you exactly what to focus on next week.
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10, marginBottom: '1rem', flexWrap: 'wrap' }}>
            <button className="save-btn" onClick={handleExport} disabled={exportLoading}>
              {exportLoading ? 'Generating...' : '1. Generate weekly summary →'}
            </button>
            {exportText && (
              <button onClick={copyExport}
                style={{ padding: '9px 18px', borderRadius: 'var(--rs)', fontSize: 13, border: '0.5px solid var(--border)', background: copied ? 'var(--teal-l)' : 'transparent', color: copied ? 'var(--teal-d)' : 'var(--text)', cursor: 'pointer', fontFamily: 'var(--font)', fontWeight: 500 }}>
                {copied ? '✓ Copied!' : '2. Copy all →'}
              </button>
            )}
          </div>

          {exportText && (
            <div>
              <textarea
                readOnly
                value={exportText}
                style={{ width: '100%', minHeight: 320, border: '0.5px solid var(--border)', borderRadius: 'var(--rs)', padding: '12px 14px', fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--text)', background: 'var(--bg)', resize: 'vertical', lineHeight: 1.65 }}
              />
              <div style={{ fontSize: 12, color: 'var(--text-h)', marginTop: 6 }}>
                3. Go to <strong>claude.ai</strong> → paste → add: <em>"Give me my weekly coaching review based on this."</em>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ═══ STATS ═══════════════════════════════════════════════════════════ */}
      {!loading && tab === 'stats' && (
        <div>
          <div className="big-stat-grid">
            <div className="big-stat"><div className="big-stat-n" style={{ color: 'var(--teal)' }}>{streak}</div><div className="big-stat-l">day streak</div></div>
            <div className="big-stat"><div className="big-stat-n">{totalDays}</div><div className="big-stat-l">days logged</div></div>
            <div className="big-stat"><div className="big-stat-n">{Math.round(totalMins / 60 * 10) / 10}h</div><div className="big-stat-l">total studied</div></div>
            <div className="big-stat"><div className="big-stat-n" style={{ color: 'var(--purple)' }}>{blogCount + 2}</div><div className="big-stat-l">blog posts</div></div>
          </div>

          <div className="agent-card" style={{ marginBottom: '1rem' }}>
            <div className="form-label" style={{ marginBottom: 8 }}>This week — target: 270 min (Basic) / 600 min (Pro)</div>
            <div style={{ fontSize: 13, marginBottom: 4 }}><strong style={{ fontFamily: 'var(--mono)' }}>{weekMins}</strong> / 270 min</div>
            <ProgressBar value={weekMins} max={270} color="var(--teal)" />
            <div style={{ fontSize: 11, color: 'var(--text-h)', marginTop: 4 }}>
              {weekMins >= 600 ? '🔥 Pro week!' : weekMins >= 270 ? '✓ Basic week done!' : weekMins >= 180 ? 'Almost — one more session.' : 'Keep going.'}
            </div>
          </div>

          <div className="agent-card" style={{ marginBottom: '1rem' }}>
            <div className="form-label" style={{ marginBottom: 8 }}>This month — target: ~1080 min</div>
            <div style={{ fontSize: 13, marginBottom: 4 }}><strong style={{ fontFamily: 'var(--mono)' }}>{monthMins}</strong> / 1080 min</div>
            <ProgressBar value={monthMins} max={1080} color="var(--purple)" />
          </div>

          <div className="agent-card" style={{ marginBottom: '1rem' }}>
            <div className="form-label" style={{ marginBottom: 8 }}>Blog posts — target: 8 by Jun 6</div>
            <div style={{ fontSize: 13, marginBottom: 4 }}><strong style={{ fontFamily: 'var(--mono)' }}>{blogCount + 2}</strong> / 8 <span style={{ fontSize: 11, color: 'var(--text-h)' }}>(2 Ansible + {blogCount} logged)</span></div>
            <ProgressBar value={blogCount + 2} max={8} color="var(--amber)" />
          </div>

          <div className="agent-card">
            <div className="form-label" style={{ marginBottom: 8 }}>Last 14 days</div>
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
              {Array.from({ length: 14 }, (_, i) => {
                const d = new Date(); d.setDate(d.getDate() - (13 - i));
                const ds = d.toLocaleDateString('en-CA');
                const e = entries.find(x => x.date === ds);
                const mins = e?.duration || 0;
                const isToday = ds === todayStr();
                const bg = mins >= 60 ? 'var(--teal)' : mins >= 30 ? 'var(--teal-l)' : mins > 0 ? '#9FE1CB' : isToday ? 'var(--amber-l)' : 'var(--bg)';
                const col = mins >= 60 ? '#fff' : mins > 0 ? 'var(--teal-d)' : 'var(--text-h)';
                return (
                  <div key={ds} title={`${ds}: ${mins} min`}
                    style={{ width: 32, height: 32, borderRadius: 6, background: bg, border: isToday ? '1.5px solid var(--teal)' : '0.5px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontFamily: 'var(--mono)', color: col }}>
                    {mins > 0 ? mins : d.toLocaleDateString('en-CA', { weekday: 'narrow' })}
                  </div>
                );
              })}
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-h)', marginTop: 8 }}>Each box = one day. Number = minutes. Darker = more time.</div>
          </div>
        </div>
      )}

      {/* ═══ HISTORY ═══════════════════════════════════════════════════════════ */}
      {!loading && tab === 'history' && (
        <div className="agent-card">
          {entries.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--text-m)', fontSize: 13 }}>No entries yet. Log your first day above.</div>
          ) : entries.slice(0, 60).map(e => {
            const badges = (e.tasks || []).map(t => {
              const task = TASKS.find(x => x.label === t);
              const [bg, col] = BADGE_COLORS[task?.badge || 'b-review'] || ['#F1EFE8', '#444441'];
              return <span key={t} style={{ display: 'inline-block', fontSize: 10, padding: '2px 7px', borderRadius: 20, fontWeight: 500, marginRight: 4, marginBottom: 2, background: bg, color: col }}>{t}</span>;
            });
            return (
              <div key={e.date} className="entry-item">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div className="entry-date">{displayDate(e.date)}</div>
                    <div className="entry-meta">{e.duration > 0 ? `${e.duration} min` : 'Rest day'}{e.mood ? ` · ${e.mood}` : ''}</div>
                  </div>
                  <button onClick={() => { setTab('log'); handleDateChange(e.date); }}
                    style={{ fontSize: 11, padding: '3px 10px', borderRadius: 20, border: '0.5px solid var(--border)', background: 'transparent', cursor: 'pointer', color: 'var(--text-m)', fontFamily: 'var(--font)' }}>
                    Edit
                  </button>
                </div>
                <div style={{ marginBottom: 3 }}>{badges.length > 0 ? badges : <span style={{ fontSize: 11, color: 'var(--text-h)' }}>No tasks</span>}</div>
                {e.notes && <div style={{ fontSize: 12, color: 'var(--text-m)' }}>{e.notes.substring(0, 160)}{e.notes.length > 160 ? '…' : ''}</div>}
              </div>
            );
          })}
        </div>
      )}

      {/* ═══ WEEKLY AI (optional — needs API key) ════════════════════════════ */}
      {!loading && tab === 'weekly' && (
        <div>
          <div className="banner b-purple" style={{ marginBottom: '1rem' }}>
            Optional — needs an Anthropic API key. For weekly coaching without a key, use the <strong>Saturday export</strong> tab instead.
          </div>
          <button className="save-btn" onClick={getWeeklyReview} disabled={weeklyState === 'loading'} style={{ marginBottom: '1rem' }}>
            {weeklyState === 'loading' ? 'Generating...' : "Generate weekly review →"}
          </button>
          {(weeklyFeedback || weeklyState === 'loading') && (
            <div className={`ai-box ${weeklyState === 'loading' ? 'loading' : weeklyState === 'error' ? 'error' : ''}`}>
              {weeklyState === 'loading' ? 'Analyzing...' : weeklyFeedback}
            </div>
          )}
        </div>
      )}

      {/* ═══ MONTHLY AI (optional — needs API key) ═══════════════════════════ */}
      {!loading && tab === 'monthly' && (
        <div>
          <div className="banner b-amber" style={{ marginBottom: '1rem' }}>
            Optional — needs an Anthropic API key. Full pace analysis, projections, next month priorities.
          </div>
          <button className="save-btn" onClick={getMonthlyReview} disabled={monthlyState === 'loading'} style={{ marginBottom: '1rem' }}>
            {monthlyState === 'loading' ? 'Generating...' : 'Generate monthly review →'}
          </button>
          {(monthlyFeedback || monthlyState === 'loading') && (
            <div className={`ai-box ${monthlyState === 'loading' ? 'loading' : monthlyState === 'error' ? 'error' : ''}`}>
              {monthlyState === 'loading' ? 'Analyzing...' : monthlyFeedback}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
