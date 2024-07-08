# Dockerfile for React Frontend

# Use the official Node.js image as a base
FROM node:18

# Set the working directory
WORKDIR /sample-app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN yarn build

# Install a simple web server to serve static files
RUN yarn global add serve

# Expose the port the app will run on
EXPOSE 3000

# Serve the build directory
CMD ["serve", "-s", "build"]
