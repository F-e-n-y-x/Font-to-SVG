# Use Node.js LTS image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy app source
COPY . .

# Create upload folder at build time
RUN mkdir -p /app/uploads && \
    echo "[]" > /app/uploads/fonts.json

# Expose the port
EXPOSE 3000

# Start the app
CMD ["node", "server.js"]