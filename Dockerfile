# Use Node.js base image
FROM node:18

# Create app directory
WORKDIR /app

# Copy package files and install deps
COPY package*.json ./
RUN npm install

# Copy rest of the app
COPY . .

# Default to port 3001
EXPOSE 3001

# Run the server
CMD ["npm", "start"]
