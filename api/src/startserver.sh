#!/bin/sh

export DJANGO_SUPERUSER_USERNAME=admin
export DJANGO_SUPERUSER_EMAIL=admin@admin.admin
export DJANGO_SUPERUSER_PASSWORD=admin

set -o errexit
set -o pipefail
set -o nounset

python manage.py migrate --noinput

python manage.py collectstatic --noinput 
# python manage.py createsuperuser --noinput
uvicorn statsbackend.asgi:application --host 0.0.0.0 --port 8000