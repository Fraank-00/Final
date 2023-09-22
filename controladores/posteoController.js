const Posteo = require('../posteoModel');

// Controlador para obtener todos los posteos
exports.getPosteos = async (req, res) => {
    try {
        const posteos = await Posteo.findAll();
        res.render('inicio', { posteos });
    } catch (err) {
        console.error(err);
        res.status(500).send('Ocurrió un error al obtener los posteos: ' + err.message);
    }
};

 //Controlador para renderizar la página de publicación
exports.renderPublicar = (req, res) => {
 res.render('publicar');
};

// Controlador para crear un nuevo posteo
exports.crearPosteo = async (req, res) => {
    const { titulo, descripcion, fecha } = req.body;
    
    try {
        
         const nuevoPosteo = await Posteo.create({
            titulo: titulo,
            descripcion: descripcion,
            link: 'https://w7.pngwing.com/pngs/527/663/png-transparent-logo-person-user-person-icon-rectangle-photography-computer-wallpaper-thumbnail.png',
            fecha: fecha,
        });

        if (nuevoPosteo) {
            res.redirect('/');
        } else {
            res.send('No se agregó el posteo');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Ocurrió un error al crear el posteo: ' + err.message);
    }
};

// Controlador para eliminar un posteo
exports.eliminarPosteo = async (req, res) => {
    const { id } = req.params;
    try {
        const borrarPosteo = await Posteo.destroy({
            where: {
                id: id,
            },
        });

        if (borrarPosteo) {
            res.redirect('/');
        } else {
            res.send('No se borró el posteo');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Ocurrió un error al borrar el posteo: ' + err.message);
    }
};

// Controlador para renderizar la página de edición
exports.renderEditar = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Posteo.findOne({
            where: {
                id: id,
            },
        });
        if (post) {
            res.render('editar', { post });
        } else {
            res.send('No se pudo encontrar el posteo');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Ocurrió un error al buscar el posteo: ' + err.message);
    }
};

// Controlador para editar un posteo
exports.actualizarPosteo = async (req, res) => {
    const { id } = req.params;
    const { titulo, descripcion, fecha } = req.body;
    try {
       
        const postActualizado = await Posteo.update(
            {
                titulo: titulo,
                descripcion: descripcion,
                fecha: fecha,
            },
            {
                where: {
                    id: id,
                },
            }
        );
     
        if (postActualizado) {
            res.redirect('/');
        } else {
            res.send('No se pudo actualizar el posteo');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Ocurrió un error al actualizar el posteo: ' + err.message);
    }
};