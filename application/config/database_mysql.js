const mysql = require('mysql');

module.exports = function() {
    //console.log('Carregou o módulo database');
    return handleDisconnect;
}


/**
 * Alterada a função de conexão devido estar desconectando: 
 * nodejs mysql Error: Connection lost The server closed the connection
 * solução: https://stackoverflow.com/questions/20210522/nodejs-mysql-error-connection-lost-the-server-closed-the-connection
 *
 */
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


 

//handleDisconnect();

/** Teste de conexão */

// handleDisconnect().connect( function(err) {
//   if(err) { 
//       return console.log(err);
//   } 
//   console.log('conectou!');
// })



