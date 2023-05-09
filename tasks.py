from invoke import task
import os

os.environ["FRONT_MODE"]=getattr(os.environ, "FRONT_MODE", "prod")
os.environ["API_MODE"]=getattr(os.environ, "API_MODE", "prod")

@task(iterable=["d"])
def up(ctx, d):
    if "front" in d:
        os.environ["FRONT_MODE"]="dev"
    if "api" in d:
        os.environ["API_MODE"]="dev"
    ctx.run("docker compose --project-name statsapp -f 'docker-compose.yaml' up -d --build")
    ctx.run("echo -en '\033[0;31mapi: \033[0;32m'${API_MODE} '\033[0;31mfront: \033[0;32m'${FRONT_MODE}'\n'")

@task
def down(ctx):
    ctx.run("docker compose --project-name statsapp -f 'docker-compose.yaml' down")