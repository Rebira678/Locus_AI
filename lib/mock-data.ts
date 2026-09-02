// Locus AI — realistic mock data, typed as if a real API existed.
// Fictional startup: "Meridian" — a developer-facing observability platform (~30 people).

export type SourceId =
  | 'slack'
  | 'gmail'
  | 'notion'
  | 'jira'
  | 'github'
  | 'discord'
  | 'monday'
  | 'clickup'

export type MemoryType = 'decision' | 'action' | 'blocker'
export type MemoryStatus = 'open' | 'resolved' | 'stale'
export type SourceStatus = 'connected' | 'syncing' | 'attention'

export interface Person {
  id: string
  name: string
  role: string
  initials: string
}

export interface Source {
  id: SourceId
  name: string
  short: string // monochrome lettermark
  status: SourceStatus
  lastSync: string
  itemCount: number
}

export interface Citation {
  id: string
  source: SourceId
  channel: string // e.g. #eng-infra, MER-482, "Auth RFC"
  ref: string // human ref shown in mono
  author: string
  timestamp: string
  snippet: string
  url: string // where it would link in the real tool
}

export interface MemoryItem {
  id: string
  type: MemoryType
  status: MemoryStatus
  title: string
  thread: string
  threadId: string
  source: SourceId
  ownerId: string
  timestamp: string
  citations: Citation[]
  detail: string
  conflictWith?: string
}

/* ------------------------------------------------------------------ people */

export const people: Record<string, Person> = {
  priya: { id: 'priya', name: 'Priya Nair', role: 'CTO', initials: 'PN' },
  marcus: { id: 'marcus', name: 'Marcus Feld', role: 'Staff Engineer', initials: 'MF' },
  dana: { id: 'dana', name: 'Dana Okafor', role: 'Founding Engineer', initials: 'DO' },
  sam: { id: 'sam', name: 'Sam Reyes', role: 'Head of Ops', initials: 'SR' },
  leo: { id: 'leo', name: 'Leo Tran', role: 'Backend Engineer', initials: 'LT' },
  ava: { id: 'ava', name: 'Ava Bergström', role: 'Design Lead', initials: 'AB' },
  jonah: { id: 'jonah', name: 'Jonah Kim', role: 'DevOps', initials: 'JK' },
}

export const peopleList = Object.values(people)

/* ----------------------------------------------------------------- sources */

export const sources: Source[] = [
  { id: 'slack', name: 'Slack', short: 'Sl', status: 'connected', lastSync: '2 min ago', itemCount: 3184 },
  { id: 'jira', name: 'Jira', short: 'Ji', status: 'connected', lastSync: '4 min ago', itemCount: 612 },
  { id: 'github', name: 'GitHub', short: 'Gh', status: 'connected', lastSync: '1 min ago', itemCount: 1490 },
  { id: 'notion', name: 'Notion', short: 'No', status: 'connected', lastSync: '11 min ago', itemCount: 208 },
  { id: 'gmail', name: 'Gmail', short: 'Gm', status: 'syncing', lastSync: 'syncing now', itemCount: 940 },
  { id: 'discord', name: 'Discord', short: 'Dc', status: 'connected', lastSync: '6 min ago', itemCount: 771 },
  { id: 'monday', name: 'Monday.com', short: 'Mo', status: 'attention', lastSync: 'auth expired', itemCount: 133 },
  { id: 'clickup', name: 'ClickUp', short: 'Cu', status: 'attention', lastSync: 'not connected', itemCount: 0 },
]

export const sourceById = (id: SourceId) => sources.find((s) => s.id === id)!

/* ---------------------------------------------------------------- threads */

export const threads: Record<string, string> = {
  auth: 'Auth provider selection',
  deploy: 'Deploy pipeline migration',
  pricing: 'Pricing model',
  sso: 'SSO scope for v1',
  onboarding: 'Onboarding flow',
  incident: 'Ingest latency incident',
}

