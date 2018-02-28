import React, { Component } from 'react';
import { graphql, compose, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import Bank from './BankContainer.jsx';
import { App, Header, Section, Footer, Article, Title, Box, Paragraph, Menu, Anchor, Card, TextInput, FormField } from 'grommet';

class ProfileEdit extends Component {
  constructor({userInfo}) {
    super({userInfo})
    this.state = {
      first_name: userInfo.first_name,
      last_name: userInfo.last_name,
      street: userInfo.street,
      city: userInfo.city,
      state: userInfo.state,
      zip_code: userInfo.zip_code,
      phone: userInfo.phone,
      email: userInfo.email,
      banks: userInfo.banks
    }
    this.updateFirstName = this.updateFirstName.bind(this);
    this.updateLastName = this.updateLastName.bind(this);
    this.updateStreet = this.updateStreet.bind(this);
    this.updateCity = this.updateCity.bind(this);
    this.updateZipCode = this.updateZipCode.bind(this);
    this.updateEmail = this.updateEmail.bind(this);
    this.updatePhone = this.updatePhone.bind(this);
    this.submitChanges = this.submitChanges.bind(this);
  }

updateFirstName(e) {
  this.setState({
    first_name: e.target.value
  });
}

updateLastName(e) {
  last_name: e.target.value
}

updateStreet(e) {
  street: e.target.value
}

updateCity(e) {
  city: e.target.value
}

updateState(e) {
  state: e.target.value
}

updateZipCode(e) {
  zip_code: e.target.value
}

updateEmail(e) {
  email: e.target.value
}

updatePhone(e) {
  phone: e.target.value
}

submitChanges() {

}

  render() {
    return (
      <Box full={true} align="center" pad="large" flex={true}>
        <Card label="User Info" alignSelf="center" style={{ height: "100%", width: "100%", outline: "#000 solid thin" }} >
          <div style={{ outline: "#E8E8E8 solid thin" }}></div>
          <Box full={true} direction="row" align="center" pad={{ between: "small"}} margin="small" >
            <Box size={{ height: "medium", width: "large" }} style={{ display: "inline" }} direction="column" pad={{ between: "small" }} >
              <Card label="Name" size={{ height: "medium", width: "medium" }} style={{ display: "inline-block" }} colorIndex="light-2" margin={{ horizontal: "small" }}>
                
                <Box pad={{ between: "small" }}>
                  <FormField>
                      <input onDOMChange={this.updateFirstName} defaultValue={this.state.first_name}/>
                      <input onDOMChange={this.updateLastName} defaultValue={this.state.last_name}/>
                  </FormField>
                </Box>
              </Card>
              <Card label="Address" size={{ height: "medium", width: "medium" }} style={{ display: "inline-block" }} colorIndex="light-2" margin={{ horizontal: "small" }}>
              
                <FormField>
                  <input onDOMChange={this.updateStreet} defaultValue={this.state.street}/>
                  <input onDOMChange={this.updateCity} defaultValue={`${this.state.city},`}/>
                  <input onDOMChange={this.updateState} defaultValue={this.state.state}/>
                  <input onDOMChange={this.updateZipCode} defaultValue={this.state.zip_code}/>
                </FormField>
              </Card>
              <Card wrap={true} label="Email" size={{ height: "medium", width: "medium" }} style={{ display: "inline-block" }} colorIndex="light-2" margin={{ horizontal: "small" }}> 
                     
                <input onDOMChange={this.updateEmail} defaultValue={this.state.email}/>
              </Card>
              <Card label="Phone" size={{ height: "medium", width: "medium" }} style={{ display: "inline-block" }} colorIndex="light-2" margin={{ horizontal: "small" }}>
              
                <input onDOMChange={this.updatePhone} defaultValue={this.state.phone}/>
              </Card>
            </Box>
            <Card label="Accounts" size={{ height: "medium", width: "medium" }} style={{ display: "inline" }} colorIndex="light-2" margin={{ vertical: "small", horizontal: "small" }}>
            
              <Paragraph margin="small">
                <Bank banks={this.state.banks} />
              </Paragraph>
            </Card>
          </Box>
        </Card>
        <button onClick={this.submitChanges} >Submit Changes</button>
      </Box>
    )
  }
}

const UPDATE_USER = gql`
mutation updateUser($user_email: String) {
  updateUser(email: $user_email, password: $password)
}
`

export default graphql(UPDATE_USER)(ProfileEdit);
