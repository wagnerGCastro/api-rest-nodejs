'use strict'

/**  configuraçoes do servidor */
const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');    // https://devhub.io/repos/ctavan-express-validator

  
//validator.isEmail('foo@bar.com'); //=> true


/** aplicação do sistema server */
const app = express();
        
/** Seta váriaveis */
app.set('port', process.env.PORT || 3003);



/** implementação de [medular] */
//app.use(express.json());
app.use(bodyParser.json());                                // parse application/json, basically parse incoming Request Object as a JSON Object 
app.use(bodyParser.urlencoded({entended: true}));          // tratamento encoded, para recuprar post get
app.use(expressValidator());


/** autoloads */
consign()
    .include('application/config/database_mysql.js')
    .then('application/controllers')
    .then('application/models')
    .then('application/config/routes.js')
    .into(app);


// Exports app
module.exports = app;