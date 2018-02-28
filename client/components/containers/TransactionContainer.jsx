import React, { Component } from 'react';
import TransactionList from '../pages/transactions/TransactionList.jsx';
import Navigation from '../pages/transactions/Navigation.jsx';
import ActionsIcon from 'grommet/components/icons/base/Actions';
import { TRANS_ACC_QUERY, CREATE_TRANSACTION, NEW_BANK_QUERY, UPDATE_TRANSACTIONS, GET_USER_BALANCES } from '../../queries.js';
import HistoricalChartContainer from '../pages/transactions/Chart/HistoricalChartContainer.jsx';
import TransactionSummary from '../pages/transactions/TransactionSummary.jsx';
import Search from '../pages/transactions/Search.jsx';
import PieChart from '../pages/transactions/PieChart.jsx';
import SearchFilter from '../pages/transactions/SearchFilters.jsx';
import { Box, Split, Hero, Image, Heading, Menu, Anchor, Actions } from 'grommet';
import Spinner from '../pages/Spinner.jsx';
import sortingFuncs from '../pages/transactions/sortingFunctions.jsx';
import { graphql, compose, withApollo } from 'react-apollo';
import NewTransaction from '../pages/transactions/NewTransaction.jsx';
import SummaryChartContainer from '../pages/transactions/TransactionSummary.jsx';
import Modal from 'react-responsive-modal';
import gql from 'graphql-tag';

const withTransactionsAndAccounts = graphql(TRANS_ACC_QUERY, {
  options: (props) => ({
    variables: {
      user_id: window.localStorage.getItem('user_id'),
      id: window.localStorage.getItem('user_id')
    },
    name: 'TransactionsAndAccounts'
  })
})

const createNewTransaction = graphql(UPDATE_TRANSACTIONS, {
  options: (props) => ({
    variables: {
     user_id: window.localStorage.getItem('user_id')
    },
    name: 'createNewTransaction'
  })
})

const withMonthlyBalances = graphql(GET_USER_BALANCES, {
  options: (props) => ({
    variables: {
      id: window.localStorage.getItem('user_id')
    },
    name: 'getMonthlyBalances'
  })
})


class TransactionContainer extends Component {
  constructor() {
    super()
    this.state = {
      transactions: [],
      searchResult: [],
      categoryBreakdown: [],
      selected: 'All Debit & Credit',
      displayModal: false,
      displayNewTransaction: false,
      sorting: [false, false, false, false, false],
      sortIdx: 0,
      showForm: false,
      displaySummaryChart: false,
      displaySummary: false,
      summaryTransaction: {},
      summaryName: '',
      transactionForm: {
        name: '',
        category:'',
        amount: '',
        type: '',
        date:'YYYY-MM-DD',
        account: ''
      }
    }
    this.handleSummaryChart = this.handleSummaryChart.bind(this);
    this.filterTransactions = this.filterTransactions.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.generateCategories = this.generateCategories.bind(this);
    this.handleModal = this.handleModal.bind(this);
    this.sortTransactions = this.sortTransactions.bind(this);
    this.newTransaction = this.newTransaction.bind(this);
    this.handleForm = this.handleForm.bind(this);
    this.handleNewTransaction = this.handleNewTransaction.bind(this);
    this.handleSummary = this.handleSummary.bind(this);
  }


  // Filter transactions based on some provided parameter,
  // this is triggered when a user clicks an account, or account type
  // on the left-most sidebar
  filterTransactions(e, type) {
    let transactions;
    type === 'all' ?
    transactions = this.props.data.getTransactions :
    transactions = this.props.data.getTransactions.filter(transaction => {
      let acc;
      if (type === 'type') {
        acc = e.target.text === 'Debit' ? 'depository' : 'credit'
      } else {
        acc = e.target.text;
      }
      return transaction.account[0][type] === acc;
    })
    this.setState({
      transactions,
      selected: 'All ' + e.target.text
    }, () => this.generateCategories());
  }

  // This is used to render the pie chart, it simply groups all transactions based
  // on their category and returns an array of tuples including the category
  // name and the corresponding total spend
  generateCategories() {
    let columns = [];
    const breakdown = this.state.transactions.reduce((a, b) => {
      a[b.category] ? a[b.category] += b.amount : a[b.category] = b.amount;
      return a;
    }, {});
    for (let pair in breakdown) {
      columns.push([pair, breakdown[pair]])
    }
    this.setState({ categoryBreakdown: columns });
  }

  handleSearch(searchString) {
    const { transactions } = this.state;
    const searchResult = transactions.filter(transaction => {
      return transaction.name.includes(searchString);
    });

    this.setState({
      transactions: searchResult
    });
  }

  handleSummaryChart(transaction = {}) {
    this.setState({
      displaySummaryChart: !this.state.displaySummaryChart,
      summaryTransaction: transaction
    })
  }

  handleSummary(transaction = {}) {
    this.setState({
      displaySummary: !this.state.displaySummary,
      summaryTransaction: transaction
    }, () => console.log(this.state))
  }


  handleModal(e) {
    e.preventDefault();
    this.setState({
      displayModal: !this.state.displayModal
    });
  }

  handleNewTransaction(e) {
    e.preventDefault();
    this.setState({
      displayNewTransaction: !this.state.displayNewTransaction
    }, () => console.log('state', this.state.displayNewTransaction));
  }

