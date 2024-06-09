# Use the official Node.js image.
FROM node:20

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
COPY package*.json ./

# Install dependencies.
RUN npm install --only=production

# Copy local code to the container image.
COPY . .

# Build the application (if your project requires a build step)
# RUN npm run build

# Set the environment variable to production
ENV NODE_ENV=production

# Run the web service on container startup.
CMD [ "node", "src/index.js" ]

# Document that the service listens on port 3000.
EXPOSE 3000
