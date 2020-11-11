#### PHP + Vue example

This is a simple example of making crypto payments with Plisio.


###### Installation

+ Checkout services in docker-compose [docker-compose.yml](https://github.com/Plisio/white-label-vue/blob/master/docker-compose.yml).

+ Run to start and run your entire app.
```
docker-compose up -d
```

+ To control payments you will need to have MySQL like database.Create a database, add user and create table via [SQL](https://github.com/Plisio/white-label-vue/blob/master/init.sql):
```
docker-compose exec -T mysql mysql -u root -proot < init.sql
```

+ Install dependencies with composer
```
docker-compose exec invoice_vue sh -c 'cd /app && composer install'
```

+ [Setup your store](https://plisio.net/faq/how-to-connect-the-api) and get "Secret key".

+ Rename ```settings.example.php``` in the root of project to ```settings.php```. Put your "Secret key" and database connection settings into /settings.php
```
'secret_key' => 'Your secret key',
```
To handle invoices on your side, please do not forget to enable "White-label payment processing".

+ Now server could be accessed here: http://localhost:8000
+ Configure and build frontend part of application:
```
cd client-vue
```
* Then build application via yarn:
```
yarn install
yarn build
```
or via npm:
```
npm install
npm run build
```
For frontend development mode rename ```.env.example``` to ```.env```, set your custom environment, checkout ```DEV_INVOICE_ID``` param, then run:
```
yarn serve
```
or via npm:
```
npm run serve
```

This is simple example that should help you to create your custom solutions!

Please do not forget to validate user input and securely save data into the database.

### Related repositories:
[@plisio/vue-invoice](https://github.com/Plisio/vue-invoice)

[plisio-api-php](https://github.com/Plisio/plisio-api-php)