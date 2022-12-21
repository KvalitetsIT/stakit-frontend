#!/bin/sh

echo "${GITHUB_REPOSITORY}"
echo "${DOCKER_SERVICE}"
if [ "${GITHUB_REPOSITORY}" != "kvalitetsit/kittyact" ] && [ "${DOCKER_SERVICE}" = "kvalitetsit/kittyact" ]; then
  echo "Please run setup.sh REPOSITORY_NAME"
  exit 1
fi
