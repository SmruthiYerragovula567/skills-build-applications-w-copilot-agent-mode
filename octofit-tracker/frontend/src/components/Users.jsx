import { ResourcePage } from './resourceUtils.jsx'

const usersEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/'

function Users() {
  return (
    <ResourcePage
      title="Users"
      summary="Athlete profiles, training goals, and team affiliations come from the backend users endpoint."
      endpointExample={usersEndpoint}
      resourceName="users"
      emptyMessage="No users are available yet. Seed the API or add user records to populate this view."
      renderItems={(items) => (
        <section className="resource-grid two-up">
          {items.map((user) => (
            <article className="surface-panel shadow-sm detail-card" key={user._id}>
              <div className="card-kicker-row">
                <span className="pill-tag">{user.fitnessLevel}</span>
                <span className="metric-pill">{user.weeklyTarget} sessions/week</span>
              </div>
              <h2>{user.name}</h2>
              <p className="supporting-copy">{user.email}</p>
              <p className="card-body-copy">{user.goal}</p>
              <dl className="detail-list compact-list">
                <div>
                  <dt>Team</dt>
                  <dd>{user.team?.name ?? 'Unassigned'}</dd>
                </div>
                <div>
                  <dt>City</dt>
                  <dd>{user.team?.city ?? 'N/A'}</dd>
                </div>
              </dl>
            </article>
          ))}
        </section>
      )}
    />
  )
}

export default Users