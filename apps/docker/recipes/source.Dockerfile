FROM node:12

ARG INIT_SCRIPT
ARG ENTRY_PATH

COPY $INIT_SCRIPT /.init.sh
RUN chmod +x /.init.sh

RUN mkdir /app
COPY package.json /app/package.json
COPY lerna.json /app/lerna.json
WORKDIR /app/$ENTRY_PATH

VOLUME /app
VOLUME /app/node_modules

RUN /.init.sh

ENTRYPOINT /.init.sh