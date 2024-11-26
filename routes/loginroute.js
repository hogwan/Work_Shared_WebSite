const express = require('express');
const bcrypt = require('bcryptjs');

const db = require('../data/database');

const router = express.Router();

router.get('/signup', function (req, res) { 
  let sessionInputData = req.session.inputData;

  if(!sessionInputData){
    sessionInputData = {
      hasError: false,
      message: '',
      email: '',
      confirmEmail: '',
      password: ''
    };
  }

  req.session.inputData = null;

  res.render('signup', {inputData: sessionInputData});
});

router.get('/login', function (req, res) {
  res.render('login');
});

router.post('/signup', async function (req, res) {
  const userData = req.body;
  const enteredEmail = userData.email; //userData['email']
  const enteredConfirmEmail = userData['confirm-email'];
  const enteredPassword = userData.password;

  if (
    !enteredEmail
    || !enteredConfirmEmail
    || !enteredPassword
    || enteredPassword.trim() < 6
    || enteredConfirmEmail !== enteredEmail
    || !enteredEmail.includes('@')) {

      req.session.inputData = {
        hasError: true,
        message: 'Invalid input - please check your data',
        email: enteredEmail,
        confirmEmail: enteredConfirmEmail,
        password: enteredPassword
      };

      req.session.save(function() {
          console.log('Incorrect data');
          return res.redirect('/signup');
      })

      return;
  }

  const existingUser = await db.getDb().collection('users').findOne({email: enteredEmail});

  if(existingUser)
  {
    console.log('User exists already');
    return res.redirect('/signup');
  }
  

  const hashedPassword = await bcrypt.hash(enteredPassword, 12);
  
  const user = {
    email: enteredEmail,
    password: hashedPassword
  }

  await db.getDb().collection('users').insertOne(user);

  res.redirect('/login');
})


router.post('/login', async function (req, res) {
  const userData = req.body;
  const enteredEmail = userData.email; //userData['email']
  const enteredPassword = userData.password;

  const existingUser = await db
  .getDb()
  .collection('users')
  .findOne({email: enteredEmail});

  if(!existingUser){
    console.log('Could not log in!');
    return res.redirect('/login');
  }

  const passwordAreEqual = await bcrypt.compare(enteredPassword, existingUser.password);

  if(!passwordAreEqual)
  {
    console.log('Could not log in - passwords are not equal!');
    return res.redirect('/login');
  }

  req.session.user = {id: existingUser._id, email:existingUser.email};
  req.session.isAuthenticated = true;
  req.session.save(function(){
    console.log('User is authenticated!');
    res.redirect('/');
  })

});

router.post('/logout', function (req, res) {
  req.session.user = null;
  req.session.isAuthenticated = false;
  res.redirect('/');
});

module.exports = router;
