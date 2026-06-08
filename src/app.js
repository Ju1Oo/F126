const express = require('express');
const path = require('path');
const session = require('express-session');

const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
secret: process.env.SESSION_SECRET || 'secret123',
resave: false,
saveUninitialized: false
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', userRoutes);

module.exports = app;
