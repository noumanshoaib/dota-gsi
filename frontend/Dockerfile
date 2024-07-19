# Use the official Node.js image.
FROM node:20.15.1-alpine

# Set the working directory.
WORKDIR /app

# Copy package.json and package-lock.json.
COPY frontend/package*.json ./

# Install dependencies.
RUN npm install

# Copy the rest of the application code.
COPY frontend/ .


# Build the application
RUN npm run build

# Expose the port.
EXPOSE 3001

# Start the application.
CMD ["npm", "start"]
