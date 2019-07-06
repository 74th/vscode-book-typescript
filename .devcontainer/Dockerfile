FROM node:8
RUN apt-get update && apt-get install -y git procps

WORKDIR /app
COPY package*.json ./
RUN npm install
