import React, { Component } from 'react';
import Form from '../Form';
import SpeechToText from '../SpeechToText';
import BookList from '../BookList';
import DesktopContainer from './DesktopContainer';
import MobileContainer from './MobileContainer';

import '../../css/App.css';
import {
  Grid,
  Header,
  Segment,
} from 'semantic-ui-react';

/* eslint-disable react/no-multi-comp */

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
)

class HomepageLayout extends Component {
    constructor(props) {
      super(props);
      this.state = {
        data: [],
        error: null,
        title: '',
        author: '',
        description: '',
        isbn: '',
        updateId: null,
      };
    }
  //TODO: fix this anti-pattern hack to close the fetch after component unmounts...maybe
    componentDidMount() {
      this.loadBooksFromServer();
    }

    componentWillUnmount() {
      
    }

  // CRUD functions/Event Handlers//

    // saves form inputs to state.
    onChangeText = (e) => {
      const newState = { ...this.state };
      newState[e.target.name] = e.target.value;
      this.setState(newState);
    }

    onUpdateBook = (id) => {
      const oldBook = this.state.data.find(c => c._id === id);
      if (!oldBook) return;
      this.setState({ title: oldBook.title, author: oldBook.author, description: oldBook.description, isbn: oldBook.isbn, updateId: id });
    }
    
    onDeleteBook = (id) => {
      const i = this.state.data.findIndex(c => c._id === id);
      // eslint-disable-next-line 
      this.setState(this.state.data = [
        ...this.state.data.slice(0, i),
        ...this.state.data.slice(i + 1),
    ]) 
      fetch(`api/books/${id}`, { method: 'DELETE' })
        .then(res => res.json()).then((res) => {
          if (!res.success) this.setState({ error: res.error });
        });
    }
    //submit book handler
    submitBook = (e) => {
      e.preventDefault();
      const {title, author, description, isbn, updateId } = this.state;
      if (!title || !author ||!description ||!isbn)  return;
      if (updateId) {
        this.submitUpdatedBook();
      } else {
        this.submitNewBook();
      }
    }
    //Creates new Book
    submitNewBook = () => {
      const { title, author, description, isbn} = this.state;
      const data = [...this.state.data, {title, author, description, isbn, _id: Date.now().toString() }];
      this.setState({ data });
      fetch('/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, author, description, isbn }),
      }).then(res => res.json())
        .then((res) => {
        if (!res.success) this.setState({ error: res.error.message || res.error });
        else this.setState({ title: '', author: '', description: '', isbn: '', error: null });
      });
    }

    //Submits edited Book
    submitUpdatedBook = () => {
      const { title, author, description, isbn, updateId } = this.state;
      fetch(`/api/books/${updateId}`, { 
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, author, description, isbn }),
      }).then(res => res.json()).then((res) => {
        if (!res.success) this.setState({ error: res.error.message || res.error });
        else this.setState({ title: '', author: '', description: '', isbn: '', updateId: null });
        this.loadBooksFromServer();
      });
    }

  //gets all Books
    loadBooksFromServer = () => {
      fetch('/api/books/')
        .then(data => data.json())
        .then((res) => {
          if (!res.success) this.setState({ error: res.error });
          else this.setState({ data: res.data });
        });
    }

    render() {
        return (
          <ResponsiveContainer>
            <Segment className='list-container' style={{ padding: '8em 0em' }} vertical style={{ overflowY: 'scroll', height: '80vh'}}>
            <Grid celled='internally' columns='equal' stackable>
                <Grid.Row >
                <Grid.Column  width={8}>
                {/* <SpeechToText /> */}
                <BookList 
                {...this.state}
                onUpdateBook={this.onUpdateBook}
                onDeleteBook={this.onDeleteBook}
                />
                </Grid.Column >
              <Grid.Column width={8}>
                <Form 
                {...this.state}
                handleChangeText={this.onChangeText}
                submitBook={this.submitBook}
                />
              </Grid.Column>
                </Grid.Row>
            </Grid>
            </Segment>
            {/* Sub-Body */}
            
            </ResponsiveContainer>
        )
    }
}
export default HomepageLayout