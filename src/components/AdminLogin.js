import React from 'react';
import { Button,  Form, Grid, Header, Image,Segment } from 'semantic-ui-react';
import elf from '../images/elf-icon.png'
const AdminLogin = (props)=>{
    return(
      <div>
        <div className='login-form'>
          <style>{`body > div,body > div > div,body > div > div > div.login-form {  height: 100%;}`}
          </style>
          <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as='h2' color='teal' textAlign='center'>
                <Image src={elf} /> <strong>Log in to your account</strong>
              </Header>
              <Form size='large' onSubmit={props.handleLoginSubmit}>
                <Segment stacked>
                  <strong>Username:</strong>
                  <Form.Input fluid icon='user' iconPosition='left' type='text' name='usernameInput' onChange={props.handleInputLogin} required placeholder="username" />
                  <strong>Password:</strong>
                  <Form.Input  fluid  icon='lock' iconPosition='left'  type='password'
                    name='passwordInput' onChange={props.handleInputLogin} required placeholder='password'  />
                  <Button color='teal' fluid size='large' type='submit' value='Log In' className="ui button positive">
                    <strong>Login</strong>
                  </Button>
                </Segment>
              </Form>
            </Grid.Column>
          </Grid>
        </div>
        </div>
    )
}
export default AdminLogin;
