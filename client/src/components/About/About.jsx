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
              <p>Swine kevin landjaeger picanha. Shankle chicken swine kielbasa pork chop picanha brisket short ribs sirloin kevin landjaeger bresaola. Tenderloin turkey bacon ribeye boudin pork chop chicken pork belly biltong tongue, turducken short loin t-bone. Ball tip chuck pork chop prosciutto short ribs ribeye alcatra jowl fatback chicken. Cupim t-bone chicken corned beef meatloaf. Meatball shank beef ribs andouille beef drumstick prosciutto brisket picanha cupim frankfurter pig pastrami bresaola.</p>
            </Container>
        </ResponsiveContainer>
      )
    }
}

export default About;