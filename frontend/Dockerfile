# Stage 1 - Build React app with node container
FROM node:19 as builder

WORKDIR  /app

# copy the package.json to install dependencies
COPY package.json package-lock.json ./

# Install node dependencies
RUN npm install 

# Copy src and public assets into container
COPY public public
COPY src src

# Build the project for production
RUN npm run build

# Stage 2 setup nginx to host the React App
FROM nginx:alpine

# Upload our nginx config file to the container
COPY ./nginx.conf /etc/nginx/nginx.conf

# Copy our node build from stage1 to nginx/html director
COPY --from=builder /app/build /usr/share/nginx/html

# Start nginx.
ENTRYPOINT ["nginx", "-g", "daemon off;"]