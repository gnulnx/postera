FROM nginx:alpine

#!/bin/sh
COPY ./nginx.conf /etc/nginx/nginx.conf


## Remove default nginx index page
# RUN rm -rf /usr/share/nginx/html/*

# Copy from the stahg 1
# COPY --from=builder /react-ui/build /usr/share/nginx/html
RUN mkdir -p /usr/share/nginx/html2
COPY ./build /usr/share/nginx/html2

# EXPOSE 3000 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]