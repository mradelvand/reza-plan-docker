import { useState } from 'react';
import AgentPanel from './AgentPanel.jsx';
import { SECTIONS, BASIC_WEEKS, PRO_WEEKS, POST_COURSE_ROADMAP } from './data.js';

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
        <div className="ph-sub">Switch between Basic and Pro in the sidebar. Soccer days (Wed + Sat) = morning-only or skip — that's fine.</div>
      </div>

      {/* Soccer schedule notice */}
      <div className="banner b-amber">
        <strong>Recurring soccer coaching blocks:</strong><br />
        Wednesday: 19:00–21:00 · Saturday: 07:30–09:15<br />
        On these days: study in the morning only, or take it as a rest day. Both are valid. The plan accounts for this.
      </div>

      {mode === 'basic' ? (
        <>
          <span className="mode-badge mb-basic">Basic mode — 45 min morning</span>
          <div className="banner b-teal">
            <strong>Your fixed slot: 6:00–6:45am Mon–Fri · skip or shorten on soccer days</strong><br />
            This is the minimum that keeps you moving. Consistency at Basic beats sporadic Pro sessions every time.
          </div>
          <div className="sched-grid">
            {[
              { name: 'Mon', cls: 'today', slot: '6:00–6:45am', sub: 'Watch + type commands' },
              { name: 'Tue', cls: '', slot: '6:00–6:45am', sub: 'Continue lab or next videos' },
              { name: 'Wed', cls: '', slot: '6:00–6:45am', sub: '⚽ Soccer 19–21 · morning only' },
              { name: 'Thu', cls: '', slot: '6:00–6:45am', sub: 'New section or review' },
              { name: 'Sat', cls: '', slot: 'after 9:15am', sub: '⚽ Soccer 7:30–9:15 · rest after' },
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
          <div className="stat-row">
            <div className="stat"><div className="stat-n">270</div><div className="stat-l">min/week (Basic)</div></div>
            <div className="stat"><div className="stat-n" style={{ color: 'var(--teal)' }}>Jun 30</div><div className="stat-l">course done (adjusted)</div></div>
            <div className="stat"><div className="stat-n">8+</div><div className="stat-l">blog posts target</div></div>
          </div>
        </>
      ) : (
        <>
          <span className="mode-badge mb-pro">Pro mode — 1h morning + 1h evening</span>
          <div className="banner b-purple">
            <strong>Pro is opt-in, not required.</strong> Soccer days are morning-only by default. A full Basic week beats two Pro days that burn you out.
          </div>
          <div className="sched-grid">
            {[
              { name: 'Mon', cls: 'today', slot: '6:00–7:00am', sub: 'Watch + hands-on\n9:00–10:00pm deploy' },
              { name: 'Tue', cls: '', slot: '6:00–7:00am', sub: 'Continue section\n9:00–10:00pm blog draft' },
              { name: 'Wed', cls: '', slot: '6:00–7:00am', sub: '⚽ Soccer 19–21\nEvening = skip' },
              { name: 'Thu', cls: '', slot: '6:00–7:00am', sub: 'New section start\n9:00–10:00pm polish' },
              { name: 'Sat', cls: '', slot: 'after 9:15am', sub: '⚽ Soccer ends 9:15\nRest or light review' },
            ].map(d => (
              <div key={d.name} className={`day ${d.cls}`}>
                <div className="day-name">{d.name}</div>
                <div className="slot" style={{ whiteSpace: 'pre-line' }}>{d.slot}</div>
                <div className="slot-sub" style={{ whiteSpace: 'pre-line' }}>{d.sub}</div>
              </div>
            ))}
          </div>
          <div className="stat-row">
            <div className="stat"><div className="stat-n">~480</div><div className="stat-l">min/week (Pro, soccer weeks)</div></div>
            <div className="stat"><div className="stat-n" style={{ color: 'var(--purple)' }}>Jun 15</div><div className="stat-l">course done (Pro, adjusted)</div></div>
            <div className="stat"><div className="stat-n">10+</div><div className="stat-l">blog posts (Pro)</div></div>
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
        <div className="ph-sub">Soccer blocks shown. Every Monday: use the "This Week" tab in Progress Coach to set your specific goal for that week.</div>
      </div>
      {mode === 'basic' ? (
        <>
          <span className="mode-badge mb-basic">Basic mode — adjusted for soccer schedule</span>
          <div className="banner b-teal">Docker ✓ done. Now on AWS VPC. Each week has one lab goal and one blog post target.</div>
          <div className="wtable-wrap">
            <table className="wtable">
              <thead>
                <tr><th>Week</th><th>Mon / Tue</th><th>Wed (⚽ eve)</th><th>Thu</th><th>Saturday deliverable</th></tr>
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
                  <td><div className="wday">~Jun 30</div></td>
                  <td colSpan={4}><strong>Course 100% done. 8 blog posts. Phase 1 complete. Start AZ-104 next.</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <>
          <span className="mode-badge mb-pro">Pro mode — soccer days = morning only</span>
          <div className="banner b-purple">Pro mode compresses timeline. Wed evening always skipped (soccer). Sat morning only after 9:15.</div>
          <div className="wtable-wrap">
            <table className="wtable">
              <thead>
                <tr><th>Week</th><th>Morning focus</th><th>Evening focus</th><th>Wed note</th><th>Saturday deliverable</th></tr>
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
                  <td><div className="wday">~Jun 15</div></td>
                  <td colSpan={4}><strong>Pro mode: course complete. 7–8 blog posts. Begin AZ-104 study next.</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

// ── Milestones ── updated, SC-900 removed, AZ-400 post-course
function MilestonesPanel() {
  return (
    <div>
      <div className="ph"><div className="ph-title">Milestones</div><div className="ph-sub">Where you are and where you're going. Soccer coaching schedule accounted for.</div></div>
      <div className="banner b-teal"><strong>Real status May 25:</strong> Monitoring ✓ done. Docker ✓ done + blog published. AWS VPC in progress. Schedule adjusted for soccer coaching on Wed + Sat.</div>
      {[
        { color: '#1D9E75', date: '✓ Apr 19 – May 24, 2026', title: 'Done — weeks 1–5', items: ['Plan created, daily habit started', 'Ansible Lab 01 & 02 published on blog', 'Monitoring section complete (Grafana + Prometheus + Loki)', 'Docker section complete + blog post published', 'Progress tracker app built and deployed on Codespace'] },
        { color: '#D85A30', date: 'Target: Jun 30, 2026', title: 'Phase 1 complete — Udemy done', items: ['AWS VPC + EC2 deployed on free tier (no NAT Gateway — costs money)', 'GitOps pipeline running on EKS (GitHub Actions + Terraform)', 'CodePipeline on Beanstalk done', '8+ blog posts live on mradelvand.github.io', 'Soccer schedule accounted for throughout'] },
        { color: '#BA7517', date: 'Target: Aug 31, 2026', title: 'AZ-104 passed', items: ['AZ-104 study started after Udemy 100% done', 'Microsoft Learn free path + practice tests', 'AZ-104 exam booked and passed (~$250 CAD)', 'LinkedIn profile updated', 'KillerCoda K8s scenarios 1–3 done'] },
        { color: '#534AB7', date: 'Target: Oct 31, 2026', title: 'AZ-400 passed — job search ready', items: ['AZ-400: DevOps Engineer Expert (MSLevelUp course — free, 10h, requires AZ-104 first)', 'CCNA + AZ-104 + AZ-400 = competitive Montreal candidate', 'Portfolio: 15–20 blog posts + GitOps + EKS project on GitHub', 'Actively applying: Cloud Engineer / DevSecOps in Montreal'] },
        { color: '#534AB7', date: 'Target: Dec 31, 2026', title: 'New role secured or offer in hand', items: ['Targeting $80–110K CAD Cloud/DevSecOps in Montreal', 'Soccer coaching continues as side income — compatible with new role'] },
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

// ── Post-Course Roadmap ── NEW
function RoadmapPanel() {
  return (
    <div>
      <div className="ph">
        <div className="ph-title">Post-Course Roadmap</div>
        <div className="ph-sub">What comes after the Udemy course finishes. Don't jump to this — finish Udemy first.</div>
      </div>

      <div className="banner b-amber">
        <strong>About MSLevelUp AZ-400 (the course you found):</strong><br />
        This is the right course — but it requires AZ-104 as a prerequisite. AZ-400 is an Expert-level cert. Your Udemy hands-on work (GitOps, Docker, Monitoring) is exactly what makes AZ-400 feel easy later. The order below is correct. Don't skip ahead.
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: '1.5rem' }}>
        {POST_COURSE_ROADMAP.map((item, i) => (
          <div key={i} className="agent-card" style={{ borderLeft: `3px solid ${item.color}` }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 8 }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: item.color, fontWeight: 600, whiteSpace: 'nowrap', marginTop: 2 }}>{item.phase}</span>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 2 }}>{item.title}</div>
                <div style={{ fontSize: 11, color: 'var(--text-h)', fontFamily: 'var(--mono)' }}>{item.timing} · {item.duration}</div>
              </div>
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-m)', lineHeight: 1.7, marginBottom: 6 }}>{item.why}</div>
            <div style={{ fontSize: 12, color: item.color, fontStyle: 'italic' }}>Resource: {item.resource}</div>
          </div>
        ))}
      </div>

      <div className="banner b-blue">
        <strong>Rule for new resources you find:</strong> When you find something that looks interesting (like AZ-400), write it here instead of switching to it. Finish the current thing. Then evaluate at a natural transition point. Jumping early costs 2–3 weeks of context-switching every time.
      </div>

      <div className="agent-card">
        <div className="form-label" style={{ marginBottom: 10 }}>Resources parked for later — do not start yet</div>
        {[
          { name: 'AZ-400: DevOps Engineer (MSLevelUp)', when: 'After AZ-104 passed', why: 'Needs AZ-104 first. Your Udemy work makes this cert straightforward.' },
          { name: 'KillerCoda K8s scenarios', when: 'Saturdays, one per week from Wk 7 onward', why: 'Good K8s practice — add it as a Saturday activity once GitOps section starts.' },
          { name: 'GCP vProfile Project (Udemy section 6)', when: 'Optional, after sections 1–4 done', why: 'Montreal is mostly AWS + Azure. Nice-to-have, not urgent.' },
        ].map((r, i) => (
          <div key={i} style={{ borderBottom: '0.5px solid var(--border)', padding: '8px 0', fontSize: 13 }}>
            <div style={{ fontWeight: 500, marginBottom: 2 }}>{r.name}</div>
            <div style={{ fontSize: 12, color: 'var(--text-m)' }}>When: {r.when}</div>
            <div style={{ fontSize: 12, color: 'var(--text-h)' }}>{r.why}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Resources ──
function ResourcesPanel() {
  const items = [
    { icon: '🎓', name: 'Udemy — DecodingDevOps', desc: '~35% remaining · Monitoring ✓ · Docker ✓ · Now: VPC → GitOps → CodePipeline', how: 'Watch at 1.25×. Pause before every command and type it yourself first. Free-tier only on AWS: no NAT Gateway, no RDS.' },
    { icon: '⚙️', name: 'KillerCoda.com — free K8s labs', desc: 'Browser-based Kubernetes. No setup. Real kubectl. Start with "Kubernetes Basics" scenarios.', how: 'Start once you reach GitOps section (Wk 7+). One scenario per Saturday after main lab. Goal: comfort with kubectl before EKS.' },
    { icon: '☁️', name: 'AWS Free Tier — your account', desc: 'EC2 t2.micro, S3, Lambda, VPC — free tier eligible. Set a billing alert at $5. Avoid NAT Gateway ($1/day) and RDS.', how: 'Terraform everything so you can destroy and recreate without cost. Every VPC video → deploy in your real account. Watch-only for paid services.' },
    { icon: '✍️', name: 'mradelvand.github.io — your blog', desc: '4 posts live (Ansible ×2, Monitoring, Docker). Target: 1 post per section completed.', how: 'Write in plain language. Use Claude to structure raw notes — that\'s smart, not cheating. Publish at 80% ready, not 100%.' },
    { icon: '🤖', name: 'Claude — daily study tool', desc: 'Quiz yourself, debug errors, structure blog posts, explain concepts differently.', how: '"Quiz me on VPC — 5 questions increasing difficulty" · "My EC2 can\'t reach internet: [paste security group config]" · "Here are my raw VPC lab notes — structure as a blog post."' },
    { icon: '🔷', name: 'Microsoft Learn — AZ-104 (after Udemy)', desc: 'Free official path. Start only after Udemy 100% done. ~40h. Prerequisite for AZ-400.', how: 'Do not start yet. Add it to your calendar for July. Then: one module per day at 6am.' },
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
    { hl: false, icon: '🚫', title: 'No new resources until Udemy is done', text: 'Found AZ-400 on MSLevelUp? Good — it\'s in the roadmap. Found another course? Add it to the "Parked" list. Finish the Udemy course first. Jumping costs you 2–3 weeks every time.' },
    { hl: false, icon: '⌨️', title: 'Type before you watch', text: 'Pause the video before the instructor types a command. Try it yourself first. Being wrong forces your brain to engage. Correct answers you didn\'t earn don\'t stick.' },
    { hl: false, icon: '📝', title: 'The blog post IS the learning', text: 'You don\'t fully understand something until you can write it plainly. Blog posts are not extra work after studying — they are the studying. Use Claude to help with structure; write the explanation yourself.' },
    { hl: false, icon: '⚽', title: 'Soccer days are part of the plan', text: 'Wednesday evening and Saturday morning are blocked by soccer coaching. These are not failures. The plan accounts for them. A good Mon/Tue/Thu week is still a successful week.' },
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
    </div>
  );
}

// ── Main App ──
export default function App() {
  const [page, setPage] = useState('agent');
  const [mode, setMode] = useState('basic');

  const navItems = [
    { id: 'agent',     label: 'Progress coach',      color: '#1D9E75' },
    { id: 'daily',     label: 'Daily routine',        color: '#D85A30' },
    { id: 'sections',  label: 'Course sections',      color: '#534AB7' },
    { id: 'weekly',    label: 'Weekly schedule',      color: '#BA7517' },
    { id: 'milestones',label: 'Milestones',           color: '#888780' },
    { id: 'roadmap',   label: 'Post-course roadmap',  color: '#BA7517' },
    { id: 'resources', label: 'Resources',            color: '#888780' },
    { id: 'rules',     label: 'Study rules',          color: '#185FA5' },
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
            {mode === 'basic' ? '45 min morning · finish ~Jun 30' : '1h morning + 1h evening · finish ~Jun 15'}
          </div>

          <div className="prog-wrap">
            {[
              { label: 'Monitoring ✓', pct: 100, color: '#1D9E75' },
              { label: 'Docker ✓', pct: 100, color: '#1D9E75' },
              { label: 'AWS VPC (current)', pct: 15, color: '#D85A30' },
              { label: 'Blog posts (4/8)', pct: 50, color: '#BA7517' },
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
        <div className={`panel ${page === 'agent'      ? 'active' : ''}`}><AgentPanel /></div>
        <div className={`panel ${page === 'daily'      ? 'active' : ''}`}><DailyPanel mode={mode} /></div>
        <div className={`panel ${page === 'sections'   ? 'active' : ''}`}>
          <div className="ph"><div className="ph-title">Course sections — priority order</div><div className="ph-sub">Monitoring ✓ done · Docker ✓ done · VPC is current. Click to expand.</div></div>
          <div className="banner b-teal">Free-tier alert on AWS VPC: NAT Gateway (~$1/day) and RDS cost money. Skip hands-on for those — watch-only is fine.</div>
          {SECTIONS.map(s => <SectionBlock key={s.id} sec={s} mode={mode} />)}
        </div>
        <div className={`panel ${page === 'weekly'     ? 'active' : ''}`}><WeeklyPanel mode={mode} /></div>
        <div className={`panel ${page === 'milestones' ? 'active' : ''}`}><MilestonesPanel /></div>
        <div className={`panel ${page === 'roadmap'    ? 'active' : ''}`}><RoadmapPanel /></div>
        <div className={`panel ${page === 'resources'  ? 'active' : ''}`}><ResourcesPanel /></div>
        <div className={`panel ${page === 'rules'      ? 'active' : ''}`}><RulesPanel /></div>
      </main>
    </div>
  );
}
