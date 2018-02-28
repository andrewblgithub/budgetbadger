import React, { Component } from 'react';
import styles from '../../../../public/main/jStyles.js';
import {Columns, Box, Button, CheckBox, CloseIcon, DateTime, Form, FormField, Footer, Header, Heading, Label, Layer, NumberInput, SearchInput, Select, TextInput} from 'grommet'

class NewTransaction extends Component {
  constructor() {
    super()
  }
  render() {
    return (
      this.props.displayNewTransaction ?
      <Layer         
        closer={true}
        overlayClose={true}
        padding="small"
        flush={true}
        onClose={(e) => this.props.handleNewTransaction(e)}>
          <Form style={{paddingLeft:'5%', paddingRight:'5%'}}>
          <Header>
            <Heading tag='h3' strong='true'>Enter Transaction Details:</Heading>
          </Header>
          <Columns
            maxCount={2}
            justify="center"
            responsive={false}>
            <Heading tag='h4' margin='small'>Transaction Category:</Heading>
              <TextInput
                placeHolder="Category"
                name='category'
                value={this.props.form.category}
                onDOMChange={this.props.handleForm}
              />
            <Heading tag='h4' margin='medium'>Transaction Description:</Heading>
              <div>
                  <TextInput
                    placeHolder="Description"
                    name='name'
                    value={this.props.form.name}
                    onDOMChange={this.props.handleForm}
                  />
                </div>
            <Heading tag='h4' margin='small'>Bill Amount:</Heading>
              <div>
              <NumberInput 
                placeHolder='Enter Amount'
                name='amount'
                value = {this.props.form.amount} 
                onChange = {this.props.handleForm}
                min = {0.00}/>
                </div>
            <Heading tag='h4'  margin='small'>Transaction Date:</Heading>
            <div>
              <DateTime id='id'
                  name='date'
                  format='YYYY-MM-DD'
                  step={5}
                  onChange={(value) => this.props.handleForm('date', value)}
                  value={this.props.form.date} 
              />
              </div>
            <Heading tag='h4'  margin='small'>Transaction Category:</Heading>
            <div>
              <Select placeHolder='Account'
                name='account'
                options={this.props.accounts.map((a, i) => i + '. ' + a.bank_name)}
                value={this.props.form.account}
                onChange={({value}) => this.props.handleForm('account', value)} />
              </div>
          <Footer pad={{"vertical": "medium"}}>
            <Button label='Submit'
              type='submit'
              primary={true}
              onClick={this.props.submitForm} 
              style={{backgroundColor:'#49516f', color:'white', width: '130px', fontSize:'20px', padding:'6px 12px', border:'none'}}
            />
          </Footer>
        </Columns>
        </Form>
      </Layer>: null
    )
  }

}


export default NewTransaction