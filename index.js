const express = require('express');
const helmet = require('helmet');
const { DBTest } = require('./database.js');
const routes = require('./rutas/routes.js');
const app = express();
const PUERTO = process.env.PUERTO;
//Middlewares//
app.set('view engine', 'ejs');
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routes);

DBTest();

app.listen(PUERTO, () => {
    console.log('El servidor está corriendo en el puerto ' + PUERTO);
});