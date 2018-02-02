import React, { Component } from 'react';
import LoansContainer from '../containers/LoansContainer.jsx';
import { Hero, Box, Heading, Image, Footer, Title, Paragraph, Anchor, Menu, Section, Headline, Legend, NumberInput, Columns, Value, CurrencyIcon, LinkUpIcon, Split, Layer, Form, Header, FormFields, EditIcon, Button, FormField, TextInput, DateTime } from 'grommet';
import Chart, { Axis, Grid, Area, Bar, Base, Layers, Line, Marker, MarkerLabel, HotSpots } from 'grommet/components/chart/Chart';
import { amortizationSchedule } from 'amortization';

// console.log(amortizationSchedule(100000, 20, 8.5))

const precisionRound = (number, precision) => {
  var factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
};

const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

class Loans extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      chartPrincipal: [],
      chartOutstanding: [],
      principal: 45000,
      payLevel: 850,
      interestRate: 8.5,
      term: 20,
      inception: 2017,
      totalInterestPaid: 0,
      totalPayment: 0,
      name: '',
      modalToggle: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleAmort = this.handleAmort.bind(this);
    this.handleLoan = this.handleLoan.bind(this);
    this.handleModal = this.handleModal.bind(this);
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
      outstanding.push(this.state.principal - payment.principalBalanceRounded);
      interest.push(payment.interestPayment);
    })

    var totalinterest = interest.reduce((a, b) => { return a + b });
    var totalPayment = totalinterest + this.state.principal;

    this.setState({
      chartPrincipal: principal,
      chartOutstanding: outstanding,
      payLevel: payments[0],
      totalInterestPaid: precisionRound(totalinterest, 2),
      totalPayment: precisionRound(totalPayment, 2)
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
    e.preventDefault();
    // console.log(this.props.loans);
    var currLoan = {};
    this.props.loans.forEach((loan) => {
      if(loan.id === parseInt(e.target.name)) {
        currLoan = loan;
      }
    });
    this.setState({
      name: currLoan.name,
      principal: currLoan.amount,
      interestRate: currLoan.interest_rate,
      term: (new Date(currLoan.end_date).getFullYear() - new Date(currLoan.inception_date).getFullYear()),
      inception: new Date(currLoan.inception_date).getFullYear()
    }, () => {
      this.handleAmort();
    });
  };

  componentWillMount(){
    this.handleAmort();
  };

  handleModal(e){
    e.preventDefault();
    this.setState({
      modalToggle: !this.state.modalToggle
    });
  };

  render(){
    console.log('props', this.props)
    return(
      <div>
        <Hero background={<Image src={'https://www.collegemagazine.com/wp-content/uploads/2015/03/UW-Quad.jpg'}
          fit='cover'
          full={true} />}
          backgroundColorIndex='dark'>
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
              <Button icon={<EditIcon />}
                onClick={this.handleModal}
                href='#' 
                align='right'/>
                </Box>
                { this.state.modalToggle &&
                  <Layer closer={true} overlayClose={false} onClose={this.handleModal}>
                    <Form style={{padding:'10%'}}>
                      <Header>
                        <Heading>
                          Add New Loans
                        </Heading>
                      </Header>
                      <FormFields>
                        <FormField label='Loan Name'>
                          <TextInput />
                        </FormField>
                        <p />
                        <FormField label='Prinicipal Amount ($)'>
                          <TextInput />
                        </FormField>
                        <p />
                        <FormField label='Interest Rate (%)'>
                          <TextInput />
                        </FormField>
                        <p />
                      <FormField label='Inception Date'>
                        <DateTime id='id'
                          name='inception'
                          format='M/YYYY'
                          step={5}
                          value='5/2015' />
                      </FormField>
                      <FormField label='End Date'>
                        <DateTime id='id'
                          name='end'
                          format='M/YYYY'
                          step={5}
                          value='5/2015' />
                      </FormField>
                      </FormFields>
                      <Footer pad={{"vertical": "medium"}}>
                        <Button label='Submit'
                          type='submit'
                          primary={true}
                          onClick={this.handleModal} />
                      </Footer>
                    </Form>
                  </Layer>
                }
            </Box>
            <p />
            <Chart style={{fontSize: "20px"}} full={true}>
              <Axis count={5}
                labels={[{"index": 2, "label": "$" + this.state.principal/2}, {"index": 4, "label": "$" + this.state.principal}]}
                vertical={true} />
              <Chart vertical={true} full={true}>
                <Base height='small'
                  width='large' />
                <Layers>
                  <Grid rows={10}
                    columns={3} />
                  <Area values={this.state.chartOutstanding}
                    colorIndex='graph-1'
                    points={true}
                    activeIndex={-1} 
                    max={this.state.principal} />
                  <Line values={this.state.chartPrincipal}
                    colorIndex='accent-1'
                    points={true}
                    activeIndex={-1} 
                    max={this.state.principal}/>
                </Layers>
                <Axis count={3}
                  labels={[{"index": 0, "label": this.state.inception}, {"index": 1, "label": Math.floor(this.state.inception + this.state.term/2)}, {"index": 2, "label": this.state.inception + this.state.term}]} />
                <Legend style={{fontSize: "20px"}} series={[{"label": "Total Paid", "colorIndex": "graph-1"}, {"label": "Balance Outstanding", "colorIndex": "accent-1"}]} />
              </Chart>
            </Chart>
          </Headline>
        </Section>
        <Split fixed={false}>
          <Box justify='center'
            align='center'
            pad='large'>
            <p />
            <Headline margin='none' style={{fontSize: "20px"}}>
              {this.state.name}
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
