# Dockerfile for Node.js Backend

# Use the official Node.js image as a base
FROM node:18

# Set the working directory
WORKDIR /app

# Set environment variables
ENV NOTION_SECRET=""
ENV NOTION_DATABASE_ID=""
ENV PORT=8000


# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Expose the port your application will run on
EXPOSE $PORT

# Start the application
CMD ["yarn", "dev"]