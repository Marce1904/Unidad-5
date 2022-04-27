var express = require('express');
const async = require('hbs/lib/async');
var router = express.Router();
var usuariosModels = require('./../../models/usuariosModels');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin/login', {
      
    layout: 'admin/layout'
    });
});

router.post('/', async (req, res, next) => {
  try {
    var usuarios = req.body.usuarios;
    var password = req.body.password;

    var data = await usuariosModels.getUserByUsernameAndPassword(usuarios,password);

    if (data != undefined) {
      res.redirect('/admin/novedades');
    } else {
      res.render('admin/login', {
        layout: 'admin/layout',
        error: true
      });
    }
  } catch(error) {
    console.log(error);
  }
});

module.exports = router;
  