  handleSearch(searchString) {
    const transactions = this.state.transactions;
    const searchResult = transactions.filter(transaction => {
      return transaction.name.includes(searchString);
    });

    this.setState({
      transactions: searchResult
    })
  }

  handleForm(e, value) {
    let field = e.target ? e.target.name : e;
    let form = this.state.transactionForm;
    form[field] = e.target ? e.target.value : value;
    this.setState({
      transactionForm: form,
    })
  }

  componentWillReceiveProps(nextProps) {
    console.log('props', nextProps)
    if (nextProps.data.getTransactions) {
      const transactions = nextProps.data.getTransactions.sort((a,b) => {
        return new Date(b.date) - new Date(a.date)
      })
      this.setState({
        transactions
      },() => this.generateCategories())
    }
  }


  // Dynamically sorts transactions when a user clicks on a specific table header
  sortTransactions(index, direction) {
    const { transactions, sorting } = this.state;
    const labels = ['date', 'type', 'category','name', 'amount'];
    const label = labels[index];
    const directionS = sorting[index];
    sorting[index] = !directionS;
    const sorted = transactions.sort((a, b) => {
      const a1 = a[label] || a;
      const b1 = b[label] || b;
      return sortingFuncs[label](a1, b1, directionS)
    })
    this.setState({
      sortIdx: index,
      sorting,
      transactions:sorted
    })

  }

  async newTransaction(e) {
    e.preventDefault()
    const variables = this.state.transactionForm;
    variables.account_id = this.props.data.getAccounts[variables.account.slice(0, variables.account.indexOf('.'))].id
    variables.amount = Number(variables.amount);
    variables.type = this.props.data.getAccounts[variables.account.slice(0, variables.account.indexOf('.'))].type
    variables.user_id = window.localStorage.getItem('user_id')
    const transaction = await this.props.createNewTransaction({variables});
    console.log(transaction)
    const { transactions } = this.state
    transactions.unshift(variables);
    this.setState({
      transactionForm: {
        name: '',
        category:'',
        amount: '',
        type: '',
        date:'YYYY-MM-DD',
        account: ''
      }
    })
  }



  render() {
    const { displayModal } = this.state;
    if (this.props.data.getAccounts) {
      return (
        <div>
          <Hero 
            style = {{marginTop: "-12px", marginBottom: "12px"}}
            background={<Image src={'https://1dib1q3k1s3e11a5av3bhlnb-wpengine.netdna-ssl.com/wp-content/uploads/2017/08/NYC-aerial-view.jpg'}
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
                  Transactions
                </Heading>
              </Box>
            </Box>
          </Hero>
          <div style={{paddingLeft: "10px", paddingRight: "10px"}}>
            <HistoricalChartContainer
              balances={this.props.data.getUser[0].accounts}
              accounts={this.props.data.getAccounts}
              transactions={this.state.transactions}
              summaryTransaction={this.state.summaryTransaction}
              categories={this.state.categoryBreakdown}
              handleSummaryChart={this.handleSummaryChart}
              displaySummary={this.state.displaySummaryChart}
              summaryName={this.state.summaryName}/>
              <TransactionSummary
                transactions={this.state.transactions}
                summaryTransaction={this.state.summaryTransaction}
                display={this.state.displaySummary}
                handleSummary={this.handleSummary}
              />
            <PieChart
              breakdown={this.state.categoryBreakdown}
              handleClose={this.handleModal}
              displayModal={displayModal} />
            <Split
              fixed={false}
              separator={false}
              showOnResponsive='both'
              flex="right"
              priority="right">
              <Box>
                <h2>{this.state.selected}</h2>
                <Navigation accounts={this.props.data.getAccounts} filter={this.filterTransactions}/>
              </Box>
              <Box align="left">
                <Box flex={true}
                      justify='end'
                      direction='row'
                      responsive={false}>
                  <Search inline={true} transactions={this.state.transactions} search={this.handleSearch}/>
                  <Menu icon={<ActionsIcon/>}
                    dropAlign={{"right": "right"}}>
                    <Anchor onClick={this.handleModal}
                      className='active'>
                      Category Breakdown
                    </Anchor>
                    <Anchor onClick={this.handleSummaryChart}>
                      Transaction Chart
                    </Anchor>
                    <Anchor onClick={this.handleNewTransaction}>
                      New Transaction
                    </Anchor>
                  </Menu>
                </Box>
                <NewTransaction
                  handleForm={this.handleForm}
                  accounts={this.props.data.getAccounts}
                  submitForm={this.newTransaction}
                  displayNewTransaction={this.state.displayNewTransaction}
                  handleNewTransaction={this.handleNewTransaction}
                  form={this.state.transactionForm}/>
                <TransactionList
                  displaySummary={this.handleSummary}
                  sort={this.sortTransactions}
                  sortIdx={this.state.sortIdx}
                  dir={this.state.sorting[this.state.sortIdx]}
                  transactions={this.state.transactions}
                />
              </Box>
            </Split>
          </div>
        </div>
      )
    } else {
      return (
        <Spinner />
      )
    }
  }
}
export default compose(withApollo, graphql(CREATE_TRANSACTION, {name: 'createNewTransaction'}), withTransactionsAndAccounts)(TransactionContainer);