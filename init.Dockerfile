# stage1 - build react app first 
FROM node:24.4.1-alpine3.22 as build
WORKDIR /app

COPY ./react-app /app

RUN npm install
RUN npm run build

# Download and build our environment injector
FROM golang:1.24.5-alpine3.22 as go-downloader
RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh
RUN go install github.com/KvalitetsIT/runtime-js-env@83fdece6e4a6244909157ab100b091cb611ad481 

# Copy the built application into Nginx for serving
FROM nginx:alpine3.22

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
