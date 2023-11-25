# Use an official Node.js runtime as a base image
FROM node:16

# Set the working directory inside the container
WORKDIR /src

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Specify the command to run your script
CMD ["node", "plushyGrabber.js"]