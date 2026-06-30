import { ResourcePage } from './resourceUtils.jsx'

const activitiesEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/'

function Activities() {
  return (
    <ResourcePage
      title="Activities"
      summary="Recent training sessions stream from the activities endpoint, with populated user context from MongoDB."
      endpointExample={activitiesEndpoint}
      resourceName="activities"
      emptyMessage="No activities are available yet. Seed the API or add activity records to populate this view."
      renderItems={(items) => (
        <section className="resource-grid single-column">
          {items.map((activity) => (
            <article className="surface-panel shadow-sm timeline-card" key={activity._id}>
              <div className="card-kicker-row">
                <span className="pill-tag">{activity.type}</span>
                <span className="metric-pill">{activity.durationMinutes} min</span>
              </div>
              <h2>{activity.user?.name ?? 'Unknown athlete'}</h2>
              <p className="supporting-copy">
                {new Date(activity.completedAt).toLocaleString()} • {activity.caloriesBurned} calories
              </p>
              <p className="card-body-copy">{activity.notes}</p>
            </article>
          ))}
        </section>
      )}
    />
  )
}

export default Activities