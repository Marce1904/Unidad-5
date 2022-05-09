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



module.exports = router;
