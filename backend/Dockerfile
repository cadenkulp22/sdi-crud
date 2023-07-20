FROM node:latest

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 3001

CMD ["sh", "-c", "npx knex migrate:latest && npm start"]