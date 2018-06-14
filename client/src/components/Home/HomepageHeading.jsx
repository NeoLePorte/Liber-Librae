import React from 'react';
import '../../css/App.css';
import {
  Button,
  Container,
  Header,
  Icon,
} from 'semantic-ui-react'



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
      {/* <Button color='teal' inverted size='huge'>
        Get Started
        <Icon name='right arrow' />
      </Button> */}
    </Container>
  )

  export default HomepageHeading;