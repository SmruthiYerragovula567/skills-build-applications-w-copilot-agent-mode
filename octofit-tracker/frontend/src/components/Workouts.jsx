import { ResourcePage } from './resourceUtils.jsx'

function Workouts() {
  return (
    <ResourcePage
      title="Workouts"
      summary="Suggested sessions load from the workouts endpoint, with difficulty, equipment, and coach guidance intact."
      resourceName="workouts"
      emptyMessage="No workouts are available yet. Seed the API or add workout records to populate this view."
      renderItems={(items) => (
        <section className="resource-grid two-up">
          {items.map((workout) => (
            <article className="surface-panel shadow-sm detail-card" key={workout._id}>
              <div className="card-kicker-row">
                <span className="pill-tag">{workout.focus}</span>
                <span className="metric-pill">{workout.durationMinutes} min</span>
              </div>
              <h2>{workout.title}</h2>
              <p className="supporting-copy">{workout.difficulty}</p>
              <p className="card-body-copy">{workout.coachTip}</p>
              <p className="supporting-copy">Equipment: {workout.equipment.join(', ')}</p>
            </article>
          ))}
        </section>
      )}
    />
  )
}

export default Workouts