const fs = require('fs');
const path = require('path');

const express = require('express');

const app = express();

app.use(express.urlencoded({extended: false}));

app.get('/currenttime', function(req, res) {
    res.send('<h1>' + new Date().toISOString() + '</h1>');
} );

app.get('/board', function(req, res){
    const htmlFilePath = path.join(__dirname, 'frontend', 'board.html');
    res.sendFile(htmlFilePath);
});

app.get('/image-upload', function(req, res){

    const htmlFilePath = path.join(__dirname, 'frontend', 'image-upload.html');
    res.sendFile(htmlFilePath);
});

app.get('/login', function(req,res){
    const htmlFilePath = path.join(__dirname, 'frontend', 'login.html');
    res.sendFile(htmlFilePath);
});

app.get('/my-info', function(req,res){
    const htmlFilePath = path.join(__dirname, 'frontend', 'my-info.html');
    res.sendFile(htmlFilePath);
});

app.get('/search', function(req,res){
    const htmlFilePath = path.join(__dirname, 'frontend', 'search.html');
    res.sendFile(htmlFilePath);
});

app.get('/find-password', function(req,res)
{
    const htmlFilePath = path.join(__dirname, 'frontend', 'find-password.html');
    res.sendFile(htmlFilePath);
});


app.get('/users', function(req, res) {
    const filePath = path.join(__dirname, 'data', 'users.json');
    
    const fileData = fs.readFileSync(filePath);
    const existingUsers = JSON.parse(fileData);
    
    let responseData = '<ul>';
    
    for(const user of existingUsers) {
        responseData += '<li>' + user +'</li>';
    }
    
    responseData += '</ul>';
    
    res.send(responseData);
});

app.post('/store-user', function(req, res){
    const userName = req.body.username;

    const filePath = path.join(__dirname, 'data', 'users.json');
    
    const fileData = fs.readFileSync(filePath);
    const existingUsers = JSON.parse(fileData);
    
    existingUsers.push(userName);

    fs.writeFileSync(filePath, JSON.stringify(existingUsers));

    res.send('<h1>Username stored!</h1>');
});

app.listen(3000);