# pull official base image
FROM node:13.12.0-alpine

# set working directory
WORKDIR /app






COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production
# add app
COPY . .
# start app
CMD ["node", "index.js"]