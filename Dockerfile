FROM nginx
COPY build /usr/share/nginx/html/
LABEL author="cnlomou"
LABEL repository="https://github.com/Cnlomou/flapbird"