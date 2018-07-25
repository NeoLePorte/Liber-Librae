import React from 'react';
import Book from './Book';
import { connect } from 'react-redux'
import { fetchBooks, deleteBook, updateBook } from '../actions/BookActions'
import propTypes from 'prop-types'
import { Button,Transition, List, Header, Divider } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom'


class BookList extends React.Component {
  componentDidMount() {
    this.props.fetchBooks();
  }

  onDelete = (id) => {
    this.props.deleteBook(id)
    //TODO: create action to clear form on delete to prevent updating deleted item.
  }
    render() {
    return (
      <React.Fragment>
        <Header as='h2' content="Book List" textAlign="center" dividing />
        <div style={{ overflowY: 'scroll', height: '490px'}}>
          <Transition.Group
          as={List}
          duration={500}
          divided
          size='medium'
          verticalAlign='middle'
          animation='fade'
          >
            {this.props.books.items.map((book, i) => (
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
                  <Button primary compact  onClick={() => {this.props.updateBook(book)}}>update</Button>
                  <Button secondary compact  onClick={() => {this.onDelete(book._id)}}>delete</Button>
                </Button.Group>
                <Button as={NavLink} to={`/book-info/${book.title}`} primary compact floated='right'>More Info</Button>
                </List.Item>
            ))};
          </Transition.Group>
          <Divider />
        </div>
      </React.Fragment>
    );
  }
};

const mapStateToProps = state => ({
  ...state
 })
 
 const mapDispatchToProps = dispatch => ({
  fetchBooks: () => dispatch(fetchBooks()),
  deleteBook: (id) => dispatch(deleteBook(id)),
  updateBook: (book) => dispatch(updateBook(book))
 })

BookList.propTypes = {
  fetchBooks: propTypes.func.isRequired,
  deleteBook: propTypes.func.isRequired,
  updateBook: propTypes.func.isRequired,
  books: propTypes.object.isRequired
}



export default connect (mapStateToProps, mapDispatchToProps) (BookList);  