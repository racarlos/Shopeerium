# base image (all dockerfiles should have this)
FROM node:14.17.2

# make a dir named /app and cd to it
WORKDIR /app

### install and cache app dependencies
COPY package*.json ./

# install dependencies of the app
RUN npm install 

RUN npm install -g @angular/cli

# copy the source code to the Docker image
COPY . .

# expose the port where the app will listen to
EXPOSE 4200

# start the server
CMD ["npm", "start"]