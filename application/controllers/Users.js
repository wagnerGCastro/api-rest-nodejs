const validator = require('validator');

module.exports = function() { return Users; }

var Users = /* @Class Controller*/ function() {

    // construct
    function Users(app) {
        self = this;
        self._mUsers = new app.application.models.Users(app);
    }


    /** BUSCA TODOS OS USUÁRIOS */
    Users.prototype.getUsers = function(req, res, next) {
        self._mUsers.getUsers( function( result ) {  
            res.status(200).json( result );
        });
    }


    /** BUSCA TODOS OS USUÁRIOS */
    Users.prototype.getUsersId = function(req, res, next) {
        const id = parseInt(req.params.id);

        self._mUsers.getUsersId( id, function( error, result ) {  
            if(error) { 
                res.status(505).json({"code": error.code, "message": error.sqlMessage});
                console.log(JSON.stringify({"code": error.code, "message": error.sqlMessage})); 
                next();
            } else {
                res.status(200).json(result);
            }
        });
    }


    /** CRIA NOVO USUÁRIO */
    Users.prototype.createUsers = function(req, res, next) {

        /** VALIDAÇÃO DOS CAMPOS */
        req.assert('name','Campo name é obrigatório').notEmpty();
        req.assert('name','Campo name deve conter entre 2 a 160 caracteres').len(2,160);
        req.assert('email','Campo email é obrigatório').notEmpty();
        req.assert('email', 'O email informado está inválido').isEmail();

        /** SANITIZAÇÃO DOS CAMPOS */
        req.sanitize('name').escape();
   
        /** VALIDAÇÃO DOS ERROS */
        var errors = req.validationErrors();
        if (errors) {
            console.log(errors);
            return res.status(422).json({ errors });
        } 

        /** INSERE USUÁRIO NOS BANCO DE DADOS */
        self._mUsers.createUsers( req.body, function(error, result) {  

            //console.log(req.headers['content-type']);

            switch(req.headers['content-type']) {

                case 'application/json':
                    console.log('cliente solicitou requisicão application/json');
                    if(error) { 
                        res.status(505).json({"code": error.code, "message": error.sqlMessage});
                        console.log(JSON.stringify({"code": error.code, "message": error.sqlMessage})); 
                        next();
                    } else {
                        res.status(201).json(req.body);
                    }
                    break;


                case 'multipart/form-data':
                   console.log('cliente solicitou requisicão multipart/form-data');
                   if(error) { 
                        res.status(505).json({"code": error.code, "message": error.sqlMessage});
                        console.log(JSON.stringify({"code": error.code, "message": error.sqlMessage})); 
                        next();
                    } else {
                        res.status(201).json(req.body);
                    }
                    break;


                case 'application/x-www-form-urlencoded':
                   console.log('cliente solicitou requisicão application/x-www-form-urlencoded');
                   if(error) { 
                        res.status(505).json({"code": error.code, "message": error.sqlMessage});
                        console.log(JSON.stringify({"code": error.code, "message": error.sqlMessage})); 
                        next();
                    } else {
                        res.status(201).json(req.body);
                    }
                    break;
                

                case 'application/xml':
                   console.log('cliente solicitou requisicão application/xml');
                   break;
           }
  
        });
    }


    /** ATUALIZA DADOS DO USUÁRIO */
    Users.prototype.updateUsers = function(req, res, next) {

        const id = parseInt(req.params.id);
      
        /** VALIDAÇÃO DOS CAMPOS */
        if(req.body.name || req.query.name) {
            req.assert('name','Campo name é obrigatório').notEmpty();
            req.assert('name','Campo name deve conter entre 2 a 160 caracteres').len(2,160);
            req.sanitize('name').escape();
        }
        
        if(req.body.email || req.query.name) {
            req.assert('email','Campo email é obrigatório').notEmpty();
            req.assert('email', 'O email informado está inválido').isEmail();
        }
        
        /** VALIDAÇÃO DOS ERROS */
        var errors = req.validationErrors();
        if (errors) {
            console.log(errors);
            return res.status(422).json({ errors });
        } 

        /** ATUALIZA USUÁRIO NOS BANCO DE DADOS */
        self._mUsers.updateUsers( req.body, id, function(error, result) {  

            switch(req.headers['content-type']) {

                case 'application/json':
                    if(error) { 
                        res.status(400).json({"code": error.code, "message": error.sqlMessage});
                        console.log(JSON.stringify({"code": error.code, "message": error.sqlMessage})); 
                        next();
                    } else {
                        res.status(200).json({"code": 200, "message": "Usuário foi atualizado com sucesso!"});  
                        console.log(JSON.stringify({"code": 200, "message": "Usuário foi atualizado com sucesso!"})); 
                    }
                    break;

                case 'multipart/form-data':
                   console.log('cliente solicitou requisicão multipart/form-data');
                   break;

                case 'application/xml':
                   console.log('cliente solicitou requisicão application/xml');
                   break;
           }
  
        });
    }


    /** DELETA USUÁRIO DO BANDO DE DADOS*/
    Users.prototype.deleteUsers = function(req, res, next) {
        const id = parseInt(req.params.id);

        self._mUsers.deleteUsers( id, function( error, result ) {  

            if(error) { 
                res.status(505).json({"code": error.code, "message": error.sqlMessage});
                console.log(JSON.stringify({"code": error.code, "message": error.sqlMessage})); 
                next();

            } else if( result.affectedRows == '0') {
                res.status(400).json({"code": 400, "message": "Usuário com id informado não existe ou já existiu"});

            } else {
                res.status(200).json({"code": 200, "message": "Usuário com id = `{id}` foi deletado com sucesso!"});
            }
        });
    }

    return Users;
}();


// console.log('Req Body ->', req.body );
// console.log('Req Params ->', req.params );
// console.log('Req Query ->', req.query );

//return;