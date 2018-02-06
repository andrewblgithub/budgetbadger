import React, { Component } from 'react';
import { graphql, compose, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import Bank from './BankContainer.jsx';
import ProfileCard from './ProfileCard.jsx';
import ProfileEdit from './ProfileEdit.jsx';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { App, Header, Section, Footer, Article, Title, Box, Paragraph, Menu, Anchor, Card } from 'grommet';

class Profile extends Component {
  constructor() {
    super()
    this.state = {
      first_name: "User",
      last_name: "Name",
      street: "782 West 44th St.",
      city: "New York",
      state: "New York",
      zip_code: "13281",
      phone: "(123)456-7890",
      email: "someuser4@email.com",
      banks: ["J.P. Morgan and Chase", "TD Bank", "Citi Bank", "Bank of America", "Wells Fargo"],
      edit: false
    }
    this.editUserInfo = this.editUserInfo.bind(this);
  }

  componentDidMount() {
    const GET_USER = gql`
      query getUser($user_email: String) {
        up(email: $user_email, password: $password)
      }
    `
  }

  editUserInfo() {
    this.setState({
      edit: true
    })
  }

  render() {
    return (
      <div>
        {this.state.edit ? <ProfileEdit userInfo={this.state} /> : <ProfileCard userInfo={this.state}  editing={this.editing} />}
      </div>
    )
  }
}

export default Profile;