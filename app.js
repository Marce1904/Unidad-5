var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require("./routes/admin/login");


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin/login', loginRouter);

// var pool = require('./models/db');
// pool.query('select * from usuarios').then(function(resultados){
//   console.log(resultados)
// });




// Insertamos un usuario INSERT------------

// var pool = require('./models/db');
// var obj = {
//   usuarios: 'Pablo',
//   password: '4388',
// }

// pool.query('insert into usuarios set ?', [obj]).then(function(resultados){
//   console.log(resultados);
// });

// UPDATE------------------

// var pool = require('./models/db');
// var id = 5;
// var obj = {
//   usuarios: 'Juan',
//   password: '4566',
// }

// pool.query("update usuarios set ? where id=?", [obj, id]).then(function(resultados){
//   console.log(resultados);
// });



// DELETE-------------------

// var pool = require('./models/db');
// var id = 4;

// pool.query("delete from usuarios where id = ?", [id]).then(function(resultados){
//   console.log(resultados);
// });



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
