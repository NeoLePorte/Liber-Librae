import React, { Component } from 'react';
import Form from '../Form';
import '../../css/App.css';
// eslint-disable-next-line 
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {
  Button,
  Container,
  Menu,
  Responsive,
  Segment,
  Visibility,
  Header
} from 'semantic-ui-react';
class About extends Component {
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
            <Segment inverted textAlign='center' style={{ maxHeight:100, padding: '1em 0em'}} vertical>
              <Menu
                fixed={fixed ? 'top' : null}
                inverted={!fixed}
                pointing={!fixed}
                secondary={!fixed}
                size='large'
              >
                <Container className="main-menu-links">
                  <Menu.Item as={Link} to="/" active>Home</Menu.Item>
                  <Menu.Item as={Link} to="/about">About</Menu.Item>
                  <Menu.Item as={Link} to="/contact">Contact</Menu.Item>
                  <Menu.Item position='right'>
                    <Button as={Link} to="/login" inverted={!fixed}>Log in</Button>
                    <Button as={Link} to="/signup" inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>Sign Up</Button>
                  </Menu.Item>
                </Container>
              </Menu>
            </Segment>
          </Visibility>
          <Container className="about-text" text>
          <Header as='h2'>About</Header>
          <p>This is a app designed to let the user speak in gifs and share with friends</p>
          </Container>
        </Responsive>
      )
    }
}

export default About;