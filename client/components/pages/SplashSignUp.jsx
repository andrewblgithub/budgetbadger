import React, { Component } from 'react';
import { Box, Button, Card, Columns, CheckBox, Form, FormFields, Footer, Header, Heading, Label, Paragraph, TextInput, Tiles } from 'grommet';
import { graphql, compose, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import Cookies from 'universal-cookie';

class SplashSignUp extends Component {
  constructor() {
    super()
    this.state = {
      user_email: '',
      password: ''
    }
    this._confirm = this._confirm.bind(this);
  }

  async _confirm() {
    const { user_email, password } = this.state;
    try {
      const result = await this.props.mutate({
        variables: {
          user_email,
          password,
        }
      })
      const user = {
        user_id: result.data.createUser[1],
        token: result.data.createUser[0]
      }
      const cookie = new Cookies();
      cookie.set('user', user, {path:'/'});
      window.location.reload()
    } catch(error) {
      console.log(error);
    }
  }

  render() {
    return (
      <Box align="center" focusable={true} >
        <Card align="center" style={{ outline: "#000 solid thin" }}> 
          <h1 style={{ textAlign: "center" }} >Sign Up</h1>
          <div style={{ outline: "#E8E8E8 solid thin" }}></div>
          <Form pad="small" style={{ width: "100%" }} >
                <Box pad={{ vertical: "small", width: "100%" }} >
                  <FormFields style={{ width: "100%" }} >
                      <Label>Email</Label>
                      <TextInput onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        this._confirm();
                      }
                    }} onDOMChange={e => this.setState({ user_email: e.target.value })}  style={{ width: "100%" }} name="userEmail" />
                      <Label>Password</Label>
                      <TextInput onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        this._confirm();
                      }
                    }} onDOMChange={e => this.setState({ password: e.target.value })} style={{ width: "100%" }} type="password" />
                  </FormFields>
                </Box>
                <Footer size="small" direction="column"
                  align={'center' ? 'stretch' : 'start'}
                  pad={{ vertical: "medium" }}>
                  <Button onClick={() => this._confirm()} primary={true} fill="center" label='Create account' />
                </Footer>
              </Form>
        </Card>
      </Box>
    )
  }
}

const CREATE_USER = gql`
  mutation createUser($user_email: String!, $password: String!) {
    createUser(email: $user_email, password: $password)
  }
`

export default graphql(CREATE_USER)(SplashSignUp);