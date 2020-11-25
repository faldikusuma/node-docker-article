const express = require('express');
const mongoose = require('mongoose');
const db = require('./db');
const path = require('path');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

// SET PORT
const port = process.env.PORT || 8080;

const app = express();
app.locals.moment = require('moment');
// set public folder

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(
  express.urlencoded({
    extended: true,
  })
);
// Body Parser Middleware
// parse application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

// parse application/json
app.use(bodyParser.json());
// set public folder
app.use(express.static(path.join(__dirname, 'public')));
app.use('public/upload/', express.static(path.join(__dirname, 'upload')));

/// Express Session Middleware
app.use(
  session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
  })
);

// Express Messages Middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// Express Validator Middleware
app.use(
  expressValidator({
    errorFormatter: function (param, msg, value) {
      var namespace = param.split('.'),
        root = namespace.shift(),
        formParam = root;

      while (namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }
      return {
        param: formParam,
        msg: msg,
        value: value,
      };
    },
  })
);
// Passport Config
require('./config/passport')(passport);
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
app.get('*', (req, res, next) => {
  res.locals.user = req.user || null;
  next();
});
// Home routes

const Article = require('./models/articles');
const User = require('./models/user');
app.get('/', function (req, res) {
  Article.find({}, (err, article) => {
    if (err) {
      console.log(err);
    } else {
      res.render('index', {
        title: 'Articles',
        articles: article,
      });
    }
  });
});
// Route files
const articles = require('./routes/articles');
const users = require('./routes/users');
//add Route
app.use('/articles', articles);
app.use('/users', users);

app.listen(port, () => {
  console.log('server listen in 8080');
});
