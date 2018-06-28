import React from 'react'
import DesktopContainer from './Home/DesktopContainer.jsx'
import MobileContainer from './Home/MobileContainer.jsx'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

const ResponsiveContainer = ({ children }) => (
    <div>
      <DesktopContainer>{children}</DesktopContainer>
      <MobileContainer>{children}</MobileContainer>
    </div>
  )

const LoginForm = () => (
<ResponsiveContainer>
  <div className='login-form'>
    <Grid textAlign='center' style={{ height: '100%', paddingTop: '10em' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='smoke' textAlign='center'>
           Log-in to your account
        </Header>
        <Form size='large'>
          <Segment stacked>
            <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
            />

            <Button color='purple' fluid size='large'>
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          New to us? <a href='#'>Sign Up</a>
        </Message>
      </Grid.Column>
    </Grid>
  </div>
</ResponsiveContainer>
)

export default LoginForm