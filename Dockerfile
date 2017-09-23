FROM node:6-alpine

RUN mkdir -p /app
WORKDIR /app
ADD app /app/

RUN npm install
RUN mv node_modules /
