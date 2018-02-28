FROM node:latest

# Reset NPM registry for quicker installation
WORKDIR /tmp
COPY package.json /tmp/
RUN npm install

#Create working directory and build bundle
COPY . services/budget-worker/usr/src/app/
RUN cp -a /tmp/node_modules services/budget-worker/usr/src/app/
WORKDIR services/budget-worker/usr/src/app/

ENV NODE_ENV=production

CMD ["node", "index.js"]

EXPOSE 7080
