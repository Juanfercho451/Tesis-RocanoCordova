const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');

/**
 * Instanciamos las rutas
 */
const users = require('./routes/usersRoutes');

const port = process.env.PORT || 3000;
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}
)); 
app.use(cors());
app.disable('x-powered-by');

app.set('port', port);
//llamando a las rutas
users(app);

server.listen(3000, '192.168.1.11' || 'localhost', function () {
    console.log('Aplicacion de Node JS  ' + process.pid + '  Iniciada....')
});

//configuracion para el manejo de errores
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send(err.stack);
});
//exportamos un objeto para utilizar las variables en otros archivos
module.exports = {
    app : app,
    server : server
}