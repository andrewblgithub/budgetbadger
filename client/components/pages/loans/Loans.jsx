import React, { Component } from 'react';
import LoansContainer from '../../containers/LoansContainer.jsx';
import AddLoanForm from './AddLoanForm.jsx';
import { Hero, Box, Heading, Image, Footer, Title, Paragraph, Anchor, Menu, Section, Headline, Legend, NumberInput, Columns, Value, CurrencyIcon, LinkUpIcon, LineChartIcon ,Split, Layer, Form, Header, FormFields, EditIcon, Button, FormField, TextInput, DateTime, AddIcon } from 'grommet';
import Chart, { Axis, Grid, Area, Bar, Base, Layers, Line, Marker, MarkerLabel, HotSpots } from 'grommet/components/chart/Chart';
import { amortizationSchedule } from 'amortization';
import LoanChart from './ChartLoans.jsx';
import AdvancedChart from './AdvancedChart.jsx';
import moment from 'moment';
import twix from 'twix';

const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

class Loans extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      chartPrincipal: [],
      chartOutstanding: [],
      chartDates: [],
      principal: 45000,
      payLevel: 850,
      interestRate: 8.5,
      term: 20,
      inception: 2017,
      totalInterestPaid: 0,
      totalPayment: 0,
      name: '',
      modalToggle: false,
      id: window.localStorage.getItem('user_id'),
      chartToggle: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleAmort = this.handleAmort.bind(this);
    this.handleLoan = this.handleLoan.bind(this);
    this.handleModal = this.handleModal.bind(this);
    this.toggleChart = this.toggleChart.bind(this);
  };

  toggleChart(){
    this.setState({
      chartToggle: !this.state.chartToggle
    })
  };

  handleAmort(){
    var amort = amortizationSchedule(this.state.principal, this.state.term, this.state.interestRate);
    var principal = [];
    var payments = [];
    var outstanding = [];
    var interest = [];

    amort.forEach((payment) => {
      principal.push(payment.principalBalanceRounded);
      payments.push(payment.payment);
      outstanding.push((this.state.principal - payment.principalBalanceRounded).toFixed(2));
      interest.push(payment.interestPayment);
    })

    var totalinterest = interest.reduce((a, b) => { return a + b });
    var totalPayment = totalinterest + this.state.principal;

    this.setState({
      chartPrincipal: principal,
      chartOutstanding: outstanding,
      payLevel: payments[0].toFixed(2),
      totalInterestPaid: totalinterest.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
    })
  };

  handleChange(e){
    e.preventDefault();
    if(e.target.value > 0.1){
      this.setState({
        [e.target.name]: parseFloat(e.target.value)
      }, () => {
        this.handleAmort();
      })
    } else {
      this.setState({
        [e.target.name]: ''
      })
    }
  };

  handleLoan(e){
    var currLoan = {};
    this.props.loans.forEach((loan) => {
      if(loan.id === parseInt(e.target.name)) {
        currLoan = loan;
      }
    });

    currLoan.datesArr = moment(currLoan.inception_date, "MM-DD-YYYY").twix(currLoan.end_date, {allDay: true}).toArray('months').map((date) => { return date.format('L') });
    
    this.setState({
      name: currLoan.name,
      principal: currLoan.amount,
      interestRate: currLoan.interest_rate,
      term: (new Date(currLoan.end_date).getFullYear() - new Date(currLoan.inception_date).getFullYear()),
      inception: new Date(currLoan.inception_date).getFullYear(),
      chartDates: currLoan.datesArr,
    }, () => {
      this.handleAmort();
    });
  };

  componentWillMount(){
    this.handleAmort();
    this.setState({
      chartDates: moment('1/31/2017', 'MM-DD-YYYY').twix('1/01/2037', {allDay: true}).toArray('months').map((date) => { return date.format('L') })
    })
  };

  handleModal(){
    this.setState({
      modalToggle: !this.state.modalToggle
    });
  };

  render(){
    return(
      <div>
        <Hero 
          style = {{marginTop: "-12px", marginBottom: "12px"}}
          background={<Image src={'https://www.collegemagazine.com/wp-content/uploads/2015/03/UW-Quad.jpg'}
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
                Loan Balance
              </Heading>
            </Box>
          </Box>
        </Hero>
        <Section pad='large' justify='center' align='center' colorIndex='light-2' >
          <Headline margin='none'>
            <Headline margin='none' style={{fontSize: "40px"}} align='center'>
              {this.state.name}
            </Headline>
            <Box direction='row'
              justify='start'
              align='center'
              wrap={true}
              pad='none'
              margin='small'>
              <Box direction='row'
                justify='start'
                align='left'
                wrap={true}
                pad='none'
                margin='small'>
                <Menu responsive={false}
                  label='Select Loan'
                  inline={false}
                  primary={true}
                  closeOnClick={true}
                  direction='row'
                  size='small'
                  align='left'>
                    {this.props.loans ? this.props.loans.map((loan) => {
                      return(
                        <Anchor name={loan.id} onClick={this.handleLoan}>
                        {loan.name}
                      </Anchor>
                      )
                    }) : ''}
                </Menu>
              </Box>
              <Box direction='row'
                justify='start'
                align='right'
                wrap={true}
                pad='none'
                margin='small'>
              <Button icon={<AddIcon />}
                onClick={this.handleModal}
                href='#' 
                align='right' 
                label='Add Loans'
                plain={true}/>
              <Button icon={<LineChartIcon />}
                onClick={this.toggleChart}
                href='#' 
                align='right'
                label='Advanced Chart'
                plain={true}/>
                </Box>
                { this.state.modalToggle && 
                  <AddLoanForm handleModal={this.handleModal} 
                    id={this.state.id}/>
                }
            </Box>
            <p />
            { this.state.chartToggle ? (
              <AdvancedChart principal={this.state.principal} 
              chartOutstanding={this.state.chartOutstanding} 
              chartPrincipal={this.state.chartPrincipal} 
              chartDates={this.state.chartDates}
              inception={this.state.inception} 
              term={this.state.term}
              name={this.state.name}/>
            ) : (
              <LoanChart principal={this.state.principal} 
                chartOutstanding={this.state.chartOutstanding} 
                chartPrincipal={this.state.chartPrincipal} 
                inception={this.state.inception} 
                term={this.state.term} />
            )}
          </Headline>
        </Section>
        <Split fixed={false}>
          <Box justify='center'
            align='center'
            pad='large'>
            <p />
            <Headline margin='none' style={{fontSize: "20px"}}>
              Loan Amount ($)
              <p />
              <NumberInput align='left' name='principal' value={this.state.principal} onChange={this.handleChange} step={1000}/>
            </Headline>
            <p />
            <Headline margin='none' style={{fontSize: "20px"}}>
              Annual Interest Rate (%)
              <p />
              <NumberInput align='left' name='interestRate' value={this.state.interestRate} onChange={this.handleChange} step={0.5}/>
            </Headline>
            <p />
            <Headline margin='none' style={{fontSize: "20px"}}>
              Loan Term (Years)
              <p />
              <NumberInput align='left' name='term' value={this.state.term} onChange={this.handleChange} />
            </Headline>
            </Box>
            <Box align='center'
              justify='center'
              pad='large'
              margin='large'
              colorIndex='light-2'>
              <Headline margin='none' align='center' style={{fontSize: "25px"}} >
                Over loan term
                <p />
              </Headline>
              <Value value={numberWithCommas(this.state.payLevel)}
                icon={<CurrencyIcon />}
                label='Monthly Payments'
                units='$' />
                <p />
              <Value value={numberWithCommas(this.state.totalInterestPaid)}
                icon={<CurrencyIcon />}
                label='Total Interest Paid'
                units='$' />
                <p />
              <Value value={numberWithCommas(this.state.totalPayment)}
                icon={<CurrencyIcon />}
                label='Total Payment'
                units='$' />
            </Box>
        </Split>
      </div>
    )
  }
};


module.exports = Loans;
