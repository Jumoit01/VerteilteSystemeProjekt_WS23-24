# Use an official Node.js runtime as a parent image
FROM node:14 as build

# Set the working directory for the client
WORKDIR /usr/src/app/client

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install client dependencies
RUN npm install

# Copy the client code
COPY . .

# Build the React app
RUN npm run build

# Use a lightweight Nginx image to serve the static files
FROM nginx:alpine

# Copy the built static files from the previous stage
COPY --from=build /usr/src/app/client/build /usr/share/nginx/html

# Expose port 80 for the Nginx server
EXPOSE 82

# The default command is to start Nginx
CMD ["nginx", "-g", "daemon off;"]
