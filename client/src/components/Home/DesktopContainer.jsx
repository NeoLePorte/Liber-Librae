import React, { Component } from 'react';
import HomepageHeading from './HomepageHeading';
// eslint-disable-next-line 
import { BrowserRouter as Router, Route, NavLink, Link, } from "react-router-dom";
import {withRouter} from 'react-router';
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
  constructor(props) {
    super(props)
    this.state = {}
  }
  
  componentDidMount() {
    this.headerToggle();
  }

    hideFixedMenu = () => this.setState({ fixed: false })
    showFixedMenu = () => this.setState({ fixed: true })
    headerToggle = () => this.props.location.pathname === '/' ? this.setState({ HeaderSmall: false }) : this.setState({ HeaderSmall: true })
    

    render() {
      const { children } = this.props;
      const { fixed, HeaderSmall} = this.state;
      
      return (
        // <Responsive minWidth="767" > {...Responsive.onlyComputer} Responsive.onlyComputer needs work to fit all devices.
        <Responsive minWidth="767" > 
          <Visibility once={false} onBottomPassed={this.showFixedMenu} onBottomPassedReverse={this.hideFixedMenu}>
            <Segment 
            inverted 
            textAlign='center' 
            style={HeaderSmall ? { maxHeight:100, padding: '1em 0em'} : { minHeight: 700, padding: '1em 0em' }} 
            vertical
            >
              <Menu
                fixed={fixed ? 'top' : null}
                inverted={!fixed}
                pointing={!fixed}
                secondary={!fixed}
                size='large'
              >
                <Container className="main-menu-links">
                
                  <Menu.Item 
                  as={NavLink}
                  exact
                  to="/"
                  content="Home"
                  />
                  <Menu.Item 
                  as={NavLink} 
                  to="/about"
                  content="About"/>

                  <Menu.Item 
                  as={NavLink} 
                  to="/contact"
                  content="Contact"/>

                  <Menu.Item position='right'>
                    <Button as={Link} to="/login" primary={fixed} style={{background: 'rgb(255, 21, 72)'}} inverted={!fixed}>Log in</Button>
                    <Button as={Link} to="/signup" inverted={!fixed} primary={fixed}  style={{ marginLeft: '0.5em', background: 'rebeccapurple' }}>Sign Up</Button>
                  </Menu.Item>
                </Container>
              </Menu>
              {!HeaderSmall ? <HomepageHeading /> : null}
            </Segment>
          </Visibility>
          {children}
        </Responsive>
      )
    }
  }
  export default withRouter(DesktopContainer);