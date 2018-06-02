import React, { Component } from 'react';
import HomepageHeading from './HomepageHeading';
// eslint-disable-next-line 
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {
  Button,
  Container,
  Menu,
  Responsive,
  Segment,
  Visibility,
} from 'semantic-ui-react';

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
                  <Menu.Item as={Link} to="/" active>Home</Menu.Item>
                  <Menu.Item as={Link} to="/about">About</Menu.Item>
                  <Menu.Item as={Link} to="/contact">Contact</Menu.Item>
                  <Menu.Item position='right'>
                    <Button as={Link} to="/login" inverted={!fixed}>Log in</Button>
                    <Button as={Link} to="/signup" inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>Sign Up</Button>
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
  export default DesktopContainer;