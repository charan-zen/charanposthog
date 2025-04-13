# stage 1

# use nodejs alpine image as base image
FROM node:22-alpine as build
# set the working directory to /app 
WORKDIR /app
# copy package.json and lock.json files
COPY package*.json ./
# install dependencies
RUN npm install
# copy all files to the working directory
COPY . .
# build the app
RUN npm run build
# prod stage 2
# use nginx alpine image as base image
FROM nginx:stable-alpine AS production

# copy the build files from the previous stage to the nginx html directory
COPY --from=build /app/build /usr/share/nginx/html
# Expose port 80
EXPOSE 80
# cmd -g for serve global daemon meens not run background
CMD [ "nginx", "-g", "daemon off;" ]