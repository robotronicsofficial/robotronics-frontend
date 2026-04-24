# Production rollout

This repo should ship a built `build/` artifact to the VPS instead of rebuilding by hand on the box.

## Expected server layout

- `/srv/robotronics/frontend/releases/<git-sha>/build`
- `/srv/robotronics/frontend/current`

`nginx` should point `robotronics.ai` at `/srv/robotronics/frontend/current` and proxy `/api/` to `127.0.0.1:8080`.

## Required GitHub environment secrets

Use the `production` environment instead of repo-wide secrets.

- `PRODUCTION_SSH_HOST`
- `PRODUCTION_SSH_PORT`
- `PRODUCTION_SSH_USER`
- `PRODUCTION_SSH_KEY`

## One-time server cutover

1. Create `/srv/robotronics/frontend/releases`.
2. Update the nginx server block so its root is `/srv/robotronics/frontend/current`.
3. Keep production same-origin with `VITE_BACKEND_URL=/api`, or leave it unset to use the built-in `/api` default.
4. Use a frontend-only deploy user that can reload nginx without interactive sudo.

## Post-cutover checks

- `nginx -t`
- open `https://robotronics.ai`
- confirm API requests hit same-origin `/api/...`, not a stale Vercel backend
- `readlink -f /srv/robotronics/frontend/current` should point at the newest deployed release
