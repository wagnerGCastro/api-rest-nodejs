
module.exports = function() { return Users }


var Users = /* @Class Model */ function() {

    // construct
    function Users( app ) {
       this._conn = app.application.config.database_mysql();
    }

    
    /** Busca todos os usuários */
    Users.prototype.getUsers = function( callback ) {
        const sql = "SELECT * FROM users ORDER BY name DESC LIMIT 10";

        this._conn.query(sql,  function (error, results, fields){
            if(error) { return console.log(error); }
            if( Object.keys(results).length === 0 ) { console.log('Não teve resultados') }
            //console.log(results)
            callback( results );
        });
        //this._conn.end();//fecha a conexãodados
    }


    /** CRIA NOVO USUÁRIO */
    Users.prototype.createUsers = function(data, callback ) {
        const sql = "INSERT INTO users SET ?";
        
        this._conn.query(sql, data, function (error, results, fields){
            callback( error, results );
        });
        //this._conn.end();
    }


    /** ATUALIZA USUÁRIO */
    Users.prototype.updateUsers = function(data, id, callback ) {
        const sql = 'UPDATE users SET ? WHERE id=?'
     
        this._conn.query(sql, [data, id],  function (error, results, fields){
            callback( error, results );
        });
        //this._conn.end();//fecha a conexão
    }

    
    /** BUSCA USUÁRIO PELO ID */
    Users.prototype.getUsersId = function( id, callback ) {
        const sql = "SELECT * FROM users WHERE id = ?";
        
        this._conn.query(sql, id, function (error, results, fields){
            callback( error, results);
        });
        //this._conn.end();
    }


     /** DELETA USUÁRIO PELO ID */
    Users.prototype.deleteUsers = function( id, callback ) {
        const sql = "DELETE FROM users WHERE id=?";
        
        this._conn.query(sql, id, function (error, results, fields){
            callback( error, results);
        });
        //this._conn.end();
    }
    
   
    return Users;
}();


