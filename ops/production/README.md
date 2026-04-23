# Production rollout

This repo should ship a built `build/` artifact to the VPS instead of rebuilding by hand on the box.

## Expected server layout

- `/srv/robotronics/frontend/releases/<git-sha>/build`
- `/srv/robotronics/frontend/current`

`nginx` should point `robotronics.ai` at `/srv/robotronics/frontend/current` and continue proxying the backend routes to `127.0.0.1:8080`.

## Required GitHub secrets

- `PRODUCTION_SSH_HOST`
- `PRODUCTION_SSH_PORT`
- `PRODUCTION_SSH_USER`
- `PRODUCTION_SSH_KEY`

## One-time server cutover

1. Create `/srv/robotronics/frontend/releases`.
2. Update the nginx server block so its root is `/srv/robotronics/frontend/current`.
3. Keep production same-origin by leaving `VITE_BACKEND_URL` empty in `.env.production`.
4. Let the deploy user reload nginx without interactive sudo.

## Post-cutover checks

- `nginx -t`
- open `https://robotronics.ai`
- confirm API requests stay on the same origin rather than going to a stale Vercel backend
