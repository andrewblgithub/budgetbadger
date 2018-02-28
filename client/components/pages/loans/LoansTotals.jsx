import React, { Component } from 'react';
import { Box, Headline, Value, CurrencyIcon, Button, AddIcon } from 'grommet';
import AddLoanForm from './AddLoanForm.jsx';

const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};


class LoansOnDashboard extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      TotalLoanDebt: 0,
      AvgIntRate: 0,
      modalToggle: false,
      id: window.localStorage.getItem('user_id'),
    }
    this.handleTotals = this.handleTotals.bind(this);
    this.handleModal = this.handleModal.bind(this);
  }

  handleModal(){
    this.setState({
      modalToggle: !this.state.modalToggle,
    })
  }

  handleTotals(input){
    if(input.loans){
      let debtSum = 0;
      let intSum = 0;
      let payment = 0;
      let counter = 0;
      input.loans.map((loan) => {
        debtSum += loan.amount;
        intSum += loan.interest_rate;
        counter++;
      })
      if(counter > 0){
        intSum = intSum/counter;
      };
      this.setState({
        TotalLoanDebt: debtSum,
        AvgIntRate: intSum
      })
    }
  };

  componentWillReceiveProps(nextProps){
    this.handleTotals(nextProps);
  };

  render(){
    return(
      <div style={{width: "100%"}}>
        <Box align='center'
          justify='center'
          pad='large'
          colorIndex='light-2'>
          <Headline margin='none' align='center' style={{fontSize: "25px"}} >
            Loans
            <p />
          </Headline>
          <Value value={numberWithCommas(this.state.TotalLoanDebt)}
            icon={<CurrencyIcon />}
            label='Total Loan Debt'
            units='$' />
            <p />
          <Value value={this.state.AvgIntRate.toFixed(2)}
            icon={<CurrencyIcon />}
            label='Avg Interest Rate'
            units='%' />
          <p />
          <Button icon={<AddIcon />}
            onClick={this.handleModal}
            href='#' 
            align='right' 
            label='Add Loans'
            plain={true}/>
          { this.state.modalToggle && 
            <AddLoanForm handleModal={this.handleModal} 
              id={this.state.id}/>
          }
        </Box>
      </div>
    )
  }
};

module.exports = LoansOnDashboard;