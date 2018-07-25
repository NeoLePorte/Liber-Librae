import { BOOK_FETCH, POST_ERROR, BOOK_DELETE, BOOK_UPDATE, GET_SINGLE_BOOK } from './types'

//----------CRUD actions----------------------//


  //CREATE
export const createBook = (data) => dispatch => {
  const { title, author, description, isbn } = data;
  fetch('/api/books', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, author, description, isbn }),
  })
  .then(res => res.json())
  .then((res) => {
  if (!res.success) 
  dispatch({
    type: POST_ERROR,
    payload: res.error
    })
  })
}

//READ
export const fetchBooks = () => dispatch => {
    fetch('/api/books/')
    .then(data => data.json())
    .then( books =>
    dispatch({
    type: BOOK_FETCH,
    payload: books.data
    })
)}

//UPDATE
export const submitUpdate = (data) => dispatch => {
  const { title, author, description, isbn, updateId } = data;
  fetch(`/api/books/${updateId}`, { 
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, author, description, isbn }),
  })
  .then(res => res.json())
  .then((res) => {
    if (!res.success) 
    dispatch({
      type: POST_ERROR,
      payload: res.error
    })
  });
}

//DELETE
export const deleteBook = (id) => dispatch => {
    fetch(`api/books/${id}`, { method: 'DELETE' })
      .then(res => res.json())
      .then(() => {
        dispatch({
            type: BOOK_DELETE,
            payload: id
        })
      });
  }

//Updates form state to display selected book
export const updateBook = (book) => dispatch => {
  if (!book) return;
  dispatch({ 
    type: BOOK_UPDATE,
    updateId: book._id,
    title: book.title,
    author: book.author,
    description: book.description,
    isbn: book.isbn
  });
}

//Gets single book and updates state to display book info on BookPage
export const getSingleBook = (id) =>   dispatch => {
    dispatch({
      type: GET_SINGLE_BOOK,
      payload: id
    })
}
