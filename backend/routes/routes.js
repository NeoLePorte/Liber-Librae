//server/routes/routes.js
import express from 'express'
import Book from '../models/Book';
var router = express.Router();

//api route
router.get('/', (req, res) => {
  res.json({ message: 'Hello, World!' });
});


// get /books
router.get('/books', (req, res) => {
  Book.find((err, books) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: books });
  });
});

//post a new book to /books
router.post('/books', (req, res) => {
  const book = new Book();
  // body parser lets us use the req.body
  const { title, author, description, ISBN } = req.body;
  console.log(req.body);
  if (!title || !author || !description || !ISBN) {
    // we should throw an error. we can do this check on the front end
    return res.json({
      success: false,
      error: 'You must provide a title, author, description, ans ISBN'
    });
  }
  //saves book
  book.author = author;
  book.title = title;
  book.description = description;
  book.ISBN = ISBN;
  book.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});


// router.get('/', function(req, res){
//   res.render('index')
// });

// router.get('/about', function(req, res){
//   res.render('about')
// });

export default router;