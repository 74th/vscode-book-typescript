FROM node:13
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
RUN node_modules/.bin/tsc
RUN node_modules/.bin/webpack
ENTRYPOINT ["node", "out/src/server/main.js"]
