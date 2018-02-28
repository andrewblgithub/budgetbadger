import React, { Component } from 'react';
import { graphql, compose, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import Bank from './BankContainer.jsx';
import ProfileCard from './ProfileCard.jsx';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { App, Header, Section, Footer, Article, Title, Box, Paragraph, Menu, Anchor, Card, TextInput } from 'grommet';

const Get_User = gql`
  query GETUSER($id: Int!) {
    getUser(id: $id) {
      first_name
      last_name
      email
      street
      state
      city
      zip_code
      phone
    }
  }
`

const UPDATE_USER = gql`mutation
  updateUser($id: Int!, $email: String, $first_name: String, $last_name: String, $city: String, $street: String, $zip_code: String, $state: String, $phone: String) {
   updateUser(id: $id, email: $email, first_name: $first_name, last_name: $last_name, city: $city, street: $street, zip_code: $zip_code, state: $state, phone: $phone) {
     id
 }
}`

const currentUser = graphql(Get_User, {
  options: props => ({
    variables: {
      id: window.localStorage.getItem('user_id')
    },
    name: 'currentUser',
  })
})

class Profile extends Component {
  constructor() {
    super()
    this.state = {
      id: window.localStorage.getItem('user_id'),
      first_name: '',
      last_name: '',
      street: '',
      state: '',
      zip_code: '',
      phone: '',
      email: '',
      banks: ["J.P. Morgan and Chase", "TD Bank", "Citi Bank", "Bank of America", "Wells Fargo"],
      editName: false,
      editLastName: false,
      editAddress: false,
      editEmail: false,
      editPhone: false
    }
    this.turnOffEditing = this.turnOffEditing.bind(this);
    this.handleFormChanges = this.handleFormChanges.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.editName = this.editName.bind(this);
    this.editLastName = this.editLastName.bind(this);
    this.editAddress = this.editAddress.bind(this);
    this.editEmail = this.editEmail.bind(this);
    this.editPhone = this.editPhone.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data.getUser.length) {
      this.setState({
        first_name: nextProps.data.getUser[0].first_name,
        last_name: nextProps.data.getUser[0].last_name,
        street: nextProps.data.getUser[0].street,
        state: nextProps.data.getUser[0].state,
        zip_code: nextProps.data.getUser[0].zip_code,
        phone: nextProps.data.getUser[0].phone,
        email: nextProps.data.getUser[0].email
      })
    }
  }

  editName() {
    this.setState({
      editName: !this.state.editName
    })
  }

  editLastName() {
    this.setState({
      editLastName: !this.state.editLastName
    })
  }

  editAddress() {
    this.setState({
      editAddress: !this.state.editAddress
    })
  }

  editEmail() {
    this.setState({
      editEmail: !this.state.editEmail
    })
  }

  editPhone() {
    this.setState({
      editPhone: !this.state.editPhone
    })
  }

  turnOffEditing() {
    let editing = this.state;
    for (let i in editing) {
      if (editing[i] === true) {
        editing[i] = false;
      }
    }
    this.setState({
      edit: editing
    })
  }

  handleFormChanges(e) {
    let key = e.target.name;
    let oldState = this.state;
    oldState[key] = e.target.value;
    this.setState({
      oldState
    })
  }

  handleSubmit(e) {
    // e.preventDefault();
    const user_id = window.localStorage.getItem('user_id')
    
    this.props.updateUserProfile({
      variables:
      this.state,
      user_id
    }, this.turnOffEditing()).then(() => {
      window.location.reload();
    })
  }

  render() {
    return (
      <div>
        <ProfileCard userInfo={this.state}
          handleForm={this.handleFormChanges}
          handleSubmit={this.handleSubmit}
          editName={this.editName}
          editAddress={this.editAddress}
          editEmail={this.editEmail}
          editPhone={this.editPhone}
          turnOffEditing={this.turnOffEditing}
         />
      </div>
    )
  }
}

export default compose(withApollo, graphql(UPDATE_USER, {name: "updateUserProfile"}), currentUser)(Profile);



