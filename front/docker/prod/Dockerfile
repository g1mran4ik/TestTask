FROM node:16.17.1-buster-slim as builder

RUN userdel -r node

ARG UID=1000
ARG GID=1000

RUN groupadd -g ${GID} stats && \
    useradd -l -m -u ${UID} -g ${GID} stats -s /bin/bash

RUN mkdir /home/stats/src && \
    chown ${UID}:${GID} /home/stats/src

ENV NPM_CONFIG_PREFIX=/home/stats/.npm-global
ENV PATH=$PATH:/home/stats/.npm-global/bin

USER root

WORKDIR /home/stats/src

COPY --chown=${UID}:${GID} ./src/package.json ./src/package.json

RUN cd src && npm install --quiet
COPY --chown=${UID}:${GID} . .

RUN cd src && npm run build

FROM nginx:1.17.2-alpine

RUN rm -rf /usr/share/nginx/html/*

COPY ./docker/prod/nginx/conf.d /etc/nginx/conf.d

COPY --from=builder /home/stats/src/src/build /usr/share/nginx/html

WORKDIR /etc/nginx

CMD [ "nginx", "-g", "daemon off;" ]
