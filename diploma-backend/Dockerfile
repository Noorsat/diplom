FROM node:18-alpine
LABEL name="backend"
RUN apk add --no-cache git
WORKDIR /app
COPY package.json .
RUN npm install
RUN npm install ts-node
COPY . .

EXPOSE 4000
CMD npm run dev
