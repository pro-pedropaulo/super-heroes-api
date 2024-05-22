FROM node:20.12.0-alpine AS base

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .

RUN npm install 

COPY . .

FROM base AS production

RUN npm run build

EXPOSE 5555

CMD [ "npm", "run", "production:start"]
