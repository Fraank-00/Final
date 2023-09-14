require('dotenv').config()
const express = require('express')
const {DBTest} = require('./database.js');

const Posteo = require ('./posteoModel.js')

const app = express()
const PUERTO = process.env.PUERTO
app.set('view engine','ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get('/', async function (req, res) {
    const posteos = await Posteo.findAll();
 res.render('inicio',{posteos})

})
app.get('/publicar', function (req, res) {
    res.render('publicar')
    
   })

app.post('/publicar', async (req, res) => {
    const { titulo, descripcion,fecha } = req.body;
  
    try {
      // Crea un nuevo posteo en la base de datos
      const nuevoPosteo = await Posteo.create({
        titulo: titulo,
        descripcion: descripcion,
        link: 'https://cdn-icons-png.flaticon.com/512/59/59170.png',
        fecha:fecha,
        
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
});


DBTest()


app.get('/eliminar/:id', async function (req, res) {
    const {id } = req.params
    try{
     const borrarPosteo= await Posteo.destroy({
        where: {
          id: id 
        }
      });
    
     
     if (borrarPosteo) {
    
     res.redirect('/');
     } else {
     res.send('No se borrar  el posteo');
     } 
    }catch (err) {
    console.error(err);
    res.status(500).send('Ocurrió un error al borrar el posteo: ' + err.message);
}})

app.get('/editar/:id', async function (req, res) {
    const {id } = req.params
    try{
        const post = await Posteo.findOne({ 
            where: {
            id:id
        } 
        })
        if(post){
            res.render('editar', {post})
        }else{
            res.send('No se pudo encontar el  posteo');
        }

     res.render('editar', {post})
    }catch (err) {
     console.error(err);
     res.status(500).send('Ocurrió un error al buscar el posteo: ' + err.message);

}})

app.get('/editar/:id', async function (req, res) {
    const {id } = req.params
    const { titulo, descripcion,link,fecha } = req.body;
    try{
        const postActualiazdo = await Posteo.update(
            {titulo:titulo,
            descripcion:descripcion,
            link:link,
            fecha:fecha},
            { 
            where: {
            id:id
        } 
        })
        if(postActualiazdo){
            res.redirect('/');
        }else{
            res.send('No se pudo actualizar  el  posteo');
        }

     res.render('editar', {post})
    }catch (err) {
     console.error(err);
     res.status(500).send('Ocurrió un error al actualizar el posteo: ' + err.message);

}})


app.listen(PUERTO, () =>{
    console.log('El servidor esta corriendo en el puerto '+ PUERTO)
})