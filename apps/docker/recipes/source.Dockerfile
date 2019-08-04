FROM node:12

ARG INIT_SCRIPT
ARG ENTRY_PATH

VOLUME /app
VOLUME /app/node_modules

COPY $INIT_SCRIPT /init.sh
RUN chmod +x /init.sh

COPY package.json /app/package.json
COPY lerna.json /app/lerna.json

WORKDIR /app
RUN yarn install
RUN pwd
RUN ls -al 
RUN ls -al node_modules
RUN yarn bootstrap

WORKDIR /app/$ENTRY_PATH

ENTRYPOINT /init.sh