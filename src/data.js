// ─────────────────────────────────────────────────────────────────────────────
// SECTIONS — course content (SC-900 removed)
// ─────────────────────────────────────────────────────────────────────────────
export const SECTIONS = [
  {
    id: 's1', color: '#1D9E75', badge: '✓ Done', badgeStyle: { background: '#E1F5EE', color: '#0F6E56' },
    title: '1 · Monitoring & Observability',
    meta: '162 min video · COMPLETE',
    whyFirst: 'Prometheus + Grafana + Loki is used at most companies right now. You can set this up at your current job. Interviewers ask about it constantly.',
    labBasic: 'A running Grafana dashboard showing metrics from one service. One screenshot on GitHub. One blog post.',
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
    whyFirst: 'Docker is the foundation of GitOps and EKS (section 4). Containers solid = prerequisite done.',
    labBasic: 'Build a Docker image for any app. Push to Docker Hub. Blog post: "My first containerized app." ✓',
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
• SSH in, run a simple web server, done

Skip or watch-only: NAT Gateway (costs ~$1/day), VPC Peering (watch only), RDS.

Terraform the VPC so you can destroy and recreate without cost.
Blog post: "Production-like VPC on AWS free tier."`,
    labPro: 'Add a bastion host + Lambda function + EC2 log shipping to CloudWatch. Blog post comparing AWS-native logs vs Loki.',
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
    whyFirst: 'Montreal jobs are mostly AWS + Azure. GCP is a bonus differentiator. Skip if approaching a job search — do sections 1–4 first.',
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
// BASIC WEEKS — updated, SC-900 removed, Docker done, VPC current
// Dates adjusted for real progress as of May 25
// ─────────────────────────────────────────────────────────────────────────────
export const BASIC_WEEKS = [
  {
    week: 'Wk 1–2', dates: 'Done',
    monTue: [['watch', 'Monitoring complete'], ['lab', 'Grafana + Prometheus + Loki running']],
    wed: [['blog', 'Blog post #3 published']],
    thu: [['watch', 'Docker complete']],
    deliverable: '✓ Monitoring done · Docker done · Blog posts #3 + #4 published',
  },
  {
    week: 'Wk 5', dates: 'May 25–Jun 1',
    monTue: [['watch', '263–270 VPC core: subnets, IGW, routes'], ['note', 'Skip 271 NAT Gateway in hands-on (costs $)']],
    wed: [['note', '⚽ Soccer coaching 19:00–21:00 — study before or skip']],
    thu: [['watch', '272–275 Bastion host + Terraform VPC']],
    deliverable: 'VPC + public subnet + EC2 t2.micro live in AWS + Terraform code on GitHub',
  },
  {
    week: 'Wk 6', dates: 'Jun 2–8',
    monTue: [['watch', '276–277 EC2 Logs + Lambda']],
    wed: [['note', '⚽ Soccer — check schedule for this week']],
    thu: [['blog', 'Blog post #5 — VPC on free tier']],
    deliverable: 'Blog post #5 published · VPC section 100% done',
  },
  {
    week: 'Wk 7', dates: 'Jun 9–15',
    monTue: [['watch', '361–365 GitOps intro + Terraform code']],
    wed: [['watch', 'Continue GitOps section']],
    thu: [['watch', '366–368 Staging + main workflows']],
    deliverable: 'GitHub Actions workflow running for first time',
  },
  {
    week: 'Wk 8', dates: 'Jun 16–22',
    monTue: [['watch', '369–371 EKS deploy + cleanup']],
    wed: [['lab', 'EKS pipeline live — full test']],
    thu: [['blog', 'Blog post #6 — GitOps pipeline walkthrough']],
    deliverable: 'EKS pipeline working · blog #6 published',
  },
  {
    week: 'Wk 9', dates: 'Jun 23–29',
    monTue: [['watch', '282–287 CodePipeline + Beanstalk']],
    wed: [['lab', 'CodePipeline deploy working']],
    thu: [['review', 'Portfolio review — GitHub + blog']],
    deliverable: 'Course 100% complete · portfolio ready',
  },
];

export const PRO_WEEKS = [
  {
    week: 'Done', dates: 'Complete',
    morning: [['watch', 'Monitoring + Docker complete']],
    evening: [['blog', 'Blog posts #3 + #4 published']],
    wed: [['note', 'Plan adjusted — soccer Wed evenings']],
    deliverable: '✓ Monitoring + Docker done',
  },
  {
    week: 'Wk 5', dates: 'May 25–29',
    morning: [['watch', '263–275 VPC core + Terraform (skip 271 hands-on)']],
    evening: [['deploy', 'VPC + EC2 t2.micro in AWS free tier']],
    wed: [['note', '⚽ Soccer 19:00–21:00 — use morning only']],
    deliverable: 'VPC + EC2 live + Terraform on GitHub',
  },
  {
    week: 'Wk 5–6', dates: 'May 30–Jun 5',
    morning: [['watch', '276–277 EC2 Logs + Lambda']],
    evening: [['blog', 'Draft VPC blog post']],
    wed: [['note', '⚽ Soccer — morning session only']],
    deliverable: 'Blog #5 published · VPC section done',
  },
  {
    week: 'Wk 6–7', dates: 'Jun 6–15',
    morning: [['watch', '361–371 GitOps + EKS'], ['watch', '282–287 CodePipeline']],
    evening: [['deploy', 'GitOps pipeline running on EKS'], ['blog', 'Blog posts #6 + #7']],
    wed: [['note', '⚽ Soccer — morning only on Wed']],
    deliverable: 'EKS pipeline live · course 100% · 7 blog posts',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// POST-COURSE ROADMAP — what comes after the Udemy course
// AZ-400 from MSLevelUp is Phase 3 (needs AZ-104 first)
// ─────────────────────────────────────────────────────────────────────────────
export const POST_COURSE_ROADMAP = [
  {
    phase: 'Phase 2',
    title: 'AZ-104 — Azure Administrator',
    timing: 'Start after Udemy 100% done (~Jul 2026)',
    why: 'AZ-104 is the prerequisite for AZ-400. It also makes you immediately more employable in Montreal where Azure dominates enterprise. ~40h study, exam ~$250 CAD.',
    resource: 'Microsoft Learn free path (official) + free practice tests at learn.microsoft.com',
    duration: '6–8 weeks',
    color: '#534AB7',
  },
  {
    phase: 'Phase 3',
    title: 'AZ-400 — DevOps Engineer Expert (MSLevelUp)',
    timing: 'After AZ-104 passed (~Sep 2026)',
    why: 'THIS is the MSLevelUp course you found. It maps directly to your Udemy hands-on skills. By the time you do this, GitHub Actions + Terraform + EKS will already be in your muscle memory — the cert will feel like a formality. 10h self-paced + labs.',
    resource: 'skillupwithlevelup.com — AZ-400 course (free with access code from employer or Microsoft partner)',
    duration: '3–4 weeks prep',
    color: '#BA7517',
  },
  {
    phase: 'Job Search',
    title: 'Apply in Montreal — Cloud Engineer / DevSecOps',
    timing: 'Oct–Dec 2026',
    why: 'CCNA + AZ-104 + AZ-400 + GitOps portfolio = competitive candidate in Montreal. Target $80–110K CAD.',
    resource: 'LinkedIn, Workday, direct applications to companies using Azure + AWS in Montreal',
    duration: 'Active search',
    color: '#D85A30',
  },
];
