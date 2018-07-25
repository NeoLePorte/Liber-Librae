//backend/routes/routes.js
import express from 'express'
import Book from '../models/Book';
const router = express.Router();

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
  const { title, author, description, isbn } = req.body;
  if (!title || !author || !description || !isbn) {
    return res.json({
      success: false,
      error: 'You must provide a title, author, description, and ISBN'
    });
  }
  //saves book
  book.title = title;
  book.author = author;
  book.description = description;
  book.isbn = isbn;
  book.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});


//updates book info
router.put('/books/:bookId', (req, res) => {
  console.log(req.params);
  const { bookId } = req.params;
  if (!bookId) {
    return res.json({ success: false, error: 'No Book id provided' });
  }
  //TODO: fix validation to prevent updating deleted book.
  Book.findById(bookId, (error, book) => {
    if (error) return res.json({ success: false, error });
    const { title, author, description, isbn } = req.body;
    if (title) book.title = title;
    if (author) book.author = author;
    if (description) book.description = description;
    if (isbn) book.isbn = isbn;
    book.save(error => {
      if (error) return res.json({ success: false, error });
      return res.json({ success: true });
    });
  });
});

// delete book
router.delete('/books/:bookId', (req, res) => {
  const { bookId } = req.params;
  if (!bookId) {
    return res.json({ success: false, error: 'No book id provided' });
  }
  Book.remove({ _id: bookId }, (error) => {
    if (error) return res.json({ success: false, error });
    return res.json({ success: true });
  });
});

export default router;