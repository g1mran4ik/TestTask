FROM python:3.10.6-slim-bullseye

ARG UID=1000
ARG GID=1000

RUN groupadd -g ${GID} stats && \
    useradd -l -m -u ${UID} -g ${GID} stats -s /bin/bash

RUN mkdir /home/stats/.vscode-server && \
    chown ${UID}:${GID} /home/stats/.vscode-server
RUN mkdir /home/stats/src && \
    chown ${UID}:${GID} /home/stats/src

WORKDIR /home/stats/src

COPY ./docker/prod/pip.txt .
RUN pip install -r pip.txt

COPY --chown=${UID}:${GID} ./src .

CMD [ "/bin/bash", "./startserver.sh" ]