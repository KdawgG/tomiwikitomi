const express = require('express')
const router = express.Router();


var models = require('../models');
var Page = models.Page; 
var User = models.User; 

router.post('/', function(req, res, next) {

  // STUDENT ASSIGNMENT:
  // add definitions for `title` and `content`
  Page.create({
    title: req.body.title,
    content: req.body.content,
    status: req.body.status
  })
  .then(function(page){
    User.findOrCreate({
      where :{
        name: req.body.name,
        email: req.body.email
      }
    })
    .then(function(userRow){
      page.setUser(userRow[0])
    })
    return page;
  })
  .then(function(page){
    res.redirect(page.route)
  })
  .catch(function(err){
    console.log(err)
  })

  // STUDENT ASSIGNMENT:
  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise or it can take a callback.
  	
  // -> after save -> res.redirect('/');
});

// /wiki/add
router.get('/add', function (req, res, next){
	res.render('addpage')
})

router.get('/:urlTitle', function(req,res,next){
	Page.findOne({where: {urlTitle : req.params.urlTitle}})
	.then(function(row){
    row.getUser()
  })
  .then(function(userrow){
	  res.render('wikipage')
  })
  .catch(next)
})

// /wiki/
router.get('/', function (req, res, next){
	res.redirect('/')
})

router.get('/users/:id', function (req, res, next){
  Page.findAll({where: {userId == req.params.id}})
  .then
})


module.exports = router;