# Lost & Found

System ogłoszeń o zagubionych i znalezionych przedmiotach wykonany w Node.js, Express, EJS oraz MySQL.

## Opis projektu

Aplikacja umożliwia:

* rejestrację użytkowników,
* logowanie i wylogowanie,
* dodawanie ogłoszeń o zagubionych i znalezionych przedmiotach,
* przeglądanie wszystkich ogłoszeń,
* filtrowanie ogłoszeń według statusu,
* wyświetlanie szczegółów ogłoszenia,
* wyświetlanie numeru telefonu właściciela ogłoszenia,
* edycję własnych ogłoszeń,
* usuwanie własnych ogłoszeń,
* zamykanie zgłoszeń po odnalezieniu przedmiotu.

## Technologie

* Node.js
* Express.js
* EJS
* MySQL 8
* Docker Compose
* express-session
* dotenv

## Struktura projektu

src/

├── controllers/

├── models/

├── routes/

├── views/

├── public/

├── data/

├── app.js

└── server.js

## Instalacja

### 1. Klonowanie projektu

git clone https://github.com/Ju1Oo/F126

cd F126

### 2. Instalacja zależności

npm install

### 3. Utworzenie pliku .env

Utwórz plik .env w katalogu głównym projektu:

DB_HOST=localhost

DB_USER=root

DB_PASSWORD=root

DB_NAME=lost_found

DB_PORT=3306

SESSION_SECRET=super_secret_key

### 4. Uruchomienie bazy danych

W katalogu projektu wykonaj:

docker compose up -d

### 5. Utworzenie tabel

Po uruchomieniu bazy połącz się z MySQL:

docker exec -it lostfound-db mysql -u root -p

Hasło:

root

Następnie wykonaj:

CREATE DATABASE IF NOT EXISTS lost_found;
USE lost_found;

CREATE TABLE users (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(100) NOT NULL UNIQUE,
phone VARCHAR(20) NOT NULL,
password_hash VARCHAR(255) NOT NULL
);

CREATE TABLE items (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(255) NOT NULL,
description TEXT NOT NULL,
location VARCHAR(255) NOT NULL,
status ENUM(
'lost',
'found',
'resolved'
) DEFAULT 'lost',
owner_id INT NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY(owner_id)
REFERENCES users(id)
ON DELETE CASCADE
);

### 6. Uruchomienie aplikacji

npm start

Aplikacja będzie dostępna pod adresem:

http://localhost:3000

## Endpointy

### Autoryzacja

GET /login

POST /login

GET /register

POST /register

GET /logout

### Ogłoszenia

GET /market

GET /item/:id

GET /item/edit/:id

POST /item/edit/:id

POST /item/delete/:id

POST /item/close/:id

### Profil użytkownika

GET /user/profile

POST /user/profile/add-item

## Konta użytkowników

Nowe konta tworzone są przez formularz rejestracji.

## Docker

Uruchomienie bazy:

docker compose up -d

Zatrzymanie:

docker compose down

Sprawdzenie działania:

docker ps

## Autor

Julian Widłak

## Licencja

MIT
