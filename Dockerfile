FROM node:13

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run start

EXPOSE 10000

CMD [ "npm", "start" ]