var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const jsonwebtocken=require('jsonwebtoken');
const bodyParser=require('body-parser');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const router = require('./routes/users');
// var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use((req,res,next)=>{
  console.log(req.body);
  let oldsend=res.send;
  res.send = function(data){
    console.log(data);
    oldsend.apply(res,arguments);

  }
next();
}
)
//express session

var expressSession = require('express-session');
app.use(expressSession({secret: 'your secret', saveUninitialized: true, resave: false}));

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
const cors = require("cors");
const { error } = require('console');
app.use(cors({
  origin: '*'
  
}));

app.use(express.json());

//start global error hand 


  // app.all('*',(req,res, next )=>{
  //   const err =new Error(`Request URL ${req.path} not fount`);
  //   err.status='fail';
  //   err.statusCode=404;
  //     next(err);
  //   })
  app.use(function(req, res) {
    return res.status(404).send({ message: 'Route'+req.url+' Not found.' });
  });

  // app.use(function(err, req, res, next) {
  //   return res.status(500).send({ error: err });
  // });

  // end global error 


// app.use((error,req,res,next)=>{
//   const statusCode=err.statusCoderes || 500;
//   error.status =error.status || `error`;
//   res.status(statusCode).json({
//     success:0,
//     message:error.message,
//     status:error.statusCode,
//     stack:err.stack
// })

// })

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  // res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
