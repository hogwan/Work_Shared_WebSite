const fs = require('fs');
const path = require('path');

const express = require('express');
const uuid = require('uuid');

const app = express();

app.set('frontend', path.join(__dirname, 'frontend'));
app.set('frontend engine', 'ejs');

app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));

app.get('/board', function(req, res){
    res.render('board');
});

app.get('/image-upload', function(req, res){

    res.render('image-upload');
});

app.get('/login', function(req,res){
    res.render('login');
});

app.get('/my-info', function(req,res){
    res.render('my-info');
});

app.get('/search', function(req,res){
    res.render('search');
});

app.get('/find-password', function(req,res)
{
    res.render('find-password');
});

app.listen(3000);