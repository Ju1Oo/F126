# F126

## Commands i used for this project so far (temporary section delete later)

npm install express ejs mysql

docker run --name mysql-athletics \
-e MYSQL_ROOT_PASSWORD=root \
-e MYSQL_DATABASE=notes_app \
-p 3306:3306 \
-d mysql:8.0 \
--default-authentication-plugin=mysql_native_password