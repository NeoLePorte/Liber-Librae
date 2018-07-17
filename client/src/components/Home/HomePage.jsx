import React, { Component } from 'react';
import Form from '../Form';
// import SpeechToText from '../SpeechToText';
import BookList from '../BookList';
import DesktopContainer from './DesktopContainer';
import MobileContainer from './MobileContainer';

import '../../css/App.css';
import {
  Grid,
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
    render() {
        return (
          <ResponsiveContainer>
            <Segment className='list-container' style={{ padding: '8em 0em', overflowY: 'scroll', height: '80vh' }} vertical>
            <Grid celled='internally' columns='equal' stackable>
                <Grid.Row >
                  
                <Grid.Column  width={8}>
                {/* <SpeechToText /> */}
                <BookList 
                />
                </Grid.Column >

              <Grid.Column width={8}>
                <Form />
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