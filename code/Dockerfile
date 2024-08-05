FROM  node:alpine

RUN apk add --no-cache python3 py3-pip

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN ls -al

RUN npm run build

EXPOSE 3006

CMD [ "npm", "start" ]