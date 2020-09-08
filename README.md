#### PHP example

This is a simple example of making crypto payments with Plisio.


###### Installation

+ Install dependencies with composer
```
composer install
```

To control payments you will need to have MySQL like database.

+ Checkout services in docker-compose [docker-compose.yml](https://github.com/Plisio/white-label-vue/blob/master/docker-compose.yml).

+ Run ```docker-compose up``` to start and run your entire app.

+ Create a database, add user and create table via [SQL](https://github.com/Plisio/white-label-vue/blob/master/init.sql):
```
docker-compose exec -T mysql mysql -u root -proot < init.sql
```

+ [Setup your store](https://plisio.net/faq/how-to-connect-the-api) and get "Secret key". 

To handle invoices on your side, please do not forget to enable "White-label payment processing".

+ Put your "Secret key" and database connection settings into /settings.php 
```
'secret_key' => 'Your secret key',
```

+ Start the server that will be accessible here: http://localhost:3000
```
php -S localhost:3000
```
+ Configure and build frontend part of application:
```
cd client-vue
```
* Checkout .env to set your environment.
* Then build application via yarn or npm.
```
yarn install
yarn build
```

This is simple example that should help you to create your custom solutions! 

Please do not forget to validate user input and securely save data into the database.
