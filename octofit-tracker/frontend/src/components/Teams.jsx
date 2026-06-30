import { ResourcePage } from './resourceUtils.jsx'

const teamsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/'

function Teams() {
  return (
    <ResourcePage
      title="Teams"
      summary="Squads are ranked here by momentum, points, and local identity from the teams API."
      endpointExample={teamsEndpoint}
      resourceName="teams"
      emptyMessage="No teams are available yet. Seed the API or add team records to populate this view."
      renderItems={(items) => (
        <section className="resource-grid three-up">
          {items.map((team) => (
            <article className="surface-panel shadow-sm detail-card" key={team._id}>
              <div className="card-kicker-row">
                <span className="pill-tag">{team.city}</span>
                <span className="metric-pill">{team.memberCount} members</span>
              </div>
              <h2>{team.name}</h2>
              <p className="card-body-copy">{team.motto}</p>
              <div className="stat-strip">
                <div>
                  <span>Points</span>
                  <strong>{team.points}</strong>
                </div>
                <div>
                  <span>Roster</span>
                  <strong>{team.memberCount}</strong>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}
    />
  )
}

export default Teams