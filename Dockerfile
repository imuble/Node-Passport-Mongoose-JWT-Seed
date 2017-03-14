FROM node:7.4-alpine

WORKDIR /home/app/current/

ENV KEY_NAME cert
ENV COMMON_NAME localhost
ENV CERT_DIR /certs

RUN apk --update add openssl
RUN echo "Making key at ${WORK_DIR}${KEY_NAME}.key"
RUN mkdir /certs
RUN /usr/bin/openssl genrsa -out ${CERT_DIR}${KEY_NAME}.key 1024 \
    && /usr/bin/openssl req  -new -newkey rsa:4096 -days 365 \
      -nodes -subj "/C=/ST=/L=/O=/CN=${COMMON_NAME}" \
      -keyout ${CERT_DIR}${KEY_NAME}.key -out ${CERT_DIR}${KEY_NAME}.csr \
    && /usr/bin/openssl x509 -req -days 365 -in ${CERT_DIR}${KEY_NAME}.csr \
      -signkey ${CERT_DIR}${KEY_NAME}.key -out ${CERT_DIR}${KEY_NAME}.crt


COPY . .
RUN npm install
CMD npm start
