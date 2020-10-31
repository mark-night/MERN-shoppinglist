# Expecting environment variable for TOKEN_KEY, TOKEN_AGE and MONGO_URI
# Set BACKEND_BASEURL to the frontend serving path
FROM node:erbium-alpine
ENV NODE_ENV=production

WORKDIR /code
COPY package*.json ./
RUN npm install --production
COPY . .

EXPOSE 80

CMD [ "node", "server.js" ]