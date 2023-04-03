FROM node:latest
RUN mkdir /unirecs
WORKDIR /unirecs

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]