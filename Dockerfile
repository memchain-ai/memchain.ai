# Stage 1: Build the Jekyll site
FROM ruby:3.2 AS builder

# Install dependencies
RUN apt-get update && apt-get install -y build-essential nodejs

# Set working directory
WORKDIR /app

# Install bundler
RUN gem install bundler

# Copy Gemfile and install gems
COPY Gemfile Gemfile.lock ./
RUN bundle install

# Copy the rest of the Jekyll site
COPY . .

# Build the site
RUN bundle exec jekyll build

# Stage 2: Serve with NGINX
FROM nginx:alpine

# Copy built site from builder
COPY --from=builder /app/_site /usr/share/nginx/html

# Expose default web port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]


#
# # Build the image
#docker build -t jekyll-site .
#
# Run the container
#docker run -p 8080:80 jekyll-site
#
#