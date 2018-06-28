import React from 'react';
import Book from './Book';
import { Button,Transition, List, Header, Divider } from 'semantic-ui-react';

class BookList extends React.Component {
    render() {
    return (
      <React.Fragment>
        <Header as='h2' content="Book List" textAlign="center" dividing />
        <div style={{ overflowY: 'scroll', height: '400px'}}>
          <Transition.Group
          as={List}
          duration={500}
          divided
          size='medium'
          verticalAlign='middle'
          animation='fade'
          >
            {this.props.data.map((book, i) => (
              <List.Item key={i}>
                <Book 
                  title={book.title} 
                  author={book.author} 
                  description={book.description} 
                  isbn={book.isbn} 
                  key={book._id} 
                  id={book._id}
                />
                <br></br>
                <Button.Group>
                  <Button primary compact  onClick={() => {this.props.onUpdateBook(book._id)}}>update</Button>
                  <Button secondary compact  onClick={() => {this.props.onDeleteBook(book._id)}}>delete</Button>
                </Button.Group>
                </List.Item>
            ))};
          </Transition.Group>
          <Divider />
        </div>
      </React.Fragment>
    );
  }
};

export default BookList;  