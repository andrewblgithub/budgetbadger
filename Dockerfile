FROM node:latest

# Install webpack
RUN npm install webpack -g

# Reset NPM registry for quicker installation
WORKDIR /tmp
COPY package.json /tmp/
RUN npm install

#Create working directory and build bundle
COPY . /usr/src/app/
RUN cp -a /tmp/node_modules /usr/src/app/
WORKDIR /usr/src/app/
RUN webpack

ENV NODE_ENV=production

CMD ["node", "server/index.js"]

EXPOSE 3007