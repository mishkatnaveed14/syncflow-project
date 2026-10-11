import TiltCard from './TiltCard'

const FEATURES = [
  {
    key: 'tasks',
    kicker: 'Task management',
    title: 'Plan sprints your way',
    text: 'Boards, lists, timelines and calendars over the same data. Switch views without losing a single field.',
    bullets: ['Sprints & roadmaps', 'Dependencies & timelines', 'Workload view'],
  },
  {
    key: 'docs',
    kicker: 'Collaborative docs',
    title: 'Docs that live next to the work',
    text: 'Write specs, briefs and meeting notes, then embed live tasks and tables right inside the page.',
    bullets: ['Real-time co-editing', 'Embedded live views', 'Version history'],
  },
  {
    key: 'ai',
    kicker: 'AI Copilot',
    title: 'An assistant that knows your workspace',
    text: 'Ask questions, draft updates, triage requests and build automations in plain language.',
    bullets: ['Answers with sources', 'Automatic status updates', 'Semantic search'],
  },
  {
    key: 'db',
    kicker: 'Custom databases',
    title: 'Model anything, relate everything',
    text: 'Create your own databases with custom fields, relations, rollups and formulas. No code required.',
    bullets: ['Relations & rollups', 'Formulas & validation', 'Views for every team'],
  },
]

function Visual({ type }) {
  if (type === 'tasks')
    return (
      <div className="viz viz-tasks">
        {[
          ['Design review', 'indigo', 72],
          ['API contract', 'emerald', 48],
          ['Pricing page', 'amber', 90],
          ['QA sweep', 'rose', 24],
        ].map(([n, c, w]) => (
          <div className="gantt-row" key={n}>
            <span>{n}</span>
            <div className="gantt-track"><i className={`g-${c}`} style={{ width: `${w}%` }} /></div>
          </div>
        ))}
      </div>
    )
  if (type === 'docs')
    return (
      <div className="viz viz-docs">
        <div className="doc-title" />
        <div className="doc-line w90" />
        <div className="doc-line w75" />
        <div className="doc-embed"><b>✓</b> Embedded task · Launch checklist <em>In progress</em></div>
        <div className="doc-line w60" />
        <span className="cursor cursor-a">Maya</span>
        <span className="cursor cursor-b">Raj</span>
      </div>
    )
  if (type === 'ai')
    return (
      <div className="viz viz-ai">
        <div className="msg msg-user">Summarise this week's blockers</div>
        <div className="msg msg-ai">
          <b>✦</b> 3 blockers found. Two are waiting on billing. I've drafted an update for the team.
        </div>
        <div className="chips"><span>Send update</span><span>Create tasks</span></div>
      </div>
    )
  return (
    <div className="viz viz-db">
      <div className="db-row db-head"><span>Customer</span><span>Plan</span><span>Health</span></div>
      {[
        ['Helio', 'Pro', 'good'],
        ['Quanta', 'Enterprise', 'good'],
        ['Fathom', 'Pro', 'risk'],
      ].map(([a, b, c]) => (
        <div className="db-row" key={a}>
          <span>{a}</span>
          <span><u>{b}</u></span>
          <span><i className={`dot dot-${c}`} />{c === 'good' ? 'Healthy' : 'At risk'}</span>
        </div>
      ))}
    </div>
  )
}

export default function Features() {
  return (
    <section className="section" id="product" data-depth-section>
      <div className="container section-inner">
        <div className="section-head" data-reveal>
          <span className="eyebrow">The platform</span>
          <h2 className="title">
            Everything your team needs, <span className="grad">wired together</span>
          </h2>
          <p className="sub">
            Four building blocks that share one data layer, so a task, a doc, a database row and an AI answer are always
            talking about the same thing.
          </p>
        </div>

        <div className="feature-grid" data-stagger>
          {FEATURES.map((f) => (
            <TiltCard className="feature glass" key={f.key} max={7}>
              <div className="tz">
                <span className="kicker">{f.kicker}</span>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </div>
              <div className="tz-lg"><Visual type={f.key} /></div>
              <ul className="tz">
                {f.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </TiltCard>
          ))}
        </div>

        <div className="chip-row" data-stagger>
          {['Automations', 'Whiteboards', 'Forms', 'Integrations', 'Roles & permissions', 'Public API', 'Templates'].map((c) => (
            <span key={c} className="chip">{c}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
