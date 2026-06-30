import { ResourcePage } from './resourceUtils.jsx'

function Leaderboard() {
  return (
    <ResourcePage
      title="Leaderboard"
      summary="Competitive rankings and streak data come from the leaderboard endpoint and surface team progress at a glance."
      resourceName="leaderboard"
      emptyMessage="No leaderboard entries are available yet. Seed the API or add ranking records to populate this view."
      renderItems={(items) => (
        <section className="resource-grid single-column">
          {items.map((entry) => (
            <article className="surface-panel shadow-sm leaderboard-card" key={entry._id}>
              <div className="leader-rank">#{entry.rank}</div>
              <div className="leader-summary">
                <p className="eyebrow">{entry.team?.city ?? 'Team city unavailable'}</p>
                <h2>{entry.team?.name ?? 'Team unavailable'}</h2>
                <p className="card-body-copy">{entry.points} points with a {entry.streakDays}-day streak.</p>
              </div>
              <div className="stat-strip compact-strip">
                <div>
                  <span>Weekly minutes</span>
                  <strong>{entry.weeklyMinutes}</strong>
                </div>
                <div>
                  <span>Streak</span>
                  <strong>{entry.streakDays} days</strong>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}
    />
  )
}

export default Leaderboard