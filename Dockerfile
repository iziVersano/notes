# Dockerfile

# Stage 1: Build the React Application
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files and environment variables
COPY package.json yarn.lock ./
COPY .env.production ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the application
RUN yarn build --mode production

# Stage 2: Serve with Nginx
FROM nginx:stable-alpine

# Remove default Nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom Nginx configuration
COPY docker/nginx.conf /etc/nginx/nginx.conf

# Copy build output from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
