#!/bin/sh

    echo "Empieza el deploy"

    cd /var/www/html/Horarify/

    git pull origin main

    npm run build

    php artisan optimize:clear

    sudo service php8.3-fpm reload

    echo "Deploy terminado"
