FROM node:carbon

WORKDIR /server

COPY package*.json ./

RUN npm install

COPY . /server


EXPOSE 3000
CMD [ "npm", "test" ]
