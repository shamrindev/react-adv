cd ~/react-adv
npm run build:prod

rm -rf ~/../var/www/react-adv/html
mv ~/react-adv/build ~/../var/www/react-adv/html