/* ------------------------------------------------------------ memory items */

export const memory: MemoryItem[] = [
  // --- AUTH THREAD (contains the deliberate conflicting-decision pair) ---
  {
    id: 'm-101',
    type: 'decision',
    status: 'resolved',
    title: 'Standardize on Clerk for auth to hit the v1 deadline',
    thread: threads.auth,
    threadId: 'auth',
    source: 'slack',
    ownerId: 'priya',
    timestamp: '2026-06-18T15:12:00',
    conflictWith: 'm-104',
    detail:
      'Team leaned toward Clerk for speed — managed UI, org support out of the box. Called it for v1 to avoid building session infra ourselves.',
    citations: [
      {
        id: 'c-101a',
        source: 'slack',
        channel: '#eng-auth',
        ref: '#eng-auth',
        author: 'Priya Nair',
        timestamp: 'Jun 18, 3:12 PM',
        snippet:
          "Let's just go with Clerk for v1. We don't have time to own session infra and their org model is good enough. Revisit post-launch.",
        url: 'slack://meridian/eng-auth/p1718723520',
      },
      {
        id: 'c-101b',
        source: 'slack',
        channel: '#eng-auth',
        ref: '#eng-auth',
        author: 'Marcus Feld',
        timestamp: 'Jun 18, 3:20 PM',
        snippet: 'Works for me. I’ll spike the Clerk org + roles integration this week.',
        url: 'slack://meridian/eng-auth/p1718724000',
      },
    ],
  },
  {
    id: 'm-104',
    type: 'decision',
    status: 'resolved',
    title: 'Reverse the Clerk call — migrate to Better Auth before GA',
    thread: threads.auth,
    threadId: 'auth',
    source: 'notion',
    ownerId: 'marcus',
    timestamp: '2026-07-29T10:05:00',
    conflictWith: 'm-101',
    detail:
      'After the Clerk spike, per-seat pricing at our projected scale and limited control over the session model pushed us back to self-hosted. Better Auth on our existing Postgres won. This directly reverses the Jun 18 decision.',
    citations: [
      {
        id: 'c-104a',
        source: 'notion',
        channel: 'Auth RFC v2',
        ref: 'Auth RFC v2',
        author: 'Marcus Feld',
        timestamp: 'Jul 29, 10:05 AM',
        snippet:
          'Recommendation: move off Clerk. At 40k MAU the seat + MAU pricing is ~4x our infra cost, and we need full control of the session token for the agent API. Proposal: Better Auth on the existing Neon Postgres.',
        url: 'notion://meridian/auth-rfc-v2',
      },
      {
        id: 'c-104b',
        source: 'slack',
        channel: '#eng-auth',
        ref: '#eng-auth',
        author: 'Priya Nair',
        timestamp: 'Jul 30, 9:41 AM',
        snippet: 'Approved. This reverses my June call — I underweighted the cost curve. Better Auth it is.',
        url: 'slack://meridian/eng-auth/p1721723520',
      },
    ],
  },
  {
    id: 'm-106',
    type: 'action',
    status: 'open',
    title: 'Write the Clerk → Better Auth migration + session cutover plan',
    thread: threads.auth,
    threadId: 'auth',
    source: 'jira',
    ownerId: 'leo',
    timestamp: '2026-07-31T09:00:00',
    detail:
      'Migrate existing Clerk sessions without forcing a global logout. Dual-write sessions for two weeks, then flip the default.',
    citations: [
      {
        id: 'c-106a',
        source: 'jira',
        channel: 'MER-812',
        ref: 'MER-812',
        author: 'Leo Tran',
        timestamp: 'Jul 31',
        snippet:
          'MER-812 · Session cutover — dual-write Clerk + Better Auth sessions, backfill user rows, flip default cookie after 14d soak. Est: 5d.',
        url: 'jira://meridian/MER-812',
      },
    ],
  },
  {
    id: 'm-108',
    type: 'blocker',
    status: 'open',
    title: 'Better Auth org invites blocked on email deliverability review',
    thread: threads.auth,
    threadId: 'auth',
    source: 'slack',
    ownerId: 'jonah',
    timestamp: '2026-08-21T13:47:00',
    detail:
      'Invite emails from the new auth flow are landing in spam on Google Workspace. Blocked until we finish domain/DKIM setup.',
    citations: [
      {
        id: 'c-108a',
        source: 'slack',
        channel: '#eng-infra',
        ref: '#eng-infra',
        author: 'Jonah Kim',
        timestamp: 'Aug 21, 1:47 PM',
        snippet:
          'Blocker: org invite emails are going to spam for Workspace tenants. Need DKIM + a warmed subdomain before we can GA invites.',
        url: 'slack://meridian/eng-infra/p1724247220',
      },
    ],
  },

  // --- DEPLOY PIPELINE THREAD ---
  {
    id: 'm-201',
    type: 'decision',
    status: 'resolved',
    title: 'Move CI/CD to preview deploys per PR, drop the shared staging box',
    thread: threads.deploy,
    threadId: 'deploy',
    source: 'github',
    ownerId: 'jonah',
    timestamp: '2026-05-27T11:30:00',
    detail:
      'The single shared staging environment was a constant merge-queue bottleneck. Decision: ephemeral preview deploy per pull request, staging retired.',
    citations: [
      {
        id: 'c-201a',
        source: 'github',
        channel: 'meridian/infra#284',
        ref: 'infra#284',
        author: 'Jonah Kim',
        timestamp: 'May 27',
        snippet:
          'RFC: kill shared staging. Every PR gets an isolated preview + seeded data. Staging is where bugs go to hide anyway.',
        url: 'github://meridian/infra/pull/284',
      },
      {
        id: 'c-201b',
        source: 'slack',
        channel: '#eng-infra',
        ref: '#eng-infra',
        author: 'Dana Okafor',
        timestamp: 'May 27',
        snippet: '+1. The merge queue on staging cost us ~3 dev-days last sprint. Preview-per-PR please.',
        url: 'slack://meridian/eng-infra/p1716809400',
      },
    ],
  },
  {
    id: 'm-203',
    type: 'action',
    status: 'resolved',
    title: 'Seed preview environments with a scrubbed production snapshot',
    thread: threads.deploy,
    threadId: 'deploy',
    source: 'jira',
    ownerId: 'leo',
    timestamp: '2026-06-03T16:20:00',
    detail: 'Nightly scrubbed snapshot pushed to a template DB; each preview branches from it.',
    citations: [
      {
        id: 'c-203a',
        source: 'jira',
        channel: 'MER-640',
        ref: 'MER-640',
        author: 'Leo Tran',
        timestamp: 'Jun 3',
        snippet: 'MER-640 · Nightly PII-scrubbed snapshot → template DB for preview branching. Done, running at 02:00 UTC.',
        url: 'jira://meridian/MER-640',
      },
    ],
  },
  {
    id: 'm-205',
    type: 'blocker',
    status: 'stale',
    title: 'Preview deploys exceed the free build-minute quota on big PRs',
    thread: threads.deploy,
    threadId: 'deploy',
    source: 'discord',
    ownerId: 'jonah',
    timestamp: '2026-06-14T20:02:00',
    detail: 'Raised in the community/infra channel; superseded once we moved to the team plan. Left stale intentionally.',
    citations: [
      {
        id: 'c-205a',
        source: 'discord',
        channel: '#infra-chat',
        ref: '#infra-chat',
        author: 'Jonah Kim',
        timestamp: 'Jun 14',
        snippet: 'anyone else blowing past build minutes with per-PR previews? need to bump the plan or cache harder',
        url: 'discord://meridian/infra-chat/1112',
      },
    ],
  },

  // --- PRICING THREAD ---
  {
    id: 'm-301',
    type: 'decision',
    status: 'resolved',
    title: 'Price on ingested events (usage-based) with a $99/mo floor',
    thread: threads.pricing,
    threadId: 'pricing',
    source: 'notion',
    ownerId: 'sam',
    timestamp: '2026-07-08T09:45:00',
    detail:
      'Seat-based punished the exact power users we want. Chose usage-based on ingested events, with a floor so small teams are predictable.',
    citations: [
      {
        id: 'c-301a',
        source: 'notion',
        channel: 'Pricing v3',
        ref: 'Pricing v3',
        author: 'Sam Reyes',
        timestamp: 'Jul 8',
        snippet:
          'Decision: usage-based on ingested events. $99/mo floor includes 50M events. Seat pricing tested badly — it taxes the teams who instrument the most.',
        url: 'notion://meridian/pricing-v3',
      },
      {
        id: 'c-301b',
        source: 'gmail',
        channel: 'Board update — Q3',
        ref: 'board@meridian',
        author: 'Priya Nair',
        timestamp: 'Jul 9',
        snippet:
          'Moving to usage-based pricing (events, not seats). Aligns revenue with the value metric and removes the seat-counting friction from sales.',
        url: 'gmail://meridian/thread/pricing-board',
      },
    ],
  },
  {
    id: 'm-303',
    type: 'action',
    status: 'open',
    title: 'Model the migration path for the 14 seat-based design partners',
    thread: threads.pricing,
    threadId: 'pricing',
    source: 'monday',
    ownerId: 'sam',
    timestamp: '2026-07-15T14:10:00',
    detail: 'Grandfather design partners for 6 months, then move to usage with a credit for their current spend.',
    citations: [
      {
        id: 'c-303a',
        source: 'monday',
        channel: 'GTM · Pricing rollout',
        ref: 'GTM board',
        author: 'Sam Reyes',
        timestamp: 'Jul 15',
        snippet: 'Task: migration comms + calculator for the 14 design partners. Grandfather 6mo, then usage w/ credit.',
        url: 'monday://meridian/gtm/pricing',
      },
    ],
  },

  // --- SSO SCOPE THREAD ---
  {
    id: 'm-401',
    type: 'decision',
    status: 'resolved',
    title: 'Cut SAML SSO from v1 — ship it in v1.1',
    thread: threads.sso,
    threadId: 'sso',
    source: 'slack',
    ownerId: 'priya',
    timestamp: '2026-08-04T17:25:00',
    detail:
      'Enterprise SSO was slipping the launch date. Decision: ship v1 with Google + email auth, add SAML/SCIM in v1.1 for the two enterprise deals that actually need it.',
    citations: [
      {
        id: 'c-401a',
        source: 'slack',
        channel: '#product',
        ref: '#product',
        author: 'Priya Nair',
        timestamp: 'Aug 4, 5:25 PM',
        snippet:
          'Calling it: SAML SSO moves to v1.1. Two deals need it, neither closes before our launch date. Google + email covers v1.',
        url: 'slack://meridian/product/p1722792300',
      },
      {
        id: 'c-401b',
        source: 'jira',
        channel: 'MER-905',
        ref: 'MER-905',
        author: 'Sam Reyes',
        timestamp: 'Aug 5',
        snippet: 'MER-905 · SAML + SCIM — moved to the v1.1 milestone per Aug 4 call. Kept the enterprise flag stubbed.',
        url: 'jira://meridian/MER-905',
      },
    ],
  },
  {
    id: 'm-403',
    type: 'blocker',
    status: 'open',
    title: 'Northstar Robotics deal gated on SSO being in v1, not v1.1',
    thread: threads.sso,
    threadId: 'sso',
    source: 'gmail',
    ownerId: 'sam',
    timestamp: '2026-08-25T08:30:00',
    detail:
      'A prospect’s security review requires SAML at signature. Tension with the Aug 4 decision to defer SSO — flagged for revisit.',
    citations: [
      {
        id: 'c-403a',
        source: 'gmail',
        channel: 'Northstar — security review',
        ref: 'security@northstar',
        author: 'Northstar Robotics',
        timestamp: 'Aug 25',
        snippet:
          'Our InfoSec team cannot approve a tool without SAML SSO available at go-live. Is that on the current roadmap for launch?',
        url: 'gmail://meridian/thread/northstar-security',
      },
    ],
  },

  // --- ONBOARDING / MISC ---
  {
    id: 'm-501',
    type: 'decision',
    status: 'resolved',
    title: 'Onboarding installs one SDK snippet, not per-language agents',
    thread: threads.onboarding,
    threadId: 'onboarding',
    source: 'notion',
    ownerId: 'ava',
    timestamp: '2026-08-11T13:00:00',
    detail: 'Time-to-first-event is the activation metric. One copy-paste snippet beats a per-language install matrix.',
    citations: [
      {
        id: 'c-501a',
        source: 'notion',
        channel: 'Onboarding teardown',
        ref: 'Onboarding doc',
        author: 'Ava Bergström',
        timestamp: 'Aug 11',
        snippet:
          'Users drop off at the language picker. Decision: single snippet, auto-detect runtime server-side, defer the matrix to docs.',
        url: 'notion://meridian/onboarding-teardown',
      },
    ],
  },
  {
    id: 'm-503',
    type: 'action',
    status: 'resolved',
    title: 'Add a “paste your stack” step that pre-selects integrations',
    thread: threads.onboarding,
    threadId: 'onboarding',
    source: 'clickup',
    ownerId: 'ava',
    timestamp: '2026-08-12T10:40:00',
    detail: 'Shipped behind a flag; +18% activation in the A/B.',
    citations: [
      {
        id: 'c-503a',
        source: 'clickup',
        channel: 'Design · Onboarding',
        ref: 'CU-233',
        author: 'Ava Bergström',
        timestamp: 'Aug 12',
        snippet: 'CU-233 · “What’s your stack?” step → pre-select integrations. Shipped behind flag, +18% activation.',
        url: 'clickup://meridian/CU-233',
      },
    ],
  },
  {
    id: 'm-601',
    type: 'blocker',
    status: 'resolved',
    title: 'Ingest p99 latency spiked to 4s during the Aug 19 traffic surge',
    thread: threads.incident,
    threadId: 'incident',
    source: 'github',
    ownerId: 'dana',
    timestamp: '2026-08-19T22:14:00',
    detail: 'Root cause: unbounded batch flush under load. Fixed with a backpressure valve and a bounded queue.',
    citations: [
      {
        id: 'c-601a',
        source: 'github',
        channel: 'meridian/ingest#511',
        ref: 'ingest#511',
        author: 'Dana Okafor',
        timestamp: 'Aug 19',
        snippet: 'PR #511: add backpressure to the flush loop + bounded queue. p99 back to 120ms in the replay test.',
        url: 'github://meridian/ingest/pull/511',
      },
      {
        id: 'c-601b',
        source: 'discord',
        channel: '#incidents',
        ref: '#incidents',
        author: 'Dana Okafor',
        timestamp: 'Aug 19',
        snippet: 'ingest p99 at 4s, flush loop is unbounded under the surge. patch incoming, mitigating now.',
        url: 'discord://meridian/incidents/2201',
      },
    ],
  },
  {
    id: 'm-603',
    type: 'action',
    status: 'open',
    title: 'Write the ingest-latency postmortem and add an alert on p99 > 500ms',
    thread: threads.incident,
    threadId: 'incident',
    source: 'jira',
    ownerId: 'dana',
    timestamp: '2026-08-20T09:15:00',
    detail: 'Blameless postmortem + a SLO alert so the next surge pages us before customers notice.',
    citations: [
      {
        id: 'c-603a',
        source: 'jira',
        channel: 'MER-948',
        ref: 'MER-948',
        author: 'Dana Okafor',
        timestamp: 'Aug 20',
        snippet: 'MER-948 · Postmortem for the Aug 19 ingest incident + p99 SLO alert at 500ms. Due EOW.',
        url: 'jira://meridian/MER-948',
      },
    ],
  },
  {
    id: 'm-605',
    type: 'decision',
    status: 'stale',
    title: 'Use Kafka for the ingest buffer (superseded by the queue rewrite)',
    thread: threads.incident,
    threadId: 'incident',
    source: 'slack',
    ownerId: 'leo',
    timestamp: '2026-04-02T11:00:00',
    detail: 'Early decision to lean on Kafka; the Aug backpressure work made the simpler bounded queue sufficient. Kept as stale history.',
    citations: [
      {
        id: 'c-605a',
        source: 'slack',
        channel: '#eng-infra',
        ref: '#eng-infra',
        author: 'Leo Tran',
        timestamp: 'Apr 2',
        snippet: 'Going with Kafka for the ingest buffer for now — we’ll need the durability once volume ramps.',
        url: 'slack://meridian/eng-infra/p1712055600',
      },
    ],
  },
]

