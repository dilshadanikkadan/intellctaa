FROM  node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN ls -al

RUN npm run build

EXPOSE 3007

CMD [ "npm", "start" ]