import React, { Component } from 'react';
import {Tiles, Tile, Box, Split} from 'grommet';
import TransactionList from '../pages/transactions/TransactionList.jsx';
import BillsDueTable from '../pages/bills/BillsDueTable.jsx';
import BillsSummary from '../pages/bills/BillsSummary.jsx';
import AccountDashboard from '../pages/accounts/AccountDashboard.jsx'
import LoansOnDashboard from '../pages/loans/LoansTotals.jsx';
import BillsOnDashboard from '../pages/bills/BillsOnDashboard.jsx';
import GoalDashboard from '../pages/goals/GoalDashboard.jsx';
import Spinner from '../pages/Spinner.jsx'
import Loans from './LoansContainer.jsx'
import { graphql, compose, withApollo } from 'react-apollo'
import { DASH_QUERY, UPDATE_TRANSACTIONS } from '../../queries.js';
import gql from 'graphql-tag';

const withDashQuery = graphql(DASH_QUERY, {
  options: (props) => ({
    variables: {
      user_id: window.localStorage.getItem('user_id')
    },
    name: 'Dashboard Data'
  })
})

const withUpdateTransactions = graphql(UPDATE_TRANSACTIONS, {
  options: (props) => ({
    variables: {
      user_id: window.localStorage.getItem('user_id')
    },
    name: 'UpdateTransactions Data'
  })
})

class DashBoard extends React.Component {
  
  constructor(props){
    super(props)
    this.state = {
    }
  }

  componentWillMount() {
    this.props.mutate({
      variables: {user_id: window.localStorage.getItem('user_id')}
    })
  }

  render(){
    if (this.props.data.getBillPaymentHistory) {
      var unpaidBills = this.props.data.getBillPaymentHistory
        .filter(bill => !bill.paid && bill.bills[0].bill_status)
        .sort((a,b) => {return new Date(a.due_date) - new Date(b.due_date)})
      var billsDue = <BillsOnDashboard unpaidBills={unpaidBills} />
    } else {
      var billsDue = <Spinner/>
    }

    if (this.props.data.getAccounts) {
      var totalBalance = <AccountDashboard accounts={this.props.data.getAccounts} />
    } else {
      var totalBalance = <Spinner />
    }


    return(
      <div>
        <Split showOnResponsive='both' flex='right' >
          <Box style={{width: "30vw"}}>
            <Tiles flush={false}
            fill={true}>
              <Tile>
                {totalBalance}
              </Tile>
              <Tile>
                <LoansOnDashboard loans={this.props.data.getLoans} />
              </Tile>
            </Tiles>
          </Box>
          <Box>
            <Tiles flush={false}
            fill={true}>
              <Tile>
                {billsDue}
              </Tile>
              <Tile>
                <GoalDashboard goals={this.props.data.getGoals}/>
              </Tile>
            </Tiles>
          </Box>
        </Split>
      </div>
    )
  }
};

export default compose(withApollo, withDashQuery, withUpdateTransactions)(DashBoard);
