# use node.js 18 alpine image as base image
FROM node:20-alpine

# build arguments
ARG KINDE_CLIENT_ID
ARG KINDE_CLIENT_SECRET
ARG NEXT_PUBLIC_APP_URL

# environment variables
ENV KINDE_CLIENT_ID=$KINDE_CLIENT_ID \
    KINDE_CLIENT_SECRET=$KINDE_CLIENT_SECRET \
    NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL

# set working directory
WORKDIR /app

# copy package.json and package-lock.json
COPY package*.json ./

# install dependencies
RUN npm install

# copy all the application code
COPY . .

# build the application
RUN npm run build

# # use lightweight node.js 18 alpine image as base image
# FROM node:20-alpine

# # set working directory
# WORKDIR /app

# # copy package.json and package-lock.json
# COPY --from=builder /app/build ./build

# # install only production dependencies
# COPY package*.json ./
# RUN npm install --only=production --legacy-peer-deps


# expose port 3000
EXPOSE 3000

# start the application
CMD ["npm", "run", "start"]
