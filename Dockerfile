FROM node:12.18.3

RUN apt update
RUN apt install -y nginx

RUN mkdir -p /var/www/pw.arron.id/
RUN mkdir -p /etc/nginx/sites-enabled/
RUN mkdir -p /etc/nginx/sites-available/

COPY ./pw.arron.id/package.json /var/www/pw.arron.id

WORKDIR /var/www/pw.arron.id/

RUN npm install

COPY ./pw.arron.id /var/www/pw.arron.id

RUN yarn build

COPY ./nginx.conf /etc/nginx/
COPY ./pw_arron_id.conf /etc/nginx/sites-available

RUN ln -s /etc/nginx/sites-available/pw_arron_id.conf /etc/nginx/sites-enabled/pw_arron_id.conf



EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
