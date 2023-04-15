FROM node:18.15.0
RUN mkdir /unirecs
WORKDIR /unirecs

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]