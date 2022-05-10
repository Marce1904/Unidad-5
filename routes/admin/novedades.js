var express = require ('express');
const {render} = require('../../app');
const req = require('express/lib/request');
const res = require('express/lib/response');
const async = require('hbs/lib/async');
var router = express.Router();
var novedadesModel = require('../../models/novedadesModel');


// GET HOME PAGE

router.get('/', async function (req, res, next){

    var novedades = await novedadesModel.getNovedades();
    res.render('admin/novedades',{
        layout: 'admin/layout',
        usuario: req.session.nombre,
        novedades      
            
    });
});

router.get('/agregar', (req, res, next) => {

    res.render('admin/agregar',{
        layout: 'admin/layout',          

    });
});

router.post ('/agregar', async (req, res, next) => {
    try {
        // console.log(req.body);
        if (req.body.titulo !="" && req.body.subtitulo !="" && req.cuerpo !=""){
            await novedadesModel.insertNovedades(req.body);
            res.redirect ('/admin/novedades')
        } else {
            res.render ('admin/agregar', {
                layout: 'admin/agregar',
                error: true,
                message: 'Todos los campos son requeridos'
            })
        }
    } catch(error){
        console.log(error)
        res.render('admin/agregar', {
            layout: 'admin/layout',
            error: true,
            message: 'No se cargó novedad'
        })
    }
})

/*Para eliminar */
router.get("/eliminar/:id", async (req, res, next)=>{
    var id = req.params.id;
    await novedadesModel.deleteNovedadesById(id);
    res.redirect('/admin/novedades');


}); //cierra get eliminar.


/*para modificar => traer la novedad por id*/
router.get('/modificar/:id', async (req, res, next) =>{

    var id = req.params.id;
    // console.log(req.params.id);
    var novedades= await novedadesModel.getNovedadesById(id);

    res.render('admin/modificar',{
        layout: 'admin/layout',
        novedades
    })


    }); 
/*modificar UPDATE =>*/

router.post('/modificar', async (req, res, next)=> {
    try{
        var obj = {
            titulo: req.body.titulo,
            subtitulo: req.body.subtitulo,
            cuerpo: req.body.cuerpo
        }
        console.log(obj)
        await novedadesModel.modificarNovedadesById(obj, req.body.id);
        res.redirect('/admin/novedades');

    } catch (error){
        console.log(error)
        res.render('admin/modificar', {
            layout: 'admin/layout',
            error: true,
            message: 'No se modificó la novedad'
        })
    }
})


module.exports = router;
