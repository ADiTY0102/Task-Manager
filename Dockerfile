FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

# create files directory inside container
RUN mkdir -p /app/files

EXPOSE 3000

CMD ["node", "index.js"]
