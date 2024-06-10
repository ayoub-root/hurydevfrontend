# Use the official Node.js image as the base image
FROM node:18-alpine3.17 AS builder

# Set the working directory
WORKDIR /app

ENV NEXT_PUBLIC_APP_NAME="HuryDev"
ENV NEXT_PUBLIC_URL="hurydev.com"
ENV NEXT_PUBLIC_ONLINE_SRV_URI="http://backend-service/api/v1"
ENV NEXT_PUBLIC_ONLINE_WS_URI="http://backend-service:8080"

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js app
RUN npm run build

# Use an official Nginx image to serve the build
FROM nginx:alpine

# Copy the built app from the previous stage
COPY --from=builder /app/.next /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Expose the port on which the app will run
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
