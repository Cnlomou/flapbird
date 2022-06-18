FROM nginx
COPY build/web-mobile /usr/share/nginx/html/
LABEL author="cnlomou"
LABEL repository="https://github.com/Cnlomou/flapbird"