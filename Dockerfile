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

# manage dependency & build production
RUN npm run install-prod && \
    npm run build && \
    rm -rf node_modules && \
    npm run prune-prod && \
    npx prisma generate && \
    npm cache clean --force

# app run on port 3000
EXPOSE 3000

# run the server
CMD ["npm", "start"]
