const express = require('express');
const path = require('path');
const athleticsRouter = require('./routes/athleticsRouter'); 

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', athleticsRouter.getCompetitions); 

module.exports = app;
