FROM node:16-alpine3.11 AS build

COPY . .
RUN yarn install
RUN npm run build

FROM nginx:1.21.1-alpine

COPY --from=build /build /usr/share/nginx/html
COPY --from=build /nginx.sh .

RUN chmod +x ./nginx.sh

ENTRYPOINT [ "./nginx.sh" ]