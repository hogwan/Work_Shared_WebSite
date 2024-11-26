const express = require('express');
const mongodb = require('mongodb');

const db = require('../data/database');

const ObjectId = mongodb.ObjectId;

const router = express.Router();

router.get('/image/:id', async function(req,res) {
  const imageId = req.params.id;
  const image = await db
  .getDb()
  .collection('images')
  .findOne({_id: new ObjectId(imageId)});

  if(!image){
    return res.status(404).render('404');
  }

  const user = req.session.user;
  const isSelf = (user.email === image.user.email);

  res.render('image-detail', {image: image, isSelf: isSelf});

});

router.get('/image/:email/profile', async function(req, res) {
  const userEmail= req.params.email;
  const user = await db
  .getDb()
  .collection('users')
  .findOne({email: userEmail});

  const images = await db
  .getDb()
  .collection('images')
  .find().toArray();

  console.log(images);
  if(!user){
    return res.status(404).render('404');
  }
  
  if(!images)
  {
    return res.status(404).render('404');
  }

  const isSelf = (user.email === req.session.email);

  res.render('profile', {user: user, images:images, isSelf:isSelf});
});

router.get('/profile', async function(req,res){
  if(!req.session.isAuthenticated)
    {
      return res.render('login');
    }

  const user = req.session.user;

  const images = await db
  .getDb()
  .collection('images')
  .find().toArray();

  const isSelf = true;

  res.render('profile', {user:user, images:images, isSelf: isSelf});
})

router.get('/notice', async function(req,res){
  if(!req.session.isAuthenticated)
    {
      return res.render('login');
    }

  res.render('notice');
});

router.get('/image/:id/edit', async function(req,res){
  const imageId = req.params.id;
  const image = await db
  .getDb()
  .collection('images')
  .findOne({_id: new ObjectId(imageId)});

  if(!image){
    return res.status(404).render('404');
  }

  res.render('image-edit', {image: image});
})

router.post('/image/:id/edit', async function(req,res){
  const imageId = new ObjectId(req.params.id);

  console.log(imageId);
  await db.getDb()
  .collection('images')
  .updateOne(
    {_id: imageId},
     {
      $set: {
    imageName: req.body.imageName,
    imageExplain: req.body.imageExplain,
    imageTag: req.body.imageTag,
      },
    }
  );

  const image = await db.getDb().collection('images').findOne({_id: imageId});
  const isSelf = true;
  console.log(image);
  res.render('image-detail', {image: image, isSelf: isSelf});
});

router.get('/image/:id/delete', async function(req,res){
  const imageId = new ObjectId(req.params.id);
  const result = await db
  .getDb()
  .collection('images')
  .deleteOne({_id: imageId});

  res.redirect('/');
});

router.get('/logout', function(req,res){
  req.session.isAuthenticated = false;
  
  res.render('login');
})

module.exports = router;