# Use official Node.js runtime as base image
FROM node:18-alpine

# Set working directory in container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY server/ ./server/

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["npm", "start"] 