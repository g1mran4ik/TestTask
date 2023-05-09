#!/bin/sh

export FRONT_MODE=prod
export API_MODE=prod

docker compose --project-name statsapp -f 'docker-compose.yaml' up -d --build