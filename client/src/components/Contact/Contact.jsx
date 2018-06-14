import React, { Component } from 'react';
import DesktopContainer from '../Home/DesktopContainer.jsx'
import MobileContainer from '../Home/MobileContainer.jsx'
import {
    Segment,
    Header
  } from 'semantic-ui-react';

class Contact extends Component {
   render() {
    const ResponsiveContainer = ({ children }) => (
        <div>
          <DesktopContainer>{children}</DesktopContainer>
          <MobileContainer>{children}</MobileContainer>
        </div>
      )
       return(
        <ResponsiveContainer>
        <Header as='h2' attached='top'>
          Contact
        </Header>
        <Segment attached size="large" padded="very" textAlign="center" vertical >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
          laboris nisi ut aliquip ex ea commodo consequat.
        </Segment>
      </ResponsiveContainer>
       );
   }
}

export default Contact;