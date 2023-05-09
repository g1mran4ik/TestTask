#!/bin/sh

set -o errexit
set -o pipefail
set -o nounset

python manage.py migrate --noinput

python manage.py collectstatic --noinput 
uvicorn statsbackend.asgi:application --host 0.0.0.0 --port 8000