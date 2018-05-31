import React, { Component } from 'react'
import Form from './Form';
import '../css/App.css'

import Book from './Book'
import {
  Button,
  Transition,
  Container,
  Grid,
  Header,
  Icon,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
} from 'semantic-ui-react'

/* eslint-disable react/no-multi-comp */

// Heading
const HomepageHeading = ({ mobile }) => (   
  <Container text>
    <Header
      className='title-heading'
      as='h1'
      content='Liber LibrÆ'
      inverted
      style={{
        fontSize: mobile ? '2em' : '4em',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop: mobile ? '1.5em' : '4em',
        color: 'ivory'
      }}
    />
    <Header
      as='h2'
      content=' Learn first --- Oh thou who aspirest unto our ancient Order!'  
      style={{
        color:'seagreen',
        fontSize: mobile ? '1.5em' : '1.9em',
        fontWeight: 'normal',
        marginTop: mobile ? '0.5em' : '1.5em',
        paddingTop: '0.5em'
      }}
    />
    <Button color='teal' inverted size='huge'>
      Get Started
      <Icon name='right arrow' />
    </Button>
  </Container>
)
// Desktop view
class DesktopContainer extends Component {
  state = {}

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })
  
  render() {
    const { children } = this.props
    const { fixed } = this.state

    return (
      // <Responsive minWidth="767" > {...Responsive.onlyComputer} Responsive.onlyComputer needs work to fit all devices.
      <Responsive minWidth="767" > 
        <Visibility once={false} onBottomPassed={this.showFixedMenu} onBottomPassedReverse={this.hideFixedMenu}>
          <Segment inverted textAlign='center' style={{ minHeight: 700, padding: '1em 0em' }} vertical>
            <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size='large'
            >
              <Container className="main-menu-links">
                <Menu.Item as='a' active>Home</Menu.Item>
                <Menu.Item as='a'>About</Menu.Item>
                <Menu.Item as='a'>Contact</Menu.Item>
                <Menu.Item position='right'>
                  <Button as='a' inverted={!fixed}>Log in</Button>
                  <Button as='a' inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>Sign Up</Button>
                </Menu.Item>
              </Container>
            </Menu>
            <HomepageHeading />
          </Segment>
        </Visibility>
        {children}
      </Responsive>
    )
  }
}
// Mobile View
class MobileContainer extends Component {
  state = {}

  handlePusherClick = () => {
    const { sidebarOpened } = this.state
    if (sidebarOpened) this.setState({ sidebarOpened: false })
  }

  handleToggle = () => this.setState({ sidebarOpened: !this.state.sidebarOpened })

  render() {
    const { children } = this.props
    const { sidebarOpened } = this.state

    return (
      <Responsive {...Responsive.onlyMobile}>
        <Sidebar.Pushable>
          <Sidebar as={Menu} animation='uncover' inverted vertical visible={sidebarOpened}>
            <Menu.Item as='a' active>Home</Menu.Item>
            <Menu.Item as='a'>About</Menu.Item>
            <Menu.Item as='a'>Contact</Menu.Item>
            <Menu.Item as='a'>Log in</Menu.Item>
            <Menu.Item as='a'>Sign Up</Menu.Item>
          </Sidebar>

          <Sidebar.Pusher dimmed={sidebarOpened} onClick={this.handlePusherClick} style={{ minHeight: '100vh' }}>
            <Segment inverted textAlign='center' style={{ minHeight: 350, padding: '1em 0em' }} vertical>
              <Container>
                <Menu inverted pointing secondary size='large'>
                  <Menu.Item onClick={this.handleToggle}>
                    <Icon name='sidebar' />
                  </Menu.Item>
                  <Menu.Item position='right'>
                    <Button as='a' inverted>Log in</Button>
                    <Button as='a' inverted style={{ marginLeft: '0.5em' }}>Sign Up</Button>
                  </Menu.Item>
                </Menu>
              </Container>
              <HomepageHeading mobile />
            </Segment>

            {children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Responsive>
    )
  }
}


const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
)



