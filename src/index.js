const express = require('express');
const path = require('path');
// const ejs = require('ejs'); Express Ya sabe que estamos utilizando este motor de plantillas

/* Initializations */
const app = express();

/* Settings */
app.set('port', 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middleware(Antes de que la imagen llegue a la ruta, debo procesar dicha imagen)
const multerMiddleware = require('./libs/multer');

/* Routes */
app.use(multerMiddleware, require('./routes/index'));

/* Static Files */
/* Aqui estoy accediendo a mis imagenes desde el navegador,
por que defini la carpeta public como publica y tengo acceso a todo lo
que existe en ella. */
app.use(express.static(path.join(__dirname, './public/')));

/* Listening The Server */
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});