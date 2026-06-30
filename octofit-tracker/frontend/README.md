# OctoFit Tracker Frontend

This React 19 + Vite presentation tier consumes the OctoFit backend API on port `8000`.

## Environment setup

Define `VITE_CODESPACE_NAME` when you want the UI to call the Codespaces-hosted backend URL.

Example `.env.local`:

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

When `VITE_CODESPACE_NAME` is set, the UI targets endpoints shaped like:

```text
https://$VITE_CODESPACE_NAME-8000.app.github.dev/api/users/
```

If `VITE_CODESPACE_NAME` is unset, the frontend safely falls back to:

```text
http://localhost:8000/api/users/
```

This avoids generating invalid URLs such as `https://undefined-8000.app.github.dev/...` during local development.

## Available views

- `/users`
- `/teams`
- `/activities`
- `/leaderboard`
- `/workouts`

The API response handling is compatible with either array payloads or object payloads that expose collections through keys such as `items`, `results`, or `data`.
