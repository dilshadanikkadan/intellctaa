FROM  node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN ls -al

RUN npm run build

EXPOSE 3008

CMD [ "npm", "start" ]