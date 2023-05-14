cd ~/react-adv
npm run build:prod apiUrl=https://ptichkinproject.ru:8443/api

rm -rf ~/../var/www/react-adv/html
mv ~/react-adv/build ~/../var/www/react-adv/html