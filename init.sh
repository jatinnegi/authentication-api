touch .env

echo "DB_NAME=user_authentication
DB_USER=root
DB_PASS=password
DB_HOST=dev.sqlite
DB_DIALECT=sqlite
JWT_SECRET=df1a4c1d396d09c9613454a6e1fac6819355ae47
JWT_EXPIRATION=30m" > .env