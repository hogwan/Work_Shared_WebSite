const path = require('path');

const express = require('express');
const session = require('express-session');
const mongodbStore = require('connect-mongodb-session');

const db = require('./data/database');
const loginRoutes = require('./routes/loginroute');
const uploadRoutes = require('./routes/uploadroute');

const MongoDBStore = mongodbStore(session);

const app = express();

const sessionStore = new MongoDBStore({
  uri: 'mongodb://localhost:27017',
  databaseName: 'user-auth',
  collection: 'sessions'
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(express.static('logo'));
app.use('/images',express.static('images'));

app.use(session({
  secret: 'super-secret',
  resave: false,
  saveUninitalized: false,
  store: sessionStore,
}));

app.use(loginRoutes);
app.use(uploadRoutes);

app.use(function(error, req, res, next) {
  res.render('500');
})

db.connectToDatabase().then(function () {
  app.listen(3000);
});
