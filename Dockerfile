FROM node:16.13-alpine

COPY src /opt/src
COPY public /opt/public
COPY .env /opt/.env
COPY package.json /opt/package.json

WORKDIR /opt
RUN ["npm","install"]
RUN ["npm","run","build"]
COPY entrypoint.sh /opt/entrypoint.sh
RUN chmod +x /opt/entrypoint.sh
EXPOSE 3000
ENTRYPOINT [ "/opt/entrypoint.sh" ]
#ENTRYPOINT [ "sleep","infinity" ]