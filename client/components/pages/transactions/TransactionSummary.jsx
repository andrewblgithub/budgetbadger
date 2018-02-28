import { Value, CurrencyIcon, Headline, Section, Box, Button, CheckBox, CloseIcon, Columns, DateTime, Form, FormField, Footer, Header, Heading, Label, Layer, NumberInput, SearchInput, Select, TextInput} from 'grommet'
import React, { Component } from 'react';
import identity from 'lodash'
import moment from 'moment';
import TransactionPie from './TransactionPie.jsx'

class TransactionSummary extends Component {
  constructor(){
    super();
    this.state = {
      monthly: 0,
      biAnnual: 0,
      annual: 0,
      allTime: 0,
      selected: ''
    }
    this.convertName = this.convertName.bind(this);
    this.calculateSpend = this.calculateSpend.bind(this);
    this.initializeTable = this.initializeTable.bind(this);
  }
  
  // Below removes all whitespace and any special characters from a transactions description
  // This is because some transactions may belong to the same group, however the description
  // includes say a date, or some other numerical value.

  convertName (name) {
    if (name) {
      return name.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/0-9\s]/gi, '')
    }
  }

  // Below function generates total spend for some selected field, based on a filter
  // provided through a callback. This is what renders the table on the side.
  // Works for any selected field, namely, category, account, or date.

  calculateSpend (name, transactions, field, filter = identity) {
    name = this.convertName(name);
    return transactions.reduce((a, b) => {
      let fieldValue = this.convertName(b[field])
      if (filter(b) && fieldValue.includes(name)) {
        a += Math.abs(b.amount);
      }
      return a;
    }, 0)
  }

  // Initializes spending table with total spend for its corresponding period

  initializeTable (name, field, filter = identity, callback) {
    const monthly = Math.round(this.calculateSpend(name, this.props.transactions, field, (a) => {
      if (filter(a)) {
        const date = moment().subtract(30, 'days');
        return moment(a.date) > date;
      }
    }))
    const biAnnual = Math.round(this.calculateSpend(name, this.props.transactions, field, (a) => {
      if (filter(a)) {
        const date = moment().subtract(180, 'days');
        return moment(a.date) > date;
      }
    }))
    const annual = Math.round(this.calculateSpend(name, this.props.transactions, field, (a) => {
      if (filter(a)) {
        const date = moment().subtract(360, 'days');
        return moment(a.date) > date;
      }
    }))

    const allTime = Math.round(this.props.transactions.reduce((a, b) => {
      return a + Math.abs(b.amount)
    }, 0))

    this.setState({
      selected: name,
      monthly,
      biAnnual,
      annual,
      allTime,
    }, () => callback ? callback() : null)
  } 

  componentWillReceiveProps(nextProps) {
    this.initializeTable(nextProps.summaryTransaction.name, 'name');
  }


  render() {
    return (
      this.props.display ?
      <Layer
      closer={true}
      overlayClose={true}
      padding="small"
      flush={true}
      onClose={this.props.handleSummary}
      >
      <Heading tag="h3" align="center" strong={true}> Transaction Summary </Heading>
      <Box
        direction='row'
        justify="center"
        align='center'
        wrap={true}
        reverse={false}
        pad='small'
        margin='small'>
        <Box 
            direction='row'
            justify='center'
            align='center'
            wrap={true}>
          <TransactionPie 
            data={[this.state.allTime, this.state.annual]} 
            labels={['Annual Total', 'Annual: ' + this.props.summaryTransaction.name]}/>
        </Box>
        <Box 
            direction='row'
            justify='center'
            align='center'
            pad='medium'
            colorIndex='light-2'
            margin='small'
            wrap={true}>
          <Box wrap={false} 
            direction='row' 
            size='large' 
            align='center' 
            justify='center'>
          <Heading margin='none' tag="h3" align='center'>
             <strong> {this.state.selected} </strong>
          </Heading>
          </Box>
          <Box 
            direction='row'
            justify='center'
            align='center'
            wrap={false}
            pad='small'
            colorIndex='light-2'
            margin='small'>
          <Value 
            size="small"
            value={this.state.monthly}
            icon={<CurrencyIcon />}
            label='Last 30 days'
            units='$' />
            <p />
          </Box>
          <Box 
            direction='row'
            justify='center'
            align='center'
            wrap={false}
            pad='small'
            colorIndex='light-2'
            margin='small'>
          <Value 
            size="small"
            value={this.state.biAnnual}
            icon={<CurrencyIcon />}
            label='Last 6 months'
            units='$' />
            <p />
            </Box>
          <Box 
            direction='row'
            justify='center'
            align='center'
            wrap={false}
            pad='small'
            colorIndex='light-2'
            margin='small'>
          <Value 
            size="small"
            value={this.state.annual}
            icon={<CurrencyIcon />}
            label='Last 12 Months'
            units='$' />
          </Box>
        </Box>
      </Box>
      </Layer>:
      null
    )
  }

}

export default TransactionSummary;