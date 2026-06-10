FROM node:24

WORKDIR /usr/local/app

RUN npm install -g pnpm

# copy dependency configuration
COPY web/client/package.json web/client/pnpm-*.yaml ./

RUN pnpm i

COPY web/client/ .

EXPOSE 4200

# add host argument to allow non-localhost connections
ENTRYPOINT ["pnpm", "start", "--host=0.0.0.0"]

