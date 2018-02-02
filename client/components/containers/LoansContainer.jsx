import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loans from '../pages/Loans.jsx';
import { graphql, withApollo, compose } from 'react-apollo';
import gql from 'graphql-tag';

const LOANS_QUERY = gql`
  query LOANS_QUERY($user_id: Int!){
    getLoans(user_id: $user_id) {
      id
      name
      amount
      interest_rate
      inception_date
      end_date
    }
  }
`;


const withLoans = graphql(LOANS_QUERY, {
  options: (props) => ({
    variables: {
      user_id: window.localStorage.getItem('user_id')
    },
    name: 'AllUserLoans'
  })
})

class LoansContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      items: []
    }  
  }  
  
  render(){
    return(
      <div>
        <Loans loans={this.props.data.getLoans}/>
      </div>    
    )
  }  
};  

export default compose(withApollo, withLoans)(LoansContainer);
