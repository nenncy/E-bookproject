var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose=require('mongoose');


// var indexRouter = require('./routes/index');
// var partRouter=require('./routes/part.route');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//connection
mongoose.connect('mongodb://localhost:27017/Socialmedia',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"));

app.get('/parts', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

app.get('/unit', function(req,res,next){
  res.render('unit', {title:'units'});
});

app.get('/chapter', function(req,res,next){
  res.render('chapters', {title:'chapter'});
});

app.use('/api', require('./routes/part.route'));
app.use('/api',require('./routes/unit.route'));
app.use('/api',require('./routes/chapter.route'));

app.listen(5000, ()=>{
  console.log("server is running");
})

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
