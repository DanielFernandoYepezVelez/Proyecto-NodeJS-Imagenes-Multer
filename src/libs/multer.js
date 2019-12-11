const express = require('express');
const multer = require('multer');
const uuid = require('uuid/v4'); //v4 me genera un id Aleatorio, para el nombre de la imagenes(OriginalName).
const path = require('path');
const app = express();

/* Asignar el nombre ORIGINAL a la imagenes que suba */
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/uploads/'),
    filename: (req, file, cb) => {
        cb(null, uuid() + path.extname(file.originalname).toLowerCase()) //Generame un id aleatorio y concatenalo con la extension de su nombre original
    }
});

//middleware(Antes de que la imagen llegue a la ruta, debo procesar dicha imagen)
app.use(multer({
    storage,
    dest: path.join(__dirname, '../public/uploads/'),
    limits: { fileSize: 1000000 }, //El numero de bits permitidos para subir una imagen
    fileFilter: (req, file, cb) => { //Aqui estoy validando que tipo de imagenes esta mandando el usuario
        const fileTypes = /jpeg|jpg|png|gif/; //Aqui estoy aplicando una expresión regular
        const mimetype = fileTypes.test(file.mimetype); //Aqui estoy comprobando que la extension del archivo original coincida con los tipos de extensiones que estoy permitiendo subir al sistema
        const extname = fileTypes.test(path.extname(file.originalname)); //Gracias a path yo voy a obtener solo la extension del nombre original de la imagen que llegue al sistema

        if (mimetype && extname) {
            return cb(null, true); //Solo voy a enviarte un true para que continues subiendo la imagen
        }
        cb("Error: El archivo debe ser una imagen Valida");
    }
}).single('image')); //nombre del input del HTML(image)

module.exports = app;