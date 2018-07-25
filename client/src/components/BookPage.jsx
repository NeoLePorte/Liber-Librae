import React, { Component } from 'react';
import DesktopContainer from './Home/DesktopContainer.jsx'
import MobileContainer from './Home/MobileContainer.jsx'
import { fetchBooks, deleteBook, updateBook, getSingleBook } from '../actions/BookActions'
import { connect } from 'react-redux'
import {
    Segment,
    Header
  } from 'semantic-ui-react';

  class BookPage extends Component {
    //TODO: Fix this hacky mess. Redux should probably persist state through local storage.should not fetch again.
     componentDidMount() {
      this.props.fetchBooks()
      this.props.getSingleBook(this.props.match.params.title)
    }

    render() {
      const { title, description, author, isbn } = this.props.books.item;
     const ResponsiveContainer = ({ children }) => (
         <div>
           <DesktopContainer>{children}</DesktopContainer>
           <MobileContainer>{children}</MobileContainer>
         </div>
       )
        return(
         <ResponsiveContainer>
         <Header as='h2' attached='top' textAlign="center">
          {title}
         </Header>
         <Segment attached size="large" padded="very" textAlign="center" vertical >
          {description}
         </Segment>
       </ResponsiveContainer>
        );
    }
 }

 //maps redux state to component props
const mapStateToProps = state => ({
  ...state
  })

//maps actions to component props
const mapDispatchToProps = dispatch => ({
fetchBooks: () => dispatch(fetchBooks()),
deleteBook: (id) => dispatch(deleteBook(id)),
updateBook: (book) => dispatch(updateBook(book)),
getSingleBook: (id) => dispatch(getSingleBook(id))
})
 
 export default connect (mapStateToProps, mapDispatchToProps) (BookPage);  