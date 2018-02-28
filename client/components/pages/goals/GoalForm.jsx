import React, { Component } from 'react';
import Layer from 'grommet/components/Layer';
import Button from 'grommet/components/Button';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import Select from 'grommet/components/Select';
import TextInput from 'grommet/components/TextInput';
import NumberInput from 'grommet/components/NumberInput';
import DateTime from 'grommet/components/DateTime';
import Label from 'grommet/components/Label';
import moment from 'moment'

class GoalForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      formActive: false,
      dateActive: false,
      descriptionField: '',
      amountField: '',
      dateField: '',
      accountField: [],
      categoryField: [],
      freqField: '',
      typeField: '',
      monthlyAmount: ''
    }
    this.handleDescriptionField = this.handleDescriptionField.bind(this)
    this.handleAmountField = this.handleAmountField.bind(this)
    this.handleDateField = this.handleDateField.bind(this)
    this.handleAccountField = this.handleAccountField.bind(this)
    this.handleCategoryField = this.handleCategoryField.bind(this)
    this.calculateMonthlyAmount = this.calculateMonthlyAmount.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  calculateMonthlyAmount(dateInput, amountInput) {
    let months = Math.floor(moment(dateInput).diff(moment(), 'months', true))
    if (months === 0) {months = 1}
    let amount = amountInput
    let monthlyCalculated = ''
    if (amount !== '') {
      monthlyCalculated = Number(amount) / months
      monthlyCalculated = Math.floor(monthlyCalculated)
    }
    return monthlyCalculated
  }

  handleDescriptionField(e) {
    this.setState({
      descriptionField: e.target.value
    })
  }

  handleAmountField(e) {
    let monthlyCalculated = this.calculateMonthlyAmount(this.state.dateField, e.target.value)
    this.setState({
      amountField: e.target.value,
      monthlyAmount: monthlyCalculated
    })
  }

  handleAccountField(e) {
    let accounts = this.state.accountField
    let index = accounts.indexOf(e.value)
    if (index !== -1) {
      accounts.splice(index, 1)
    } else {
      accounts.push(e.value)
    }
    this.setState({
      accountField: accounts
    })
  }

  handleCategoryField(e) {
    let categories = this.state.categoryField
    let index = categories.indexOf(e.value)
    if (index !== -1) {
      categories.splice(index, 1)
    } else {
      categories.push(e.value)
    }
    this.setState({
      categoryField: categories
    })
  }

  handleFreqField(e) {
    let dateToggle = true
    let monthlyAmount = this.state.monthlyAmount
    let dateField = this.state.dateField
    if (e.value === 'Repeat Monthly') {
      dateToggle = false
      monthlyAmount = ''
      dateField = ''
    }
    this.setState({
      freqField: e.value,
      dateActive: dateToggle,
      monthlyAmount: monthlyAmount,
      dateField: dateField
    })
  }

  handleDateField(e) {
    let monthlyCalculated = this.calculateMonthlyAmount(e, this.state.amountField)
    this.setState({
      dateField: e,
      monthlyAmount: monthlyCalculated
    })
  }

  handleTypeField(e) {
    this.setState({
      typeField: e.value
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    let goalProperties = {
      amount: this.state.amountField,
      description: this.state.descriptionField,
      start_date: moment().format('YYYY-MM-DD'),
      categories: this.state.categoryField,
      is_budget: true,
      accounts: this.state.accountField
    }
    if (this.state.typeField === 'Savings') {
      goalProperties.is_budget = false
    }
    if (this.state.dateField !== '') {
      goalProperties.amount = this.state.monthlyAmount
      goalProperties.end_date = this.state.dateField
    }
    if (this.state.accountField.length === 0) {
      goalProperties.accounts = this.props.accounts
    }
    this.props.handleSubmit(goalProperties)
    this.setState({
      formActive: false,
      dateActive: false,
      descriptionField: '',
      amountField: '',
      dateField: '',
      accountField: [],
      categoryField: [],
      freqField: '',
      typeField: '',
      monthlyAmount: ''
    })
  }

  render() {
    if (this.state.formActive) {
      let dateField = null
      if (this.state.dateActive) {
        dateField = (
          <FormField>
            <DateTime
              format='YYYY-MM-DD'
              onChange={this.handleDateField}
              value={this.state.dateField}
            />
          </FormField>
        )
      }
      let monthlyAmount = this.state.monthlyAmount
      if (this.state.monthlyAmount) {
        monthlyAmount = '~$' + monthlyAmount + ' per month'
      }
      return (
        <div>

          <Button 
            label='Add Goal'
            primary={true}
            style={{
              backgroundColor: '#49516f',
              color: 'white',
              width: '130px',
              fontSize: '20px',
              padding: '6px 12px',
              border: 'none',
              marginLeft: '16px'
            }}
          />
          <Layer 
            overlayClose={true}
            flush={false}
            closer={true}
            onClose={()=> {this.setState({formActive: false})}}
          >
            <Form pad='medium' onSubmit={this.handleSubmit}>
              <Label>Description</Label>
              <FormField>
                <TextInput 
                  placeHolder='Description'
                  value = {this.state.descriptionField}
                  onDOMChange={this.handleDescriptionField}
                />
              </FormField>
              <Label>Amount</Label>
              <FormField label={monthlyAmount}>
                <NumberInput
                  placeHolder='Amount'
                  min={0}
                  value = {this.state.amountField}
                  onChange={this.handleAmountField}
                />
              </FormField>
              <Label>Budget or Savings Goal?</Label>
              <FormField>
                <Select
                  placeHolder='Type'
                  inline={false}
                  multiple={false}
                  onSearch={false}
                  options={['Savings', 'Budget']}
                  value={this.state.typeField}
                  onChange={(e)=> {this.handleTypeField(e)}}
                />
              </FormField>
              <Label>Monthly or Finish by Date?</Label>
              <FormField>
                <Select
                  placeHolder='Frequency'
                  inline={false}
                  multiple={false}
                  onSearch={false}
                  options={['Repeat Monthly', 'Finish by Date']}
                  value={this.state.freqField}
                  onChange={(e)=> {this.handleFreqField(e)}}
                />
              </FormField>
              {dateField}
              <Label>Accounts</Label>
              <FormField>
                <Select 
                  placeHolder='All Accounts'
                  inline={false}
                  multiple={false}
                  onSearch={false}
                  options={this.props.accounts}
                  value={this.state.accountField}
                  onChange={(e)=> {this.handleAccountField(e)}}
                />
              </FormField>
              <Label>Categories</Label>
              <FormField>
                <Select 
                  placeHolder='All Categories'
                  inline={false}
                  multiple={false}
                  onSearch={false}
                  options={this.props.categories}
                  value={this.state.categoryField}
                  onChange={(e)=> {this.handleCategoryField(e)}}
                />
              </FormField>
              <br/>
              <Button 
                label='Submit'
                type='submit'
                primary={true}
              />
            </Form>
          </Layer>
        </div>
      )
    } else {
      return (
        <Button 
          label='Add Goal'
          primary={true}
          onClick={()=> {this.setState({formActive: true})}}
          style={{
            backgroundColor: '#49516f',
            color: 'white',
            width: '130px',
            fontSize: '20px',
            padding: '6px 12px',
            border: 'none',
            marginLeft: '16px'
          }}
        />
      )
    }
  }
}

export default GoalForm