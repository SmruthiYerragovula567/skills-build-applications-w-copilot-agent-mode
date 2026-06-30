import { NavLink, Route, Routes } from 'react-router-dom'
import logo from './assets/octofitapp-small.png'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import { getApiBaseUrl, isUsingLocalFallback } from './components/resourceUtils.jsx'
import './App.css'

const activityHighlights = [
  'Users, teams, and activities now load from the live backend API.',
  'Leaderboard and workout views stay compatible with array or paginated payloads.',
  'Codespaces host support is driven by Vite env vars with a localhost fallback.',
]

const quickStats = [
  { label: 'Frontend', value: 'React 19 + Vite' },
  { label: 'Backend', value: 'Express + TypeScript' },
  { label: 'Database', value: 'MongoDB via Mongoose' },
]

const primaryRoutes = [
  { to: '/', label: 'Overview', end: true },
  { to: '/users', label: 'Users' },
  { to: '/teams', label: 'Teams' },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
]

function HomePage() {
  const apiBaseUrl = getApiBaseUrl()
  const usingLocalFallback = isUsingLocalFallback()

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
          <div className="api-banner-list">
            <div className="callout-banner subtle-banner">
              Active API base URL: <strong>{apiBaseUrl}</strong>
            </div>
            <div className="callout-banner warning-banner">
              Define <strong>VITE_CODESPACE_NAME</strong> in <strong>.env.local</strong>
              {' '}for Codespaces previews. When it is unset, the UI safely falls back to
              {' '}<strong>http://localhost:8000</strong>.
            </div>
            {usingLocalFallback ? (
              <div className="callout-banner subtle-banner">
                Localhost mode is active to avoid generating an invalid
                {' '}<strong>https://undefined-8000.app.github.dev</strong> URL.
              </div>
            ) : null}
          </div>
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
          <h2>Host behavior</h2>
          <dl>
            <div>
              <dt>Frontend</dt>
              <dd>5173 via Vite</dd>
            </div>
            <div>
              <dt>Backend</dt>
              <dd>8000 via Express</dd>
            </div>
            <div>
              <dt>Codespaces URL</dt>
              <dd>https://$VITE_CODESPACE_NAME-8000.app.github.dev</dd>
            </div>
          </dl>
        </article>
      </section>
    </div>
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
          {primaryRoutes.map((route) => (
            <NavLink end={route.end} key={route.to} to={route.to}>
              {route.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </div>
  )
}

export default App
