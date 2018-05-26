import React from 'react';
import Book from './Book';
import { Transition, List } from 'semantic-ui-react';

export default class BookList extends React.Component {
  render() {
    return (
      <div>
          <Transition.Group
          as={List}
          duration={500}
          divided
          size='medium'
          verticalAlign='middle'
          animation='fade'
          >
            {this.props.data.map(book => (
                <Book 
                    title={book.title} 
                    author={book.author} 
                    description={book.description} 
                    isbn={book.isbn} 
                    key={book._id} 
                    id={book._id}
                    handleUpdateBook={this.props.handleUpdateBook}
                    handleDeleteBook={this.props.handleDeleteBook} 
                />
            ))};
          </Transition.Group>
      </div>
    );
  }
};
