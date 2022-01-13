# pull official base image
FROM node:14-alpine as build

# set working directory
WORKDIR /app

# install and copy some app dependencies
COPY package.json /app

# install app dependencies
RUN npm install

# copy other app files 
COPY . .

# start the server
CMD ["npm", "start"]
