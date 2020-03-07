const createError = require('http-errors');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const http = require('http');
const debug = require('debug')('mean-stack-app:server');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');
const userRouter = require('./routes/userfront');
const recipeRouter = require('./routes/recipes');

const config = require('./config/config.json');

mongoose.connect(`mongodb://${config.mongoUser}:${config.mongoPass}@${config.mongoSession}/${config.mongoName}?authSource=admin`, {
  useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false,
}, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected to mongodb');
  }
});

const User = require('./models/User');

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || '3000';

app.set('port', port);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(require('express-session')({
  secret: 'condor',
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use('/', userRouter);
app.use('/recipes', recipeRouter);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

const onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? `Pipe ${port}`
    : `Port ${port}`;

  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
};

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
