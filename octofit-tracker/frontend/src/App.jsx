import { NavLink, Route, Routes } from 'react-router-dom'
import logo from './assets/octofitapp-small.png'
import './App.css'

const activityHighlights = [
  'Daily workout check-ins and session history',
  'Team progress snapshots and shared goals',
  'Leaderboard momentum across weekly challenges',
]

const quickStats = [
  { label: 'Frontend', value: 'React 19 + Vite' },
  { label: 'Backend', value: 'Express + TypeScript' },
  { label: 'Database', value: 'MongoDB via Mongoose' },
]

function HomePage() {
  return (
    <div className="octofit-page">
      <section className="hero-panel shadow-lg">
        <div>
          <p className="eyebrow">Modern fitness tracking across three tiers</p>
          <h1>OctoFit Tracker</h1>
          <p className="hero-copy">
            A single place for athletes and teams to log activity, compete on
            leaderboards, and surface personalized workout suggestions.
          </p>
        </div>
        <div className="hero-mark">
          <img src={logo} alt="OctoFit Tracker logo" />
        </div>
      </section>

      <section className="stat-grid">
        {quickStats.map((stat) => (
          <article className="stat-card shadow-sm" key={stat.label}>
            <span>{stat.label}</span>
            <strong>{stat.value}</strong>
          </article>
        ))}
      </section>

      <section className="content-grid">
        <article className="feature-card shadow-sm">
          <h2>Launch scope</h2>
          <ul>
            {activityHighlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="feature-card shadow-sm accent-card">
          <h2>Service ports</h2>
          <dl>
            <div>
              <dt>Frontend</dt>
              <dd>5173</dd>
            </div>
            <div>
              <dt>Backend</dt>
              <dd>8000</dd>
            </div>
            <div>
              <dt>MongoDB</dt>
              <dd>27017</dd>
            </div>
          </dl>
        </article>
      </section>
    </div>
  )
}

function PlaceholderPage({ title, body }) {
  return (
    <section className="placeholder-card shadow-sm">
      <p className="eyebrow">Coming next</p>
      <h1>{title}</h1>
      <p className="hero-copy">{body}</p>
    </section>
  )
}

function App() {
  return (
    <div className="app-frame">
      <header className="topbar">
        <div className="brand-mark">
          <img src={logo} alt="" aria-hidden="true" />
          <div>
            <span>OctoFit</span>
            <small>Tracker</small>
          </div>
        </div>

        <nav className="nav-links" aria-label="Primary">
          <NavLink to="/">Overview</NavLink>
          <NavLink to="/leaderboard">Leaderboard</NavLink>
          <NavLink to="/workouts">Workouts</NavLink>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/leaderboard"
          element={
            <PlaceholderPage
              title="Leaderboard"
              body="Competitive team rankings and challenge summaries will plug into the backend API on port 8000."
            />
          }
        />
        <Route
          path="/workouts"
          element={
            <PlaceholderPage
              title="Workout Suggestions"
              body="Personalized recommendations will be sourced from MongoDB-backed training data in octofit_db."
            />
          }
        />
      </Routes>
    </div>
  )
}

export default App
