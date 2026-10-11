import { useMemo, useState } from 'react'

// true = included, false = not included, string = limit/detail
const GROUPS = [
  {
    name: 'Workspace & limits',
    rows: [
      ['Team members', '5', 'Unlimited', 'Unlimited'],
      ['Workspaces', '1', 'Unlimited', 'Unlimited'],
      ['File storage', '1 GB', '100 GB', 'Unlimited'],
      ['Version history', '7 days', '90 days', 'Unlimited'],
      ['Free guests & observers', '3', '50', 'Unlimited'],
    ],
  },
  {
    name: 'Projects & docs',
    rows: [
      ['Boards & lists', true, true, true],
      ['Calendar & forms', true, true, true],
      ['Timeline & Gantt', false, true, true],
      ['Collaborative docs', 'Basic', 'Advanced', 'Advanced'],
      ['Whiteboards', false, true, true],
      ['Template library', '10', 'All', 'All + custom'],
    ],
  },
  {
    name: 'Databases',
    rows: [
      ['Custom databases', '3', 'Unlimited', 'Unlimited'],
      ['Custom fields', false, true, true],
      ['Relations & rollups', false, true, true],
      ['Formulas', 'Basic', true, true],
      ['Validation rules', false, false, true],
    ],
  },
  {
    name: 'AI Copilot',
    rows: [
      ['AI Copilot', false, true, true],
      ['Monthly AI credits', 'None', '500 / seat', '2,000 / seat'],
      ['Semantic search', false, true, true],
      ['Meeting & audio notes', false, '10 hrs / mo', '50 hrs / mo'],
    ],
  },
  {
    name: 'Automation & integrations',
    rows: [
      ['Workflow runs per month', '200', '5,000', 'Unlimited'],
      ['Scripted actions', false, true, true],
      ['Slack, GitHub & Zapier', '2 apps', true, true],
      ['Public API & webhooks', false, true, true],
      ['Custom integrations SDK', false, false, true],
    ],
  },
  {
    name: 'Security',
    rows: [
      ['Role-based permissions', 'Basic', 'Advanced', 'Advanced + custom'],
      ['Audit log', false, '30 days', 'Unlimited'],
      ['SAML SSO & SCIM', false, false, true],
      ['Data residency', false, false, true],
      ['Two-factor authentication', true, true, true],
    ],
  },
  {
    name: 'Support',
    rows: [
      ['Help centre & community', true, true, true],
      ['Email support', false, 'Priority', 'Priority'],
      ['Dedicated success manager', false, false, true],
      ['Uptime SLA', false, false, '99.99%'],
    ],
  },
]

function Cell({ v }) {
  if (v === true)
    return (
      <span className="yes" aria-label="Included">
        <svg viewBox="0 0 20 20"><path d="M4 10.5l4 4 8-9" /></svg>
      </span>
    )
  if (v === false) return <span className="no" aria-label="Not included">—</span>
  return <span className="val">{v}</span>
}

export default function Matrix() {
  const [closed, setClosed] = useState({})
  const [diffOnly, setDiffOnly] = useState(false)

  const groups = useMemo(
    () =>
      GROUPS.map((g) => ({
        ...g,
        rows: diffOnly ? g.rows.filter((r) => !(r[1] === r[2] && r[2] === r[3])) : g.rows,
      })).filter((g) => g.rows.length),
    [diffOnly]
  )

  const toggle = (name) => setClosed((c) => ({ ...c, [name]: !c[name] }))

  return (
    <section className="section" id="compare" data-depth-section>
      <div className="container section-inner">
        <div className="section-head" data-reveal>
          <span className="eyebrow">Compare plans</span>
          <h2 className="title">
            Every feature, <span className="grad">side by side</span>
          </h2>
          <p className="sub">Open any group to dig in, or hide the rows that are the same across plans.</p>
          <label className="switch">
            <input type="checkbox" checked={diffOnly} onChange={(e) => setDiffOnly(e.target.checked)} />
            <span className="switch-ui" />
            Show differences only
          </label>
        </div>

        <div className="matrix-card glass" data-reveal="zoom">
          <div className="matrix-scroll">
            <table className="matrix">
              <thead>
                <tr>
                  <th scope="col">Features</th>
                  <th scope="col">Free</th>
                  <th scope="col" className="col-pro">
                    Pro <em>Popular</em>
                  </th>
                  <th scope="col">Enterprise</th>
                </tr>
              </thead>
              {groups.map((g) => (
                <tbody key={g.name}>
                  <tr className="group-row">
                    <th colSpan={4} scope="colgroup">
                      <button onClick={() => toggle(g.name)} aria-expanded={!closed[g.name]}>
                        <span className={`chev ${closed[g.name] ? '' : 'open'}`}>›</span>
                        {g.name}
                        <small>{g.rows.length} features</small>
                      </button>
                    </th>
                  </tr>
                  {!closed[g.name] &&
                    g.rows.map((r) => (
                      <tr key={r[0]} className="feat-row">
                        <th scope="row">{r[0]}</th>
                        <td><Cell v={r[1]} /></td>
                        <td className="col-pro"><Cell v={r[2]} /></td>
                        <td><Cell v={r[3]} /></td>
                      </tr>
                    ))}
                </tbody>
              ))}
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