export const memoryById = (id: string) => memory.find((m) => m.id === id)

/* --------------------------------------------------------- cited answers */

export interface AnswerSegment {
  text: string
  citationId?: string
}

export interface CitedAnswer {
  id: string
  question: string
  segments: AnswerSegment[]
  citations: Citation[]
}

const cite = (id: string): Citation => {
  for (const m of memory) {
    const found = m.citations.find((c) => c.id === id)
    if (found) return found
  }
  throw new Error('missing citation ' + id)
}

export const answers: CitedAnswer[] = [
  {
    id: 'a-auth',
    question: 'Which auth provider did we decide on, and why did it change?',
    segments: [
      { text: 'On June 18 the team first standardized on ' },
      { text: 'Clerk to hit the v1 deadline', citationId: 'c-101a' },
      { text: ', but that call was reversed on July 29: an RFC showed ' },
      { text: 'per-seat + MAU pricing running ~4× our infra cost', citationId: 'c-104a' },
      { text: ' at projected scale, so Meridian moved to ' },
      { text: 'Better Auth on the existing Postgres', citationId: 'c-104b' },
      { text: '. Migration is tracked as a two-week dual-write session cutover.', citationId: 'c-106a' },
    ],
    citations: [cite('c-101a'), cite('c-104a'), cite('c-104b'), cite('c-106a')],
  },
  {
    id: 'a-pricing',
    question: 'How are we pricing, and what happens to our design partners?',
    segments: [
      { text: 'Pricing is ' },
      { text: 'usage-based on ingested events with a $99/mo floor', citationId: 'c-301a' },
      { text: ', chosen over seats because seat pricing taxed the teams instrumenting the most. Existing ' },
      { text: 'design partners are grandfathered for six months', citationId: 'c-303a' },
      { text: ', then moved to usage with a credit for their current spend.' },
    ],
    citations: [cite('c-301a'), cite('c-303a')],
  },
  {
    id: 'a-sso',
    question: 'Is SAML SSO shipping in v1?',
    segments: [
      { text: 'No — on August 4 SSO was ' },
      { text: 'cut from v1 and moved to v1.1', citationId: 'c-401a' },
      { text: ' so it would not slip the launch. That is now in tension with a ' },
      { text: 'Northstar Robotics security review requiring SAML at go-live', citationId: 'c-403a' },
      { text: ', which is flagged as an open blocker to revisit.' },
    ],
    citations: [cite('c-401a'), cite('c-403a')],
  },
]

export const answerById = (id: string) => answers.find((a) => a.id === id)!

/* ------------------------------------------------------------------ stats */

export const stats = [
  { label: 'decisions captured this month', value: '128' },
  { label: 'sources connected', value: '6' },
  { label: 'open blockers', value: '3' },
  { label: 'avg. answer time', value: '1.4s' },
]
