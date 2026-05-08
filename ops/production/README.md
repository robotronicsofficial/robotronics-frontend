# Production rollout

Dokploy is the production source of truth for this app. GitHub Actions verifies the app, then calls the Dokploy API to deploy the configured production application.

## Live application

- Service: `robotronics-frontend-wuilgh`
- Public host: `robotronics.ai`
- API path: same-origin `/api`
- Router: Dokploy Traefik

## Required GitHub environment secrets

Use the `production` environment instead of repo-wide secrets.

- `DOKPLOY_URL`
- `DOKPLOY_API_KEY`
- `DOKPLOY_APPLICATION_ID`

## Deployment flow

1. Merge to `main`.
2. GitHub Actions runs hygiene, install, lint, tests, and build.
3. GitHub Actions calls `POST /api/application.deploy` on Dokploy.
4. Dokploy builds and promotes the app.

## Production checks

- open `https://robotronics.ai`
- confirm API requests hit same-origin `/api/...`, not a stale Vercel backend
- confirm `docker ps` shows `robotronics-frontend-wuilgh` healthy
- confirm `dokploy-traefik` owns ports `80` and `443`
