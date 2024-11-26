const express = require('express');
const multer = require('multer');
const mongodb = require('mongodb');

const db = require('../data/database');

const ObjectId = mongodb.ObjectId;

const storageConfig = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null,'images');
  },
  filename: function(req,file,cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
}
);

const upload = multer({ storage: storageConfig});
const router = express.Router();

router.get('/', async function(req, res) {
  if(!req.session.isAuthenticated)
  {
    return res.render('login');
  }

  const images = await db.getDb().collection('images').find().toArray();
  res.render('main', {images: images});
});

router.get('/upload', function(req, res) {
  if(!req.session.isAuthenticated)
  {
    return res.render('login');
  }

  res.render('upload');
});

router.post('/main', upload.single('image'), async function(req,res){
  const uploadedImageFile = req.file;
  const imageData = req.body;

  const userData = req.session.user;
  console.log(userData);

  await db.getDb().collection('images').insertOne({
    imagePath: uploadedImageFile.path,
    imageName: imageData.imageName,
    imageExplain: imageData.imageExplain,
    imageTag: imageData.imageTag,
    user: {id: new ObjectId(userData.id), email: userData.email}
  });

  res.redirect('/');
});

router.post('/search-main', async function(req,res){
  const imageTag = req.body.search;
  const images = await db
  .getDb()
  .collection('images')
  .find({imageTag:imageTag})
  .toArray();

  if(!images)
  {
    return res.status(404).render('404');
  }

  res.render('search-main', {images : images});
});

module.exports = router;