FROM node:6

RUN npm install nodemon -g

RUN mkdir src

WORKDIR /src

COPY package.json package.json

RUN npm install

COPY ./src .