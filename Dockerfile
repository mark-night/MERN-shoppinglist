# Expecting environment variable for PORT, NODE_ENV, TOKEN_KEY, TOKEN_AGE and MONGO_URI
FROM --platform=linux/amd64 node:erbium-alpine
LABEL io.meetm.app="shoppinglist" release="20210515" maintainer="Mark Ye <mark@meetm.io>"
ENV NODE_ENV=${NODE_ENV:-production}

WORKDIR /app
COPY . .
RUN npm install --production

EXPOSE 80

CMD node server.js
