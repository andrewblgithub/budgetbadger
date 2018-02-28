import React, { Component } from 'react';
import {ACCOUNTS_QUERY} from '../../queries.js';
import Spinner from '../pages/Spinner.jsx';
import AccountsTable from '../pages/accounts/AccountsTable.jsx';
import AccountsTotals from '../pages/accounts/AccountsTotals.jsx';
import { graphql, compose, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import { Hero, Box, Heading, Image } from 'grommet';

class AccountsOverview extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    if (this.props.data.getAccounts) {
      return(
        <div>
          <Hero 
            style = {{marginTop: "-12px", marginBottom: "12px"}}
            background={<Image src={'https://image.freepik.com/free-photo/education-concept-student-studying-and-brainstorming-campus-concept-close-up-of-students-discussing-their-subject-on-books-or-textbooks-selective-focus_1418-627.jpg'}
            fit='cover'
            full={true} />}
            backgroundColorIndex='dark'
            size='small'>
            <Box direction='row'
              justify='center'
              align='center'>
              <Box basis='1/2'
                align='end'
                pad='medium' />
              <Box basis='1/2'
                align='start'
                pad='medium'>
                <Heading margin='none' style={{fontSize: "55px"}} >
                  Accounts Overview
                </Heading>
              </Box>
            </Box>
          </Hero>
          <AccountsTotals accounts={this.props.data.getAccounts} />
          <AccountsTable accounts={this.props.data.getAccounts} />
        </div>
      )
    } else {
      return (
        <Spinner />
      );
    }
  }
};

const withAccountsQuery = graphql(ACCOUNTS_QUERY, {
  options: (props) => ({
    variables: {
      user_id: window.localStorage.getItem('user_id')
    },
    name: 'Accounts Data'
  })
})

module.exports = compose(withApollo, withAccountsQuery)(AccountsOverview);