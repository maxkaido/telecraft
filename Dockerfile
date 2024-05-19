# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the Docker container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application's dependencies inside the Docker container
RUN npm install

# Copy the rest of the application's code to the working directory
COPY . .

# Expose port 3000 to the outside world
EXPOSE 3000

# Run the application when the Docker container starts
CMD [ "node", "src/main.js" ]