#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "${repo_root}"

tracked_build_files="$(git ls-files -- build)"

if [ -n "${tracked_build_files}" ]; then
  echo "Built frontend artifacts must not be tracked in Git:"
  printf '%s\n' "${tracked_build_files}"
  exit 1
fi

if ! grep -Eq '^build/?$' .gitignore; then
  echo "Missing required .gitignore entry: build"
  exit 1
fi

if [ -e vercel.json ]; then
  echo "vercel.json is stale for this VPS deployment path and must stay out of the repo."
  exit 1
fi

if rg -n "workflow_dispatch:" .github/workflows/deploy-production.yml >/dev/null; then
  echo "Production deploy workflow must stay merge-driven only."
  exit 1
fi
