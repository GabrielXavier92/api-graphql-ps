FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

RUN apt-get update

RUN npm install

COPY . .

EXPOSE 4000

CMD [ "npm", "start" ]