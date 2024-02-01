# pull the Node.js Docker image
FROM node:lts-alpine

# update the package index
RUN apk update && apk add --no-cache tzdata

# set timezone data
ENV TZ=Asia/Kuala_Lumpur

# create app directory
WORKDIR /usr/src/app

# bundle app source
COPY . .

# install node_modules, generate prisma client for querying, build optimized production
RUN npm install && npx prisma generate && npm run build

# app run on port 3000
EXPOSE 3000

# run the server
CMD ["npm", "start"]
