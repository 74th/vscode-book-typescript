FROM node:8 AS middle
WORKDIR /app
COPY package*.json ./
RUN npm install

FROM middle AS dev
RUN apt-get update && apt-get install -y git procps

FROM middle
RUN node_modules/.bin/tsc
ENTRYPOINT ["node", "out/src/server/main.js"]
