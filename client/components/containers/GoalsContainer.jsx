import React, { Component } from 'react';
import Spinner from '../pages/Spinner.jsx'
import MonthlyBudgetTable from '../pages/goals/MonthlyBudgetTable.jsx'
import Goals from '../pages/goals/Goals.jsx'
import GoalHistory from '../pages/goals/GoalHistory.jsx'
import GoalForm from '../pages/goals/GoalForm.jsx'
import { graphql, compose, withApollo } from 'react-apollo'
import {GOALS_QUERY, CREATE_GOAL} from '../../queries.js';
import { Hero, Box, Image, Heading } from 'grommet';

class GoalsContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      goalIndex: 0,
      chartActive: false
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.hideChart = this.hideChart.bind(this)
  }

  handleClick(e) {
    this.setState({
      goalIndex: e,
      chartActive: true
    })
  }

  hideChart() {
    this.setState({
      chartActive: false
    })
  }

  handleSubmit(goalProperties) {
    goalProperties.user_id = window.localStorage.getItem('user_id')
    // replace account names with account id
    let fullAccounts = this.props.data.getAccounts
    for (let i = 0; i < goalProperties.accounts.length; i++) {
      for (let k = 0; k < goalProperties.accounts.length; k++) {
        if (goalProperties.accounts[i] === fullAccounts[k].bank_name) {
          goalProperties.accounts[i] = fullAccounts[k].id
        }
      }
    }
    console.log(goalProperties)
    this.props.CREATE_GOAL({
      variables: goalProperties
    })
  }

  render(){
    let goalProgress = null
    let goal = null
    if (this.props.data.getGoals && this.props.data.getGoals.length > 0) {
      goalProgress = this.props.data.getGoals[this.state.goalIndex].goal_progress
      goal = this.props.data.getGoals[this.state.goalIndex]
    }
    let accounts = []
    let categories = []
    if (this.props.data.getAccounts) {
      accounts = this.props.data.getAccounts.map(account => {
        return account.bank_name
      })
      categories = [...new Set(this.props.data.getTransactions.map(transaction => {
        return transaction.category
      }))]
    }
    return(
      <div>
        <Hero 
          style = {{marginTop: "-12px", marginBottom: "12px"}}
          background={<Image src={'https://www.goalcast.com/wp-content/uploads/2017/08/racing-through-life.jpg'}
          fit='cover'
          full={true}
          height='50%'
          />}
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
                Goals
              </Heading>
            </Box>
          </Box>
        </Hero>
        <GoalForm 
          handleSubmit = {this.handleSubmit}
          accounts = {accounts}
          categories = {categories}
        />
        <Goals goals={this.props.data.getGoals} handleClick={this.handleClick} />
        <GoalHistory goal={goal} goalProgress={goalProgress} chartActive={this.state.chartActive} hideChart={this.hideChart} />
      </div>
    )
  }
};

const withGoalsQuery = graphql(GOALS_QUERY, {
  options: (props) => ({
    variables: {
      user_id: window.localStorage.getItem('user_id')
    },
    name: 'Goals Data'
  })
})

module.exports = compose(withApollo, withGoalsQuery, graphql(CREATE_GOAL, {name: 'CREATE_GOAL'}))(GoalsContainer);