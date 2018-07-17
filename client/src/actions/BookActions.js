import { BOOK_FETCH, POST_ERROR, BOOK_DELETE, BOOK_UPDATE } from './types'
import { change } from 'redux-form'

export const fetchBooks = () => dispatch => {
    fetch('/api/books/')
    .then(data => data.json())
    .then( books =>
    dispatch({
    type: BOOK_FETCH,
    payload: books.data
    })
)}

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
  
  //TODO figure out how to access the form store to change form values

//TODO get update books working
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

