FROM node:16-alpine3.11 AS build

COPY . .

RUN --mount=type=cache,target=/root/.yarn YARN_CACHE_FOLDER=/root/.yarn yarn --frozen-lockfile

RUN yarn install
RUN yarn run build

FROM nginx:latest

COPY --from=build /build /usr/share/nginx/html

ENTRYPOINT nginx -g "daemon off;"