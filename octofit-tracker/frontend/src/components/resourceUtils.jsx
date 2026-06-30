import { useEffect, useState } from 'react'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim() ?? ''

export function getApiBaseUrl() {
  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api`
    : 'http://localhost:8000/api'
}

export function buildApiUrl(resourceName) {
  return `${getApiBaseUrl()}/${resourceName}/`
}

export function isUsingLocalFallback() {
  return codespaceName.length === 0
}

function normalizeCollectionPayload(payload) {
  if (Array.isArray(payload)) {
    return {
      items: payload,
      total: payload.length,
      meta: null,
    }
  }

  if (payload && typeof payload === 'object') {
    const collection = [payload.items, payload.results, payload.data].find(
      Array.isArray,
    )

    if (collection) {
      return {
        items: collection,
        total:
          payload.count ??
          payload.total ??
          payload.totalCount ??
          payload.pagination?.total ??
          collection.length,
        meta: payload.pagination ?? payload.pageInfo ?? null,
      }
    }
  }

  return {
    items: [],
    total: 0,
    meta: null,
  }
}

export function useApiCollection(resourceName) {
  const [state, setState] = useState({
    items: [],
    total: 0,
    meta: null,
    loading: true,
    error: '',
  })

  useEffect(() => {
    const controller = new AbortController()

    async function loadCollection() {
      setState((currentState) => ({
        ...currentState,
        loading: true,
        error: '',
      }))

      try {
        const response = await fetch(buildApiUrl(resourceName), {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload = await response.json()
        const normalized = normalizeCollectionPayload(payload)

        setState({
          ...normalized,
          loading: false,
          error: '',
        })
      } catch (error) {
        if (controller.signal.aborted) {
          return
        }

        setState({
          items: [],
          total: 0,
          meta: null,
          loading: false,
          error:
            error instanceof Error
              ? error.message
              : 'Unable to load API resource.',
        })
      }
    }

    void loadCollection()

    return () => {
      controller.abort()
    }
  }, [resourceName])

  return {
    ...state,
    endpoint: buildApiUrl(resourceName),
    usingLocalFallback: isUsingLocalFallback(),
  }
}

export function ResourcePage({
  title,
  summary,
  resourceName,
  emptyMessage,
  renderItems,
}) {
  const { endpoint, error, items, loading, meta, total, usingLocalFallback } =
    useApiCollection(resourceName)

  return (
    <section className="resource-page">
      <header className="resource-header surface-panel shadow-sm">
        <div>
          <p className="eyebrow">Live API resource</p>
          <h1>{title}</h1>
          <p className="hero-copy">{summary}</p>
        </div>

        <div className="resource-meta-grid">
          <div className="resource-meta-card">
            <span>Endpoint</span>
            <strong>{endpoint}</strong>
          </div>
          <div className="resource-meta-card">
            <span>Records</span>
            <strong>{total}</strong>
          </div>
          <div className="resource-meta-card">
            <span>Host mode</span>
            <strong>
              {usingLocalFallback ? 'Localhost fallback' : 'Codespaces URL'}
            </strong>
          </div>
        </div>

        {usingLocalFallback ? (
          <div className="callout-banner warning-banner">
            <strong>VITE_CODESPACE_NAME is unset.</strong> The UI safely falls
            back to `http://localhost:8000` instead of building an invalid
            `https://undefined-8000...` URL.
          </div>
        ) : null}

        {meta ? (
          <div className="callout-banner subtle-banner">
            Paginated response metadata detected and preserved for this view.
          </div>
        ) : null}
      </header>

      {loading ? (
        <section className="surface-panel shadow-sm state-panel">
          <p className="eyebrow">Loading</p>
          <h2>Fetching {title.toLowerCase()}</h2>
          <p className="hero-copy">The presentation tier is waiting on the API response.</p>
        </section>
      ) : null}

      {error ? (
        <section className="surface-panel shadow-sm state-panel error-panel">
          <p className="eyebrow">Request failed</p>
          <h2>Could not load {title.toLowerCase()}</h2>
          <p className="hero-copy">{error}</p>
        </section>
      ) : null}

      {!loading && !error && items.length === 0 ? (
        <section className="surface-panel shadow-sm state-panel">
          <p className="eyebrow">No records</p>
          <h2>{title}</h2>
          <p className="hero-copy">{emptyMessage}</p>
        </section>
      ) : null}

      {!loading && !error && items.length > 0 ? renderItems(items) : null}
    </section>
  )
}