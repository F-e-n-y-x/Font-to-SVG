# Use Node.js LTS image
FROM node:alpine

# Set working directory
WORKDIR /app

RUN rm -rf node_modules .next package-lock.json
RUN npm cache clean --force


# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Create upload folder at build time
RUN mkdir -p /app/uploads && \
    echo "[]" > /app/uploads/fonts.json

# Expose the port
EXPOSE 3000

# Start the app
CMD ["node", "server.js"]