const mysql = require('mysql');

module.exports = function() {
    //console.log('Carregou o módulo database');
    return handleDisconnect;
}


var db_config = {
    host     : '127.0.0.1',
    user     : 'root',
    password : '102040',
    port     : '3306',
    database : 'api_nodejs'
};

var connection;

function handleDisconnect() {
    connection = mysql.createConnection(db_config);           
                                                              
    connection.connect(function(err, req, res, next) {        
        if(err) {                                             
            console.log('error when connecting to db:', err);   
            next();
        }    
        console.log('Conectado com Banco de Dados');

    });                                                      
                                                              
    return connection;
}


 




