#!/usr/bin/env bash
set -euo pipefail
# Usage: docker run --rm -v $(pwd):/workspace -w /workspace <image> [gradle args]

# If gradlew exists, use it. Otherwise try system gradle
if [ -f ./gradlew ]; then
  chmod +x ./gradlew || true
  exec "$@"
else
  exec gradle "$@"
fi
