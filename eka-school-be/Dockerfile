# Use the official Node.js image as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the entire backend project to the working directory
COPY . .

# Expose the backend port
EXPOSE 3000

# Command to run
CMD ["sh", "-c", "sleep 10 && node seed.js && npm start"]