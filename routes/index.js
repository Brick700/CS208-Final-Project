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
  const page=parseInt(req.query.page) || 1;
  const commentLimit = 10;
  const offset = (page - 1) * commentLimit;

  try {
    req.db.query('SELECT COUNT(*) AS total FROM comments;', (err, countResult) => {
      if (err) {
        console.error('Error counting comments', err);
        return res.render('comments', {title: 'Downtown Donuts', comments: [], error: 'Failed to count comments. Please try again later'});
      }

      const totalComments = countResult[0].total;
      const totalPages = Math.ceil(totalComments / commentLimit);

    req.db.query('SELECT * FROM comments ORDER BY created_at DESC LIMIT ? OFFSET ?;', [commentLimit, offset], (err, comments) => {
      if (err) {
        console.error('Error loading comments', err);
        return res.render('comments', {title: 'Downtown Donuts', comments: [], error: 'Failed to load comments. Please try again later',});
      }
      console.log('Comments loaded successfully:', comments);
      res.render('comments', {title: 'Downtown Donuts', comments: comments, currentPage: page, totalPages: totalPages, error: null});
    });
  });
} catch (error) {
  console.error('Error loading comments:', error);
  res.status(500).send('Error loading comments');
}
});

router.post('/comments', function(req, res, next){
const {name, comment } = req.body;

//Reject Empty Fields
if (!name || name.trim() === '') {
  return res.render('comments', {title: 'Downtown Donuts', comments: [], error: 'A name is required', currentPage: 1, totalPages: 1});
}

if (!comment || comment.trim() === '') {
  return res.render('comments', {title: 'Donwntown Donuts', comments: [], error: 'Comment cannot be blank', currentPage: 1, totalPages: 1});
}


//Max character length
if (name.trim().length > 100) {
  return res.render('comments', {title: 'Downtown Donuts', comments: [], error: 'Name must be under 100 characters long', currentPage: 1, totalPages: 1});
}

if (comment.trim().length > 1000) {
  return res.render('comments', {title: 'Downtown Donuts', comments: [], error: 'Comment must be under 1000 characters long', currentPage: 1, totalPages: 1});
}

//Sanitize inputs
const sanitizeName = name.trim().replace(/</g, '&lt;').replace(/>/g, '&gt;');
const sanitizeComment = comment.trim().replace(/</g, '&lt;').replace(/>/g, '&gt;');

//Timestamp
try {
  req.db.query('INSERT INTO comments (name, comment) VALUES (?, ?);', [sanitizeName, sanitizeComment], (err, results) => {
    if (err) {
      console.error('Error adding comment', err);
      return res.render('comments', {title: 'Downtown Donuts', comments: [], error: 'Failed to add comment. Please try again later', currentPage: 1, totalPages: 1});
    }
    console.log('Successfully added comment', results);
    res.redirect('/comments');
  });
} catch (error) {
  console.error('Error adding comments:', error);
  res.status(500).send('Error adding comments');
}
});

module.exports = router;