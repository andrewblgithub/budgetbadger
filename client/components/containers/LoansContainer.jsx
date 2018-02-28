import React, { Component } from 'react';
import Loans from '../pages/loans/Loans.jsx';
import { graphql, withApollo, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { LOANS_QUERY } from '../../queries.js';


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
