// ROUTES
module.exports = function(app) {

    // Load Controllers
   const _ctrUsers  =  new app.application.controllers.Users( app );

    // Especifica para todas as rotas 
    app.all('*', function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        next();
    });

    app.route('/v1/users')
        .get( _ctrUsers.getUsers )
        .post( _ctrUsers.createUsers );
       
    app.route('/v1/users/:id')
        .get( _ctrUsers.getUsersId )
        .patch( _ctrUsers.updateUsers )
        .put( _ctrUsers.updateUsers )
        .delete( _ctrUsers.deleteUsers );
   

} //end module.exports

