FROM node:12.18.2 as builder

WORKDIR /app
ADD package.json /app/package.json
RUN npm config set registry http://registry.npmjs.org
RUN npm install
ADD . /app
EXPOSE 3000
CMD ["npm", "run", "start"]