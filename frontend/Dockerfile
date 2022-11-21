FROM node:16-alpine3.11 AS build

WORKDIR /app

ARG REACT_APP_API_URL
RUN echo "REACT_APP_API_URL=${REACT_APP_API_URL}" > .env

COPY package*.json .
RUN yarn install

COPY . .
RUN yarn run build

FROM nginx:latest

COPY --from=build /app/build /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf 

ENTRYPOINT nginx -g "daemon off;"