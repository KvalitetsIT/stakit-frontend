# stage1 - build react app first 
FROM node:16.15.1-alpine3.14 as build
WORKDIR /app

COPY ./react-app/ /app
RUN npm install
RUN npm run build

# Download and build our environment injector
FROM golang:1.19.3-alpine3.16 as go-downloader
RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh
RUN go install github.com/lithictech/runtime-js-env@latest

# Copy the built application into Nginx for serving
FROM nginx:alpine3.17
COPY --from=build /app/build /usr/share/nginx/html

# Copy package-lock for easier CVE scanning
COPY --from=build /app/package-lock.json /opt/kvalitetsit/package-lock.json

# Copy the runtime-js-env binary
COPY --from=go-downloader /go/bin/runtime-js-env /

COPY ./react-app/nginx/nginx.conf /usr/share/nginx/nginx.conf
COPY ./react-app/nginx/mime.types /usr/share/nginx/mime.types

# Add our startup script
RUN echo "/runtime-js-env -i /usr/share/nginx/html/index.html && chmod 644 /usr/share/nginx/html/index.html" > /docker-entrypoint.d/docker-nginx-startup-runtime-env.sh
RUN chmod a+x /docker-entrypoint.d/docker-nginx-startup-runtime-env.sh

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
