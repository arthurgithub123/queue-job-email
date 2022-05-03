FROM node

WORKDIR /usr/app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 33221

CMD ["npm", "run", "start"]
