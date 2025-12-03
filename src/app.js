const express = require('express');
const path = require('path');
const booksRouter = require('./routes/booksRouters'); //change router

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', booksRouter); //change router

module.exports = app;
