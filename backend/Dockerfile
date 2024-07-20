# Use the official Node.js image.
FROM node:20.15.1-alpine

# Set the working directory.
WORKDIR /app

# Copy package.json and package-lock.json.
COPY backend/package*.json ./

# Install dependencies.
RUN npm install

# Copy the rest of the application code.
COPY backend/ .

# Expose the port.
EXPOSE 3000

# Start the application.
CMD ["npm", "start"]
