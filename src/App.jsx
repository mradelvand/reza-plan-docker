import { useState } from 'react';
import AgentPanel from './AgentPanel.jsx';
import { SECTIONS, BASIC_WEEKS, PRO_WEEKS } from './data.js';

// ── Sidebar nav item ──
function NavItem({ active, onClick, color, children }) {
  return (
    <button className={`ni ${active ? 'active' : ''}`} onClick={onClick}>
      <div className="ni-dot" style={{ background: color }} />
      {children}
    </button>
  );
}

// ── Tag chip ──
function Tag({ cls, children }) {
  const map = {
    watch: 'wtag-w', lab: 'wtag-l', blog: 'wtag-b', cert: 'wtag-c', deploy: 'wtag-l', review: 'wtag-r', note: 'wtag-r',
  };
  return <span className={`wtag ${map[cls] || 'wtag-r'}`}>{children}</span>;
}

// ── Section accordion ──
function SectionBlock({ sec, mode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="sec-block">
      <button className="sec-hdr" onClick={() => setOpen(v => !v)}>
        <div className="sec-bar" style={{ background: sec.color }} />
        <div className="sec-info">
          <div className="sec-title">{sec.title}</div>
          <div className="sec-meta">{sec.meta}</div>
        </div>
        <span className="sec-badge" style={sec.badgeStyle}>{sec.badge}</span>
        <span className={`chev ${open ? 'open' : ''}`}>▶</span>
      </button>
      {open && (
        <div className="sec-body">
          <div className="goal-block">
            <strong>Why this order</strong>{sec.whyFirst}
          </div>
          <div className="goal-block" style={{ background: 'var(--amber-l)' }}>
            <strong>Lab goal — Basic</strong>{sec.labBasic}
          </div>
          {mode === 'pro' && (
            <div className="goal-block" style={{ background: 'var(--purple-l)' }}>
              <strong>Lab goal — Pro (evening)</strong>{sec.labPro}
            </div>
          )}
          <div className="vlist">
            {sec.videos.map(v => (
              <div key={v.n} className="vrow">
                <span className="vnum">{v.n}</span>
                <span className="vtitle">{v.t}</span>
                <span className="vtime">{v.m}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Daily panel ──
function DailyPanel({ mode }) {
  return (
    <div>
      <div className="ph">
        <div className="ph-title">Daily routine</div>
        <div className="ph-sub">Switch between Basic and Pro in the sidebar. Pro is opt-in, not required — use it on good days.</div>
      </div>

      {mode === 'basic' ? (
        <>
          <span className="mode-badge mb-basic">Basic mode — 45 min morning</span>
          <div className="banner b-teal">
            <strong>Your fixed slot: 6:00–6:45am Mon–Thu · Saturday 9:00–11:00am</strong><br />
            This is the minimum that keeps you moving. Consistency at Basic beats sporadic Pro sessions every time.
          </div>
          <div className="sched-grid">
            {[
              { name: 'Mon', cls: 'today', slot: '6:00–6:45am', sub: 'Watch + type commands' },
              { name: 'Tue', cls: '', slot: '6:00–6:45am', sub: 'Continue lab or next videos' },
              { name: 'Wed', cls: '', slot: '6:00–6:45am', sub: 'SC-900 module' },
              { name: 'Thu', cls: '', slot: '6:00–6:45am', sub: 'New section or review' },
              { name: 'Sat', cls: '', slot: '9:00–11:00am', sub: 'Hands-on lab + blog post' },
            ].map(d => (
              <div key={d.name} className={`day ${d.cls}`}>
                <div className="day-name">{d.name}</div>
                <div className="slot">{d.slot}</div>
                <div className="slot-sub">{d.sub}</div>
              </div>
            ))}
          </div>
          <div className="session">
            <div className="session-head"><span className="session-time">6:00–6:45am</span><span className="session-tag st-watch">morning — watch + hands-on</span></div>
            <div className="session-body">
              {[
                ['0–5 min', 'Open laptop. No phone. Check what you wrote last night: "Tomorrow I will finish ___."'],
                ['5–30 min', 'Watch videos at 1.25×. Pause before every command — type it yourself first. Wrong is fine.'],
                ['30–42 min', 'Reproduce one command from memory in terminal. No notes. If stuck, that is tomorrow\'s starting point.'],
                ['42–45 min', 'Write one line in your log: "Did ___, got stuck on ___, tomorrow: ___." Close laptop. Done.'],
              ].map(([min, text]) => (
                <div key={min} className="step"><span className="step-min">{min}</span><span>{text}</span></div>
              ))}
            </div>
          </div>
          <div className="session">
            <div className="session-head"><span className="session-time">Saturday 9:00–11:00am</span><span className="session-tag st-lab">weekly lab + blog</span></div>
            <div className="session-body">
              {[
                ['0–60 min', 'Hands-on: deploy what you watched Mon–Thu. Use AWS free tier or local VM. Take one screenshot.'],
                ['60–90 min', 'Blog draft: paste your raw notes to Claude → ask for structure → edit in your voice → publish. Done is better than perfect.'],
                ['90–110 min', 'Bi-weekly: open the weekly schedule tab. Did you hit the deliverable? Adjust next 2 weeks if needed.'],
              ].map(([min, text]) => (
                <div key={min} className="step"><span className="step-min">{min}</span><span>{text}</span></div>
              ))}
            </div>
          </div>
          <div className="stat-row">
            <div className="stat"><div className="stat-n">270</div><div className="stat-l">min/week (Basic)</div></div>
            <div className="stat"><div className="stat-n" style={{ color: 'var(--teal)' }}>Jun 6</div><div className="stat-l">course done (Basic)</div></div>
            <div className="stat"><div className="stat-n">8+</div><div className="stat-l">blog posts by Jun 6</div></div>
          </div>
        </>
      ) : (
        <>
          <span className="mode-badge mb-pro">Pro mode — 1h morning + 1h evening</span>
          <div className="banner b-purple">
            <strong>Pro is opt-in, not required.</strong> Use it on days with energy and a free evening. A week of Basic days beats two Pro days that burn you out. Switch in the sidebar when you start — not to feel guilty.
          </div>
          <div className="sched-grid">
            {[
              { name: 'Mon', cls: 'today', slot: '6:00–7:00am', sub: 'Watch + hands-on\n9:00–10:00pm deploy' },
              { name: 'Tue', cls: '', slot: '6:00–7:00am', sub: 'Continue section\n9:00–10:00pm blog draft' },
              { name: 'Wed', cls: '', slot: '6:00–7:00am', sub: 'SC-900 module\n9:00–10:00pm practice Q\'s' },
              { name: 'Thu', cls: '', slot: '6:00–7:00am', sub: 'New section start\n9:00–10:00pm polish + publish' },
              { name: 'Sat', cls: '', slot: '9:00–11:00am', sub: 'Bigger project or KillerCoda K8s' },
            ].map(d => (
              <div key={d.name} className={`day ${d.cls}`}>
                <div className="day-name">{d.name}</div>
                <div className="slot" style={{ whiteSpace: 'pre-line' }}>{d.slot}</div>
                <div className="slot-sub" style={{ whiteSpace: 'pre-line' }}>{d.sub}</div>
              </div>
            ))}
          </div>
          <div className="session">
            <div className="session-head"><span className="session-time">6:00–7:00am</span><span className="session-tag st-watch">morning — watch + hands-on</span></div>
            <div className="session-body">
              {[
                ['0–5 min', 'Open laptop. Alarm is your start signal. Check yesterday\'s "tomorrow" note.'],
                ['5–35 min', 'Watch 2–3 videos at 1.25×. Pause and type every command before the instructor does.'],
                ['35–55 min', 'Deploy the concept in your environment (AWS free tier, local Docker, or VM). Take raw notes as you go.'],
                ['55–60 min', 'Write one paragraph: "What I built, what failed, what I\'ll write tonight."'],
              ].map(([min, text]) => (
                <div key={min} className="step"><span className="step-min">{min}</span><span>{text}</span></div>
              ))}
            </div>
          </div>
          <div className="session">
            <div className="session-head"><span className="session-time">9:00–10:00pm</span><span className="session-tag st-blog">evening — deploy + write</span></div>
            <div className="session-body">
              {[
                ['0–5 min', 'Open your morning notes. You already did the hard part today.'],
                ['5–30 min', 'Continue or finish the lab from morning. One working thing = done. No perfection needed.'],
                ['30–55 min', 'Blog draft: paste raw notes + lab output to Claude → structure → edit 5 sentences in your voice → save draft.'],
                ['55–60 min', 'Write tomorrow\'s "I will finish ___" note. Commit code to GitHub. Done.'],
              ].map(([min, text]) => (
                <div key={min} className="step"><span className="step-min">{min}</span><span>{text}</span></div>
              ))}
            </div>
          </div>
          <div className="banner b-amber">
            <strong>Wednesday evening is always SC-900 — never lab work.</strong> Evening brain handles reading and practice questions. Save debugging for mornings.
          </div>
          <div className="stat-row">
            <div className="stat"><div className="stat-n">600</div><div className="stat-l">min/week (Pro)</div></div>
            <div className="stat"><div className="stat-n" style={{ color: 'var(--purple)' }}>May 19</div><div className="stat-l">course done (Pro)</div></div>
            <div className="stat"><div className="stat-n">14+</div><div className="stat-l">blog posts by May 19</div></div>
          </div>
        </>
      )}
    </div>
  );
}

// ── Weekly panel ──
function WeeklyPanel({ mode }) {
  const weeks = mode === 'basic' ? BASIC_WEEKS : PRO_WEEKS;
  return (
    <div>
      <div className="ph">
        <div className="ph-title">Weekly schedule</div>
        <div className="ph-sub">Every 2nd Saturday: check the deliverable, slide the schedule if needed. No guilt — just adjust.</div>
      </div>
      {mode === 'basic' ? (
        <>
          <span className="mode-badge mb-basic">Basic mode — Jun 6 finish</span>
          <div className="banner b-teal">Each week has one lab goal and one blog post. Hit the deliverable = move to the next section.</div>
          <div className="wtable-wrap">
            <table className="wtable">
              <thead>
                <tr><th>Week</th><th>Mon / Tue</th><th>Wed</th><th>Thu</th><th>Saturday deliverable</th></tr>
              </thead>
              <tbody>
                {weeks.map((w, i) => (
                  <tr key={i}>
                    <td><div className="wday">{w.week}</div><div className="wslot">{w.dates}</div></td>
                    <td>{w.monTue.map(([cls, text], j) => <span key={j}><Tag cls={cls}>{cls}</Tag>{text}<br /></span>)}</td>
                    <td>{w.wed.map(([cls, text], j) => <span key={j}><Tag cls={cls}>{cls}</Tag>{text}</span>)}</td>
                    <td>{w.thu.map(([cls, text], j) => <span key={j}><Tag cls={cls}>{cls}</Tag>{text}</span>)}</td>
                    <td><div className="deliv">{w.deliverable}</div></td>
                  </tr>
                ))}
                <tr className="finish-row">
                  <td><div className="wday">Jun 6</div></td>
                  <td colSpan={4}><strong>Basic mode: course 100% done. SC-900 booked. 8 blog posts. Phase 1 complete.</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <>
          <span className="mode-badge mb-pro">Pro mode — May 19 finish</span>
          <div className="banner b-purple">Pro mode compresses the timeline by 2×. Evening session = deploy + write. Morning = video + initial hands-on.</div>
          <div className="wtable-wrap">
            <table className="wtable">
              <thead>
                <tr><th>Week</th><th>Morning focus</th><th>Evening focus</th><th>Wed evening</th><th>Saturday deliverable</th></tr>
              </thead>
              <tbody>
                {weeks.map((w, i) => (
                  <tr key={i}>
                    <td><div className="wday">{w.week}</div><div className="wslot">{w.dates}</div></td>
                    <td>{w.morning.map(([cls, text], j) => <span key={j}><Tag cls={cls}>{cls}</Tag>{text}</span>)}</td>
                    <td>{w.evening.map(([cls, text], j) => <span key={j}><Tag cls={cls}>{cls}</Tag>{text}<br /></span>)}</td>
                    <td>{w.wed.map(([cls, text], j) => <span key={j}><Tag cls={cls}>{cls}</Tag>{text}</span>)}</td>
                    <td><div className="deliv">{w.deliverable}</div></td>
                  </tr>
                ))}
                <tr className="finish-row">
                  <td><div className="wday">May 19</div></td>
                  <td colSpan={4}><strong>Pro mode: course complete in 2 weeks. SC-900 booked. 7–8 blog posts. Begin AZ-104 or GCP next.</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

// ── Milestones ──
function MilestonesPanel() {
  return (
    <div>
      <div className="ph"><div className="ph-title">Milestones</div><div className="ph-sub">Where you are and where you're going. Honest dates.</div></div>
      <div className="banner b-amber"><strong>You are not behind.</strong> 2 blog posts in 2 weeks = on pace. Ansible project = Phase 1 work. Starting monitoring this week puts you exactly on plan.</div>
      {[
        { color: '#1D9E75', date: '✓ Apr 19 – May 4, 2026', title: 'Done — weeks 1 & 2', items: ['Plan created, daily habit started', 'Ansible Lab 01 & 02 published on blog', 'Progress tracker + roadmap app built'] },
        { color: '#BA7517', date: 'Basic: Jun 6 · Pro: May 19', title: 'Phase 1 complete — Udemy done', items: ['Udemy DecodingDevOps 100% done', 'Monitoring stack (Grafana + Prometheus + Loki) deployed', 'Docker project on Docker Hub', 'AWS VPC + EC2 built on free tier', 'GitOps pipeline running on EKS', 'SC-900 exam booked', '8+ blog posts live on mradelvand.github.io'] },
        { color: '#D85A30', date: 'Target: Jul 31, 2026', title: 'SC-900 passed + AZ-104 started', items: ['SC-900 certificate in hand', 'AZ-104 study begun (Microsoft Learn path)', 'KillerCoda K8s scenarios 1–3 done', 'LinkedIn profile updated with new certs + projects'] },
        { color: '#534AB7', date: 'Target: Oct 31, 2026', title: 'Phase 2 complete — job search ready', items: ['AZ-104 passed', '15–20 blog posts covering DevOps + Cloud + Security', 'Actively applying: Cloud Engineer / DevSecOps in Montreal', 'GitHub portfolio anchored by GitOps + EKS project'] },
        { color: '#534AB7', date: 'Target: Dec 31, 2026', title: 'New role secured or offer in hand', items: ['CCNA + AZ-900 + SC-900 + AZ-104 certified', 'Portfolio: 20+ posts + 3 real projects on GitHub', 'Targeting $80–110K CAD Cloud/DevSecOps role in Montreal'] },
      ].map((m, i, arr) => (
        <div key={i} className="ml-row">
          <div className="ml-line">
            <div className="ml-dot" style={{ background: m.color }} />
            {i < arr.length - 1 && <div className="ml-stem" />}
          </div>
          <div className="ml-body">
            <div className="ml-date">{m.date}</div>
            <div className="ml-title" style={m.date.startsWith('✓') ? { color: '#1D9E75' } : {}}>{m.title}</div>
            <ul className="ml-items">{m.items.map((it, j) => <li key={j}>{it}</li>)}</ul>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Resources ──
function ResourcesPanel() {
  const items = [
    { icon: '🎓', name: 'Udemy — DecodingDevOps', desc: '43% remaining · 13h video · 6 sections prioritized in Course Sections tab', how: 'Watch at 1.25×. Pause before every command and type it yourself first. If something is broken — write it down and move on.' },
    { icon: '🔷', name: 'Microsoft Learn — SC-900 (free)', desc: '~20 hours total. Covers identity, security, compliance — maps directly to your Entra ID + Intune work.', how: 'One module every Wednesday. Book the exam when you hit 85%+ on practice tests. Ask your employer — they may cover the ~$165 CAD fee.' },
    { icon: '⚙️', name: 'KillerCoda.com — free K8s labs', desc: 'Browser-based Kubernetes. No setup. Real kubectl. Start with "Kubernetes Basics" scenarios.', how: 'One scenario per Saturday after your main lab. Goal is comfort with kubectl before the GitOps section — not passing CKA.' },
    { icon: '☁️', name: 'AWS Free Tier — your account', desc: 'EC2 t2.micro, S3, Lambda, VPC, CloudWatch — all free tier eligible. You have this — use it.', how: 'Set a billing alert at $5. Terraform everything so you can destroy and recreate without cost. Every VPC video → deploy in your real account immediately.' },
    { icon: '✍️', name: 'mradelvand.github.io — your blog', desc: '2 posts live (Ansible Lab 01 & 02). Target: 1 post per section (Basic) or 2 per section (Pro).', how: 'Write in plain language: "here\'s what I built, here\'s the error I hit, here\'s how I fixed it." Use Claude to structure raw notes — that\'s smart, not cheating.' },
    { icon: '🤖', name: 'Claude — daily study tool', desc: 'Quiz yourself, debug errors, structure blog posts, explain concepts differently.', how: '"Quiz me on PromQL — 5 questions increasing difficulty" · "My Grafana can\'t find Prometheus: [paste config]" · "Here are my raw lab notes — structure as a blog post."' },
  ];
  return (
    <div>
      <div className="ph"><div className="ph-title">Resources — how to use each one</div><div className="ph-sub">You have everything you need. The difference is intentional use.</div></div>
      <div className="rlist">
        {items.map(r => (
          <div key={r.name} className="ritem">
            <div className="ricon">{r.icon}</div>
            <div>
              <div className="rname">{r.name}</div>
              <div className="rdesc">{r.desc}</div>
              <div className="rhow">{r.how}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Rules ──
function RulesPanel() {
  const rules = [
    { hl: true, icon: '⏱', title: '80% done = done. Move on.', text: 'If it works at 80%, document what you built, write one line about what failed, and move to the next section. The broken verification in Lab 02 was worth 20 minutes to fix — not a week.' },
    { hl: true, icon: '🎯', title: 'One thing per session', text: 'Before opening the laptop, write: "Today I will finish ___." One specific thing. When it\'s done, close the laptop. This prevents 45 minutes of unfocused browsing.' },
    { hl: false, icon: '⌨️', title: 'Type before you watch', text: 'Pause the video before the instructor types a command. Try it yourself first. Being wrong forces your brain to engage. Correct answers you didn\'t earn don\'t stick.' },
    { hl: false, icon: '🧠', title: 'Understand, don\'t memorize', text: 'If you can explain VPC + subnet + NAT gateway to a non-technical person, you understand it. Commands you can look up. Concepts you cannot. Your Excalidraw diagrams show you understand — trust that.' },
    { hl: false, icon: '📝', title: 'The blog post IS the learning', text: 'You don\'t fully understand something until you can write it plainly. Blog posts are not extra work after studying — they are the studying. Use Claude to help with structure; write the explanation yourself.' },
    { hl: false, icon: '🔄', title: 'Bi-weekly plan refresh', text: 'Every second Saturday: check the weekly schedule. Did you hit the deliverable? If not — slide the schedule forward, no guilt. The plan adjusts to reality.' },
  ];
  return (
    <div>
      <div className="ph"><div className="ph-title">Study rules</div><div className="ph-sub">Written for how you actually learn — and where you actually get stuck.</div></div>
      <div className="rule-grid">
        {rules.map(r => (
          <div key={r.title} className={`rule ${r.hl ? 'hl' : ''}`}>
            <div className="rule-icon">{r.icon}</div>
            <div className="rule-title">{r.title}</div>
            <div className="rule-text">{r.text}</div>
          </div>
        ))}
      </div>
      <div className="banner b-blue" style={{ marginTop: '1.25rem' }}>
        <strong>On Pro mode:</strong> Pro is not a commitment. It is an opportunity on days when you have energy and the evening is free. If you do Pro 2 days a week and Basic 2 days, that is 30% more study time than pure Basic. The toggle is there to help you — not judge you.
      </div>
    </div>
  );
}

// ── Main App ──
export default function App() {
  const [page, setPage] = useState('agent');
  const [mode, setMode] = useState('basic');

  const navItems = [
    { id: 'agent', label: 'Progress coach', color: '#1D9E75' },
    { id: 'daily', label: 'Daily routine', color: '#D85A30' },
    { id: 'sections', label: 'Course sections', color: '#534AB7' },
    { id: 'weekly', label: 'Weekly schedule', color: '#BA7517' },
    { id: 'milestones', label: 'Milestones', color: '#888780' },
    { id: 'resources', label: 'Resources', color: '#888780' },
    { id: 'rules', label: 'Study rules', color: '#185FA5' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <nav className="sidebar">
        <div className="s-logo">
          <strong>Reza's Plan</strong>
          <span>DevOps → Cloud / DevSecOps</span>
        </div>

        <div className="s-section">Navigate</div>
        <div className="nav">
          {navItems.map(n => (
            <NavItem key={n.id} active={page === n.id} onClick={() => setPage(n.id)} color={n.color}>
              {n.label}
            </NavItem>
          ))}
        </div>

        <div className="mode-box">
          <div className="mode-label">Daily mode</div>
          <div className="mode-toggle">
            <button className={`mode-btn ${mode === 'basic' ? 'active-basic' : ''}`} onClick={() => setMode('basic')}>Basic</button>
            <button className={`mode-btn ${mode === 'pro' ? 'active-pro' : ''}`} onClick={() => setMode('pro')}>Pro</button>
          </div>
          <div className="mode-desc">
            {mode === 'basic' ? '45 min morning · finish Jun 6' : '1h morning + 1h evening · finish May 19'}
          </div>

          <div className="prog-wrap">
            {[
              { label: 'Udemy course', pct: 57, color: '#1D9E75' },
              { label: 'Phase 1', pct: 22, color: '#534AB7' },
              { label: 'Blog posts (2/8)', pct: 25, color: '#BA7517' },
            ].map(p => (
              <div key={p.label} className="prog-item">
                <div className="prog-lbl"><span>{p.label}</span><span>{p.pct}%</span></div>
                <div className="prog-track"><div className="prog-fill" style={{ width: `${p.pct}%`, background: p.color }} /></div>
              </div>
            ))}
          </div>
        </div>
      </nav>

      <main className="main">
        <div className={`panel ${page === 'agent' ? 'active' : ''}`}><AgentPanel /></div>
        <div className={`panel ${page === 'daily' ? 'active' : ''}`}><DailyPanel mode={mode} /></div>
        <div className={`panel ${page === 'sections' ? 'active' : ''}`}>
          <div className="ph"><div className="ph-title">Course sections — priority order</div><div className="ph-sub">13 hours of video remaining. Ordered by career value. Click to expand.</div></div>
          <div className="banner b-teal">You learn by doing. Rule: pause the video → type the command yourself → move on. 80% working = done. The blog post is the proof of understanding.</div>
          {SECTIONS.map(s => <SectionBlock key={s.id} sec={s} mode={mode} />)}
        </div>
        <div className={`panel ${page === 'weekly' ? 'active' : ''}`}><WeeklyPanel mode={mode} /></div>
        <div className={`panel ${page === 'milestones' ? 'active' : ''}`}><MilestonesPanel /></div>
        <div className={`panel ${page === 'resources' ? 'active' : ''}`}><ResourcesPanel /></div>
        <div className={`panel ${page === 'rules' ? 'active' : ''}`}><RulesPanel /></div>
      </main>
    </div>
  );
}
