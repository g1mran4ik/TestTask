FROM node:16.17.1-buster-slim

RUN userdel -r node

ARG UID=1000
ARG GID=1000

RUN groupadd -g ${GID} stats && \
    useradd -l -m -u ${UID} -g ${GID} stats -s /bin/bash

RUN mkdir /home/stats/.vscode-server && \
    chown ${UID}:${GID} /home/stats/.vscode-server
RUN mkdir /home/stats/src && \
    chown ${UID}:${GID} /home/stats/src

ENV NPM_CONFIG_PREFIX=/home/stats/.npm-global
ENV PATH=$PATH:/home/stats/.npm-global/bin

USER root

RUN apt update && apt install git -y

WORKDIR /home/stats/src

COPY --chown=${UID}:${GID} ./src/package.json ./src/package.json

RUN cd src && npm install --quiet
COPY --chown=${UID}:${GID} . .

WORKDIR /home/stats/src/src
