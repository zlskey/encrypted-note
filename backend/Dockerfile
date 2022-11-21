FROM node:16-alpine3.11 AS build

WORKDIR /app

COPY package*.json .

RUN npm install

RUN npm install typescript -g
RUN npm install cross-env -g

COPY . .

RUN npm run build

FROM node:16-alpine3.11 

WORKDIR /app

COPY --from=build /app/package*.json .

RUN npm install --production
RUN npm install cross-env -g

COPY --from=build /app/dist ./src

CMD ["npm", "start"]