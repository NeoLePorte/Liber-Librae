import React, { Component } from 'react';
import '../../css/App.css';
import DesktopContainer from '../Home/DesktopContainer.jsx'
import MobileContainer from '../Home/MobileContainer.jsx'

// eslint-disable-next-line 
import {
  Container,
  Header
} from 'semantic-ui-react';
class About extends Component {
    state = {}
  
    hideFixedMenu = () => this.setState({ fixed: false })
    showFixedMenu = () => this.setState({ fixed: true })
    
    render() {
      const ResponsiveContainer = ({ children }) => (
        <div>
          <DesktopContainer>{children}</DesktopContainer>
          <MobileContainer>{children}</MobileContainer>
        </div>
      )
  
      return (
        // <Responsive minWidth="767" > {...Responsive.onlyComputer} Responsive.onlyComputer needs work to fit all devices.
        <ResponsiveContainer>
            <Container className="about-text" text>
              <Header as='h2'>About</Header>
              <p>This is a app designed to let the user speak in gifs and share with friends</p>
            </Container>
        </ResponsiveContainer>
      )
    }
}

export default About;