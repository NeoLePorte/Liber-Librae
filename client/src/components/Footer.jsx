import React from 'react';
import '../css/App.css';
import {
    Container,
    Grid,
    Header,
    List,
    Segment,
  } from 'semantic-ui-react';
  
const Footer = () => (

    <Segment className='footer' stacked inverted vertical style={{ padding: '5em 0em' }}>
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
                <Grid.Column width={7}>
                <Header as='h4' inverted>Footer Header</Header>
                <p>Blahrg</p>
                </Grid.Column>
            </Grid.Row>
            </Grid>
        </Container>
    </Segment>
)
export default Footer;