class HomepageLayout extends Component {
    constructor() {
      super();
      this.state = {
        data: [],
        error: null,
        title: '',
        author: '',
        description: '',
        isbn: '',
        updateId: null,
        onDeleteBook: this.onDeleteBook.bind(this),
        onUpdateBook: this.onUpdateBook.bind(this)
      };
      
      
    }
  
    componentDidMount() {
      this.loadBooksFromServer();
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
    //TODO: Fix delete function to allow Transitions to work on unmount
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
      const { title, author, description, isbn, updateId } = this.state;
      if (!title || !author ||!description ||!isbn)  return;
      if (updateId) {
        this.submitUpdatedBook();
      } else {
        this.submitNewBook();
      }
    }
    //Creates new Book
    //TODO: Fix SubmitNewBook function to allow Transitions to work on mount
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
            <Segment style={{ padding: '8em 0em' }} vertical>
            <Grid  container stackable verticalAlign='middle'>
                <Grid.Row >
                <Grid.Column  width={8}>
                
                <Transition.Group
                as={List}
                duration={500}
                divided
                size='medium'
                verticalAlign='middle'
                animation='fade'
                >
                  {this.state.data.map((book, i) => (
                    <List.Item key={i}>
                      <Book 
                          title={book.title} 
                          author={book.author} 
                          description={book.description} 
                          isbn={book.isbn} 
                          key={book._id} 
                          id={book._id}
                      />
                      <Button.Group>
                        <Button primary compact  onClick={() => {this.onUpdateBook(book._id)}}>update</Button>
                        <Button secondary compact  onClick={() => { this.onDeleteBook(book._id)}}>delete</Button>
                      </Button.Group>
                      </List.Item>
                  ))};
                  
                </Transition.Group>

                </Grid.Column >    
                <Grid.Column  floated='right' width={6}>

                    <Form
                    title={this.state.title}
                    author={this.state.author}
                    description={this.state.description}
                    isbn={this.state.isbn}
                    handleChangeText={this.onChangeText}
                    submitBook={this.submitBook} />

                </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                <Grid.Column  textAlign='center'>
                    <Button  size='huge'>Button!</Button>
                </Grid.Column>
                </Grid.Row>
            </Grid>
            </Segment>
            {/* Sub-Body */}
            <Segment style={{ padding: '0em' }} vertical>
            <Grid celled='internally' columns='equal' stackable>
                <Grid.Row textAlign='center'>
                <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                    <Header as='h3' style={{ fontSize: '2em' }}>
                      Yah fur sure
                    </Header>
                    <p>you are</p>
                    <p style={{ fontSize: '1.33em' }}></p>
                </Grid.Column>
                <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                    <Header as='h3' style={{ fontSize: '2em' }}>I dunno</Header>
                   <p>Im not</p>
                </Grid.Column>
                </Grid.Row>
            </Grid>
            </Segment>
               {/* Footer */}
            <Segment inverted vertical style={{ padding: '5em 0em' }}>
            <Container>
                <Grid divided inverted stackable>
                <Grid.Row>  
                    <Grid.Column width={3}>
                    <Header inverted as='h4' content='About' />
                    <List link inverted>
                        <List.Item as='a'>Contact Us</List.Item>
                        <List.Item as='a'>pSeUDO Religious Ceremonies</List.Item>
                        <List.Item as='a'>Deathstar Plans</List.Item>
                    </List>
                    </Grid.Column>
                    <Grid.Column width={3}>
                    <Header inverted as='h4' content='Services' />
                    <List link inverted>
                        
                    </List>
                    </Grid.Column>
                    <Grid.Column width={7}>
                    <Header as='h4' inverted>Footer Header</Header>
                    <p>Blahrg</p>
                    </Grid.Column>
                </Grid.Row>
                </Grid>
            </Container>
            </Segment>
        </ResponsiveContainer>
        )
    }
}
export default HomepageLayout