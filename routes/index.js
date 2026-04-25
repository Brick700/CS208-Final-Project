var express = require('express');
var router = express.Router();

/** Landing Page */
router.get('/', function(req, res, next){
  res.render('index', { title: 'Downtown Donuts'});
});

/** Terms of Use Page */
router.get('/terms', function(req, res, next){
  res.render('terms', { title: 'Downtown Donuts'});
});

/** Privacy Policy Page */
router.get('/privacy', function(req, res, next){
  res.render('privacy', { title: 'Downtown Donuts'});
});


/** Menu Page */
router.get('/menu', function(req, res, next){
  res.render('menu', { title: 'Downtown Donuts'});
});

/** About Us Page */
router.get('/about', function(req, res, next){
  res.render('about', { title: 'Downtown Donuts'});
});

/** Comment Page */
router.get('/comments', function(req, res, next){

  //Pagination


  res.render('comments', { title: 'Downtown Donuts'});
});

router.post('/comments', function(req, res, next){
const {name, comment } = req.body;

//Reject Empty Fields
if (!name || !name.trim() === '') {
  return res.render('comments', {title: 'Donwtown Donuts', comments: [], error: 'A name is required',});
}

if (!comment || !comment.trim() === '') {
  return res.render('comments', {title: 'Donwtown Donuts', comments: [], error: 'Comment cannot be blank',});
}


//Max character length
if (name.trim().length > 100) {
  return res.render('comments', {title: 'Downtown Donuts', comments: [], error: 'Name must be under 100 characters long',});
}

if (comment.trim().length > 1000) {
  return res.render('comments', {title: 'Downtown Donuts', comments: [], error: 'Comment must be under 1000 characters long',});
}



//Sanitize inputs

//Timestamp


module.exports = router;