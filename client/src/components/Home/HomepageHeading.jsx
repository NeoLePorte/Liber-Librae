import React from 'react';
import '../../css/App.css';
import {
  Container,
  Header,
} from 'semantic-ui-react/dist/commonjs'



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
    </Container>
  )

  export default HomepageHeading;