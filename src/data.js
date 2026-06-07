// ─────────────────────────────────────────────────────────────────────────────
// SECTIONS — course content
// Monitoring ✓ done  |  Docker ✓ done  |  VPC ▶ current
// ─────────────────────────────────────────────────────────────────────────────
export const SECTIONS = [
  {
    id: 's1', color: '#1D9E75', badge: '✓ Done', badgeStyle: { background: '#E1F5EE', color: '#0F6E56' },
    title: '1 · Monitoring & Observability',
    meta: '162 min video · COMPLETE · Blog post published',
    whyFirst: 'Prometheus + Grafana + Loki is used at most companies right now. You can set this up at your current job. Interviewers ask about it constantly.',
    labBasic: 'A running Grafana dashboard showing metrics from one service. Screenshot on GitHub. Blog post published. ✓',
    labPro: 'Add Loki log ingestion + configure one Slack alert. Blog post with architecture diagram.',
    videos: [
      { n: 250, t: 'Introduction to Monitoring', m: '15m' },
      { n: 251, t: 'Why Monitoring is Essential', m: '3m' },
      { n: 252, t: 'Monitoring & Observability Tools', m: '13m' },
      { n: 253, t: 'Setting Up Environment', m: '15m' },
      { n: 254, t: 'Loki & Web Server Setup', m: '20m' },
      { n: 255, t: 'Adding a Node to Prometheus', m: '16m' },
      { n: 256, t: 'Understanding PromQL', m: '16m' },
      { n: 257, t: 'Connecting Grafana & Prometheus', m: '7m' },
      { n: 258, t: 'Slack Notifications', m: '4m' },
      { n: 259, t: 'PromQL for Grafana Dashboards', m: '12m' },
      { n: 260, t: 'Building Grafana Panels', m: '17m' },
      { n: 261, t: 'Creating Alerts & Thresholds', m: '11m' },
      { n: 262, t: 'Loki + Alloy for Logs & Metrics', m: '13m' },
    ],
  },
  {
    id: 's2', color: '#1D9E75', badge: '✓ Done', badgeStyle: { background: '#E1F5EE', color: '#0F6E56' },
    title: '2 · Docker Deep Dive',
    meta: '128 min video · COMPLETE · Blog post published',
    whyFirst: 'Docker is the foundation of GitOps and EKS. Containers solid = prerequisite done.',
    labBasic: 'Docker image built, pushed to Docker Hub. Blog post published. ✓',
    labPro: 'Containerize the monitoring stack from section 1 using Docker Compose. Multi-stage Dockerfile. Blog post with Compose file explained.',
    videos: [
      { n: 302, t: 'Docker Introduction', m: '19m' },
      { n: 303, t: 'Docker Setup', m: '9m' },
      { n: 304, t: 'Commands & Concepts', m: '22m' },
      { n: 305, t: 'Docker Logs', m: '8m' },
      { n: 306, t: 'Volumes', m: '17m' },
      { n: 307, t: 'Building Images', m: '21m' },
      { n: 308, t: 'Entrypoint & CMD', m: '7m' },
      { n: 309, t: 'Docker Compose', m: '15m' },
      { n: 310, t: 'Multi-Stage Dockerfile', m: '10m' },
    ],
  },
  {
    id: 's3', color: '#D85A30', badge: '▶ Current', badgeStyle: { background: '#FAECE7', color: '#993C1D' },
    title: '3 · AWS VPC & Core Services (Free-Tier Safe)',
    meta: '166 min video · Basic: ~2 weeks · Started May 18',
    whyFirst: 'VPC + EC2 = cloud fundamentals every employer asks about. Free tier covers everything you need here.',
    labBasic: `FREE TIER ONLY — do not spin up NAT Gateway or RDS (they cost money).

What you CAN build for free:
• VPC with 1 public subnet + 1 private subnet
• Internet Gateway attached to public subnet
• EC2 t2.micro in public subnet (750h/month free)
• Security groups as your firewall
• SSH in, run a simple web server

Skip or watch-only: NAT Gateway (~$1/day), VPC Peering (watch only), RDS.
Terraform the VPC so you can destroy and recreate without cost.
Blog post: "Production-like VPC on AWS free tier."`,
    labPro: 'Add a bastion host + Lambda + EC2 log shipping to CloudWatch. Blog post comparing AWS-native logs vs Loki.',
    videos: [
      { n: 263, t: 'VPC Introduction', m: '28m' },
      { n: 264, t: 'VPC Design & Components', m: '9m' },
      { n: 265, t: 'VPC Setup Details', m: '4m' },
      { n: 266, t: 'Default VPC', m: '7m' },
      { n: 267, t: 'Create VPC', m: '6m' },
      { n: 268, t: 'Subnets', m: '3m' },
      { n: 269, t: 'Internet Gateway', m: '2m' },
      { n: 270, t: 'Route Tables', m: '4m' },
      { n: 271, t: 'NAT Gateway (watch-only — costs money)', m: '6m' },
      { n: 272, t: 'Bastion Host', m: '9m' },
      { n: 273, t: 'Website in VPC', m: '14m' },
      { n: 274, t: 'Peering (watch-only)', m: '11m' },
      { n: 275, t: 'Terraform for VPC', m: '13m' },
      { n: 276, t: 'EC2 Logs', m: '31m' },
      { n: 277, t: 'AWS Lambda', m: '19m' },
    ],
  },
  {
    id: 's4', color: '#BA7517', badge: 'Priority 4', badgeStyle: { background: '#FAEEDA', color: '#854F0B' },
    title: '4 · GitOps & EKS — Capstone',
    meta: '126 min video · Basic: ~1 week · After VPC done',
    whyFirst: 'This is the employer-visible project. GitHub Actions + Terraform + EKS auto-deploying on every commit. This one project can get you an interview.',
    labBasic: 'A working GitHub Actions pipeline that deploys to EKS. Public repo. Blog post: "GitOps pipeline from scratch."',
    labPro: 'Add the monitoring stack from section 1 to the EKS cluster. Blog series (2 posts): architecture + build walkthrough. Portfolio centrepiece.',
    videos: [
      { n: 361, t: 'GitOps Introduction', m: '7m' },
      { n: 362, t: 'Project Architecture', m: '6m' },
      { n: 363, t: 'Prepare GitHub Repo', m: '8m' },
      { n: 364, t: 'GitHub Secrets', m: '7m' },
      { n: 365, t: 'Terraform Code', m: '13m' },
      { n: 366, t: 'Staging Workflow for Terraform', m: '27m' },
      { n: 367, t: 'Main Workflow for Terraform', m: '14m' },
      { n: 368, t: 'Workflow for vProfile App', m: '17m' },
      { n: 369, t: 'Docker Build & Publish', m: '5m' },
      { n: 370, t: 'Deploy to EKS', m: '17m' },
      { n: 371, t: 'Cleanup', m: '5m' },
    ],
  },
  {
    id: 's5', color: '#888780', badge: 'Priority 5', badgeStyle: { background: '#F1EFE8', color: '#444441' },
    title: '5 · AWS CodePipeline / Beanstalk',
    meta: '73 min video · After GitOps done',
    whyFirst: 'AWS-native CI/CD. Less portable than GitHub Actions but good to know. Do after GitOps so the comparison clicks naturally.',
    labBasic: 'Deploy a simple app through CodePipeline to Beanstalk. Document the differences vs GitHub Actions.',
    labPro: 'Same as basic — this section is straightforward.',
    videos: [
      { n: 282, t: 'Introduction', m: '4m' },
      { n: 283, t: 'Beanstalk', m: '7m' },
      { n: 284, t: 'RDS & App on Beanstalk', m: '12m' },
      { n: 285, t: 'CodeCommit', m: '14m' },
      { n: 286, t: 'CodeBuild', m: '22m' },
      { n: 287, t: 'Build, Deploy & Pipeline', m: '14m' },
    ],
  },
  {
    id: 's6', color: '#888780', badge: 'Priority 6 — optional', badgeStyle: { background: '#F1EFE8', color: '#444441' },
    title: '6 · GCP vProfile Project',
    meta: '123 min video · Do only after sections 1–4 are complete',
    whyFirst: 'Montreal jobs are mostly AWS + Azure. GCP is a bonus differentiator. Skip if approaching a job search.',
    labBasic: 'Full vProfile app running on GCP with load balancer. Blog post: "GCP vs AWS — what I noticed."',
    labPro: 'Same as basic plus Cloud SQL performance comparison post.',
    videos: [
      { n: 288, t: 'GCP vProfile Intro', m: '11m' },
      { n: 289, t: 'Architecture Overview', m: '7m' },
      { n: 290, t: 'GCP Account Setup', m: '6m' },
      { n: 291, t: 'Commands & Source Code', m: '6m' },
      { n: 292, t: 'Project Variables', m: '7m' },
      { n: 293, t: 'VPC, Subnets & Network', m: '9m' },
      { n: 294, t: 'Firewall & VM Deployment', m: '14m' },
      { n: 295, t: 'Cloud SQL & Memorystore', m: '11m' },
      { n: 296, t: 'Cloud DNS', m: '8m' },
      { n: 297, t: 'Custom VM Image', m: '11m' },
      { n: 298, t: 'Managed Instance Group', m: '5m' },
      { n: 299, t: 'HTTP/HTTPS Load Balancer', m: '11m' },
      { n: 300, t: 'SSL & Final DNS', m: '9m' },
      { n: 301, t: 'Summary & Cleanup', m: '8m' },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// AZ-104 CHALLENGE TRACKER via azurecertprep.github.io
// 28 challenges total across 6 domains — 1 per Wednesday morning
// Done in parallel with the Udemy course so by the time you finish Udemy,
// you're already 10+ challenges deep into AZ-104 prep.
// ─────────────────────────────────────────────────────────────────────────────
export const AZ104_CHALLENGES = [
  // Identity & Governance (20–25%) — challenges 01, 02, 03, 17, 18
  { n: '01', domain: 'Identity', title: 'Manage Azure AD Users & Groups',      url: 'https://azurecertprep.github.io/docs/az-104/identity/challenge-01' },
  { n: '02', domain: 'Identity', title: 'RBAC & Role Assignments',             url: 'https://azurecertprep.github.io/docs/az-104/identity/challenge-02' },
  { n: '03', domain: 'Identity', title: 'Azure Policy & Blueprints',           url: 'https://azurecertprep.github.io/docs/az-104/identity/challenge-03' },
  // Storage (15–20%) — challenges 04, 05, 06, 19, 20
  { n: '04', domain: 'Storage', title: 'Storage Accounts & Blob Storage',      url: 'https://azurecertprep.github.io/docs/az-104/storage/challenge-04' },
  { n: '05', domain: 'Storage', title: 'File Shares & Azure Files',            url: 'https://azurecertprep.github.io/docs/az-104/storage/challenge-05' },
  { n: '06', domain: 'Storage', title: 'Storage Security & Access Keys',       url: 'https://azurecertprep.github.io/docs/az-104/storage/challenge-06' },
  // Compute (20–25%) — challenges 07–10, 21–23
  { n: '07', domain: 'Compute', title: 'Virtual Machines — Deploy & Configure', url: 'https://azurecertprep.github.io/docs/az-104/compute/challenge-07' },
  { n: '08', domain: 'Compute', title: 'VM Scale Sets & Availability',          url: 'https://azurecertprep.github.io/docs/az-104/compute/challenge-08' },
  { n: '09', domain: 'Compute', title: 'Azure App Service & Functions',         url: 'https://azurecertprep.github.io/docs/az-104/compute/challenge-09' },
  { n: '10', domain: 'Compute', title: 'Containers & ACI',                      url: 'https://azurecertprep.github.io/docs/az-104/compute/challenge-10' },
  // Networking (15–20%) — challenges 11–13, 24–26
  { n: '11', domain: 'Networking', title: 'VNet & Subnet Design',              url: 'https://azurecertprep.github.io/docs/az-104/networking/challenge-11' },
  { n: '12', domain: 'Networking', title: 'NSG & Application Gateway',         url: 'https://azurecertprep.github.io/docs/az-104/networking/challenge-12' },
  { n: '13', domain: 'Networking', title: 'VNet Peering & VPN Gateway',        url: 'https://azurecertprep.github.io/docs/az-104/networking/challenge-13' },
  // Monitor (10–15%) — challenges 14, 15, 27, 28
  { n: '14', domain: 'Monitor', title: 'Azure Monitor & Log Analytics',        url: 'https://azurecertprep.github.io/docs/az-104/monitor/challenge-14' },
  { n: '15', domain: 'Monitor', title: 'Alerts, Metrics & Diagnostics',        url: 'https://azurecertprep.github.io/docs/az-104/monitor/challenge-15' },
  // Capstone
  { n: '16', domain: 'Capstone', title: 'Cross-domain Capstone Lab',           url: 'https://azurecertprep.github.io/docs/az-104/capstone/challenge-16' },
];

// ─────────────────────────────────────────────────────────────────────────────
// BASIC WEEKS — VPC is current (Jun 2026), AZ-104 in Wednesday morning slot
// ─────────────────────────────────────────────────────────────────────────────
export const BASIC_WEEKS = [
  {
    week: 'Wk 1–4', dates: 'Done',
    monTue: [['watch', 'Monitoring complete'], ['lab', 'Grafana + Prometheus + Loki running']],
    wed: [['blog', 'Blog posts #3 (Monitoring) + #4 (Docker) published']],
    thu: [['watch', 'Docker complete']],
    deliverable: '✓ Monitoring done · Docker done · Blog posts #3 + #4 published',
  },
  {
    week: 'Wk 5', dates: 'May 25–Jun 1',
    monTue: [['watch', '263–270 VPC core: subnets, IGW, routes'], ['note', 'Skip 271 NAT Gateway in hands-on (costs $)']],
    wed: [['cert', 'AZ-104 challenge 01 — Users & Groups (azurecertprep.github.io)'], ['note', '⚽ Soccer 19:00–21:00 — do cert in morning before soccer']],
    thu: [['watch', '272–275 Bastion host + Terraform VPC']],
    deliverable: 'VPC + EC2 t2.micro live in AWS + Terraform on GitHub',
  },
  {
    week: 'Wk 6', dates: 'Jun 2–8',
    monTue: [['watch', '276–277 EC2 Logs + Lambda']],
    wed: [['cert', 'AZ-104 challenge 02 — RBAC & Role Assignments'], ['note', '⚽ Soccer — do cert in morning']],
    thu: [['blog', 'Blog post #5 — VPC on free tier (Docusaurus format)']],
    deliverable: 'Blog post #5 published · VPC section 100% done',
  },
  {
    week: 'Wk 7', dates: 'Jun 9–15',
    monTue: [['watch', '361–365 GitOps intro + Terraform code']],
    wed: [['cert', 'AZ-104 challenge 03 — Azure Policy & Blueprints'], ['note', '⚽ Soccer evening']],
    thu: [['watch', '366–368 Staging + main workflows']],
    deliverable: 'GitHub Actions workflow running for first time',
  },
  {
    week: 'Wk 8', dates: 'Jun 16–22',
    monTue: [['watch', '369–371 EKS deploy + cleanup']],
    wed: [['cert', 'AZ-104 challenge 04 — Storage Accounts'], ['lab', 'EKS pipeline live — full test']],
    thu: [['blog', 'Blog post #6 — GitOps pipeline walkthrough']],
    deliverable: 'EKS pipeline working · blog #6 published',
  },
  {
    week: 'Wk 9', dates: 'Jun 23–29',
    monTue: [['watch', '282–287 CodePipeline + Beanstalk']],
    wed: [['cert', 'AZ-104 challenge 05 — Azure Files'], ['lab', 'CodePipeline deploy working']],
    thu: [['review', 'Portfolio review — GitHub + blog + SadServers score']],
    deliverable: 'Course 100% complete · portfolio ready · 5 AZ-104 challenges done',
  },
];

export const PRO_WEEKS = [
  {
    week: 'Done', dates: 'Complete',
    morning: [['watch', 'Monitoring + Docker complete']],
    evening: [['blog', 'Blog posts #3 + #4 published']],
    wed: [['note', 'Soccer Wed evenings — cert done Wed morning instead']],
    deliverable: '✓ Monitoring + Docker done',
  },
  {
    week: 'Wk 5', dates: 'May 25–29',
    morning: [['watch', '263–275 VPC core + Terraform (skip 271 hands-on)']],
    evening: [['deploy', 'VPC + EC2 t2.micro in AWS free tier']],
    wed: [['cert', 'AZ-104 ch01 — Users & Groups (morning) · ⚽ Soccer (evening)']],
    deliverable: 'VPC + EC2 live + Terraform on GitHub',
  },
  {
    week: 'Wk 5–6', dates: 'May 30–Jun 8',
    morning: [['watch', '276–277 EC2 Logs + Lambda']],
    evening: [['blog', 'Draft VPC blog post in Docusaurus format']],
    wed: [['cert', 'AZ-104 ch02 — RBAC (morning) · ⚽ Soccer (evening)']],
    deliverable: 'Blog #5 published · VPC section done',
  },
  {
    week: 'Wk 6–7', dates: 'Jun 9–22',
    morning: [['watch', '361–371 GitOps + EKS'], ['watch', '282–287 CodePipeline']],
    evening: [['deploy', 'GitOps pipeline on EKS'], ['blog', 'Blog posts #6 + #7']],
    wed: [['cert', 'AZ-104 ch03 + ch04 (morning) · ⚽ Soccer (evening)']],
    deliverable: 'EKS pipeline live · course 100% · 7 blog posts · 4 AZ-104 challenges',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// POST-COURSE ROADMAP
// AZ-104 via azurecertprep.github.io (already started in parallel)
// Then AZ-400 from MSLevelUp (requires AZ-104)
// ─────────────────────────────────────────────────────────────────────────────
export const POST_COURSE_ROADMAP = [
  {
    phase: 'In parallel now',
    title: 'AZ-104 prep — azurecertprep.github.io',
    timing: 'Every Wednesday morning — 1 challenge per week',
    why: 'azurecertprep.github.io has 28 hands-on challenges covering the full AZ-104 exam. You start NOW, one challenge per Wednesday, so by the time you finish Udemy (~Wk 9) you\'re already 9+ challenges deep. No Azure subscription needed for many challenges — GitHub Codespaces provides the lab environment free (60h/month).',
    resource: 'azurecertprep.github.io/docs/az-104/overview — free, validated commands, break-and-fix scenarios, exam-style knowledge checks',
    duration: '28 weeks at 1/week — or accelerate after Udemy',
    color: '#185FA5',
  },
  {
    phase: 'Phase 2 — after Udemy done',
    title: 'AZ-104 exam — Azure Administrator',
    timing: 'Book exam ~Sep 2026 after completing all 28 challenges',
    why: 'AZ-104 is the prerequisite for AZ-400. It also maps directly to your real Entra ID + Intune work — most of the Identity domain will feel like review. Exam ~$250 CAD. Your employer may cover it.',
    resource: 'Microsoft Learn official path + azurecertprep.github.io challenges + free practice assessment at learn.microsoft.com',
    duration: '6–8 weeks intensive (or already done by weekly prep)',
    color: '#534AB7',
  },
  {
    phase: 'Phase 3 — after AZ-104 passed',
    title: 'AZ-400 — DevOps Engineer Expert (MSLevelUp)',
    timing: 'Oct 2026 onwards',
    why: 'THIS is the MSLevelUp course. By the time you do this, GitHub Actions + Terraform + EKS are already in your muscle memory. azurecertprep.github.io also has 51 AZ-400 challenges. The cert will feel like a formality.',
    resource: 'skillupwithlevelup.com — AZ-400 + azurecertprep.github.io/docs/az-400/overview',
    duration: '3–4 weeks prep',
    color: '#BA7517',
  },
  {
    phase: 'Job Search',
    title: 'Apply — Cloud Engineer / DevSecOps Montreal',
    timing: 'Nov–Dec 2026',
    why: 'CCNA + AZ-104 + AZ-400 + GitOps portfolio = strong candidate in Montreal. Target $80–110K CAD.',
    resource: 'LinkedIn, Workday, direct applications to Azure-heavy companies in Montreal',
    duration: 'Active search',
    color: '#D85A30',
  },
];
