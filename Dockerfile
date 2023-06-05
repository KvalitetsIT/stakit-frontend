# stage1 - build react app first 
FROM node:16.15.1-alpine3.14 as build
WORKDIR /app

COPY ./react-app /app

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
 
# Copy the runtime-js-env binary
COPY --from=go-downloader /go/bin/runtime-js-env /

COPY ./react-app/nginx/nginx.conf /usr/share/nginx/nginx.conf
COPY ./react-app/nginx/mime.types /usr/share/nginx/mime.types
RUN rm /docker-entrypoint.d/10-listen-on-ipv6-by-default.sh

RUN mkdir -p /var/cache/nginx/
RUN chmod 777 /var/cache/nginx/

# Run our startup script
CMD /runtime-js-env -i usr/share/nginx/html/index.html && \
    chmod 777 /usr/share/nginx/html/index.html &&\
    cp -R /usr/share/nginx/* /temp/etc/nginx/ &&\
    cp -R -p /var/cache/nginx /temp/var/cache/ &&\
    cp -R /docker-entrypoint.d/* /temp/docker-entrypoint.d/
