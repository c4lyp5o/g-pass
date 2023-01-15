# pull the Node.js Docker image
FROM node:lts-alpine

# update the package index
RUN apk update
RUN apk add --no-cache tzdata

# set timezone data
ENV TZ=Asia/Kuala_Lumpur

# create the directory inside the container
WORKDIR /usr/src/app

# copy the package.json files from local machine to the workdir in container
COPY package*.json ./

# run npm install in our local machine
RUN npm install

# copy the generated modules and all other files to the container
COPY . .

# apply migration to database for production, must run "npx prisma migrate dev" first in local development to init the database
RUN npx prisma migrate deploy

# generate client
RUN npx prisma generate

# our app is running on port 3000 within the container, so need to expose it
EXPOSE 3000

# create optimized build for production
RUN npm run build

# the command that starts our app
CMD npm start