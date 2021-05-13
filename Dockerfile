FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i -g nodemon

RUN npm install

COPY . .

EXPOSE 10000

CMD [ "npm", "start" ]