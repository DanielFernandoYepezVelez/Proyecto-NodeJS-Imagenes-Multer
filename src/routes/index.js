const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.render('index');
});

/* El req.file lo tengo disponible por el middleware de multer definido en
el index, que se ejecuta antes de llegar a la ruta(IMPORTANTE) */
router.post('/upload', (req, res) => {
    console.log(req.file); //Objeto que recibe la imagen
    res.send('uploaded');
});

module.exports = router;