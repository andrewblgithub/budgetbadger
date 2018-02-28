import React, { Component } from 'react';
import { Anchor, Box, Button, Paragraph, TextInput } from 'grommet';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { BrowserRouter, Route, Link } from 'react-router-dom';

class PasswordRecoveryModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user_email: ''
    }
    this.sendEmail = this.sendEmail.bind(this);
  }

  sendEmail() {
    if (this.state.user_email.length <= 0) {
      window.alert('Enter an email before you try submitting');
      return
    } else {
      this.props.mutate({
        variables: { email: this.state.user_email }
      })
    }
    return
  }

  render() {
    return (
      <Box full={false} alignSelf="center" pad="small" size={{ height: "medium", width: "medium" }} pad="medium">
        <Paragraph align="center">Please enter your email in the form below, and we'll send you a special link to reset your password.</Paragraph>
        <Paragraph align="center">Please be mindful that the link will only be active for 15 minutes after you've opened it</Paragraph>
        <TextInput name="userEmail" onDOMChange={e => {
              this.setState({user_email: e.target.value})
            }
          } />
        <Box size={{ height: "10%", width: "15%" }} alignSelf="center" margin={{ top: "medium" }} >
          <Button label='Submit'
            href='#'
            primary={false}
            secondary={false}
            accent={false}
            critical={false}
            plain={false}
            onClick={this.sendEmail} />
        </Box>
      </Box>
    )
  }
}

const Recover_Password = gql`
  mutation RECOVERPASSWORD($email: String!) {
    getPasswordRecoveryEmail(email: $email) {
      first_name
      email
    }
  }
`

export default compose(graphql(Recover_Password))(PasswordRecoveryModal);