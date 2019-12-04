/**
 * Autor:    Wagner Gomes de Castro
 * Date:     2019-12-02
 * Site:     https://portfolio.wagnercastro.cf/
 */

"use strict"

// config
const app = require('./application/config/config');


app.listen(app.get('port'), function() {
     console.log("Servidor rodando na porta "+app.get('port')+" com Express");
});