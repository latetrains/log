FROM node:12.16.3-alpine3.11

WORKDIR /var/app

COPY . .

CMD ["npm", "start"]