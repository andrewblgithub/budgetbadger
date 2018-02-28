import React, { Component } from 'react';
import Loans from '../containers/LoansContainer.jsx';
import {Tab, Tabs, Paragraph} from 'grommet';
import { Redirect, Route, Switch } from 'react-router-dom';
import TransactionContainer from '../containers/TransactionContainer.jsx';
import BillsContainer from '../containers/BillsContainer.jsx';
import AccountsOverview from '../containers/AccountsOverview.jsx';
import DashBoard from '../containers/Dashboard.jsx';
import Goals from '../containers/GoalsContainer.jsx';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navigate: false,
      activeIndex: null
    }
    this.indexChooser = {
      '/dashboard': 0,
      '/accounts': 1,
      '/transactions': 2,
      '/bills': 3,
      '/loans': 4,
      '/goals': 5,
      '/profile': 6
    }
  }
  componentWillMount() {
    this.setState({
      activeIndex: this.indexChooser[this.props.location.pathname]
    })
  }
  componentWillReceiveProps() {
    setTimeout(()=> {
      if (this.props.location.pathname === '/profile') {
        this.setState({
          activeIndex: 6
        })
      }
    }, 1)
  }
  render() {
    return (
      <div>
      <Tabs justify='center' activeIndex={this.state.activeIndex} >
        <Tab title='Dashboard' onClick={()=>{this.setState({activeIndex: 0})}} >
          <Redirect to='/' />
          <Route path='/' component={DashBoard} />
        </Tab>
        <Tab title='Accounts Overview' onClick={()=>{this.setState({activeIndex: 1})}} >
          <Redirect to='/accounts'/>
          <Route path='/accounts' component={AccountsOverview} />
        </Tab>
        <Tab title='Transactions' onClick={()=>{this.setState({activeIndex: 2})}}>
          <Redirect to='/transactions'/>
          <Route path='/transactions' component={TransactionContainer} />
        </Tab>
        <Tab title='Bills' onClick={()=>{this.setState({activeIndex: 3})}}>
          <Redirect to='/bills'/>
          <Route path='/bills' component={BillsContainer} />
        </Tab>
        <Tab title='Loans' onClick={()=>{this.setState({activeIndex: 4})}}>
          <Redirect to='/loans'/>
          <Route path='/loans' component={Loans} />
        </Tab>
        <Tab title='Goals' onClick={()=>{this.setState({activeIndex: 5})}}>
          <Redirect to='/goals'/>
          <Route path='/goals' component={Goals} />
        </Tab>
      </Tabs>
      
    </div>
    )
  }
}

export default Main;