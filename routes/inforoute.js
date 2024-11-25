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

  res.render('image-detail', {image: image});

});

router.get('/image/:id/edit', async function(req, res) {
  const imageId = req.params.id;
  const image = await db
  .getDb()
  .collection('images')
  .findOne({_id: new ObjectId(imageId)});

  if(!image){
    return res.status(404).render('404');
  }

  res.render('update-image', {image: image});
});

router.image('/image/:id/edit', async function(req,res){
  const imageId = new ObjectId(req.params.id);
  const result = await db.getDb()
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
  
  res.redirect('/profile');
});

router.image('/image/:id/delete', async function(req,res){
  const imageId = new ObjectId(req.params.id);
  const result = await db
  .getDb()
  .collection('images')
  .deleteOne({_id: imageId});

  res.redirect('/profile');
})

module.exports = router;