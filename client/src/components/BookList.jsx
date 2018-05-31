import React from 'react';
import Book from './Book';
import { Transition, List } from 'semantic-ui-react';

const BookList = (props) => {
  return (
    
        <Transition.Group
        as={List}
        duration={500}
        divided
        size='Medium'
        verticalAlign='middle'
        animation='fade'
        >
        <div>
          {props.data.map(book => (
              <Book 
                  title={book.title} 
                  author={book.author} 
                  description={book.description} 
                  isbn={book.isbn} 
                  key={book._id} 
                  id={book._id}
                  handleUpdateBook={props.handleUpdateBook}
                  handleDeleteBook={props.handleDeleteBook} 
              />
          ))};
          </div>
        </Transition.Group>
    
  );
};

export default BookList;  