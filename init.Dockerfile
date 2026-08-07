# stage1 - build react app first 
FROM node:26.7.0-alpine3.24 as build
WORKDIR /app

COPY ./react-app /app

RUN npm install
RUN npm run build

# Download and build our environment injector
FROM golang:1.26.5-alpine3.24@sha256:0178a641fbb4858c5f1b48e34bdaabe0350a330a1b1149aabd498d0699ff5fb2 as go-downloader
RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh
RUN go install github.com/KvalitetsIT/runtime-js-env@d2928aa2d03237b2f3e8d2a34e5c1487d49f98d8

# Copy the built application into Nginx for serving
FROM nginx:1.31.3-alpine3.24@sha256:4a73073bd557c65b759505da037898b61f1be6cbcc3c2c3aeac22d2a470c1752

COPY --from=build /app/build /usr/share/nginx/html

# Copy package-lock for easier CVE scanning
COPY --from=build /app/package-lock.json /opt/kvalitetsit/package-lock.json

# Copy the runtime-js-env binary
COPY --from=go-downloader /go/bin/runtime-js-env /

COPY ./react-app/nginx/nginx.conf /usr/share/nginx/nginx.conf
COPY ./react-app/nginx/mime.types /usr/share/nginx/mime.types
RUN rm /docker-entrypoint.d/10-listen-on-ipv6-by-default.sh

RUN mkdir -p /var/cache/nginx/
RUN chmod 777 /var/cache/nginx/
RUN chmod 777 /usr/share/nginx/html/

ENV TMPDIR=/usr/share/nginx/html/

USER 101

# Run our startup script
CMD echo "1" && /runtime-js-env -i usr/share/nginx/html/index.html && \
    echo "2" && chmod 777 /usr/share/nginx/html/index.html &&\
    echo "3" && cp -R /usr/share/nginx/* /temp/etc/nginx/ &&\
    echo "4" && cp -R /var/cache/nginx /temp/var/cache/ &&\
    echo "5" && cp -R /docker-entrypoint.d/* /temp/docker-entrypoint.d/
