import React, { Component } from 'react';
import { Layer, Form, Header, Heading, FormField, FormFields, DateTime, TextInput, Footer, Button } from 'grommet';
import { ADD_LOAN } from '../../../queries.js';
import { graphql, withApollo, compose } from 'react-apollo';


class AddLoanForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      name: '',
      principal: 0,
      interest: 0,
      inception: '',
      maturity: ''
    }
    this.inceptionChange = this.inceptionChange.bind(this);
    this.maturityChange = this.maturityChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  handleChange(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  inceptionChange(e){
    this.setState({
      inception: e
    })
  };

  maturityChange(e){
    this.setState({
      maturity: e
    })
  };

 
  handleSubmit(){
    var inputs = {
      name: this.state.name,
      amount: this.state.principal,
      interest_rate: this.state.interest,
      inception_date: this.state.inception,
      end_date: this.state.maturity,
      user_id: this.props.id
    }
    this.props
      .mutate({
        variables: inputs,
      })
      .then(({ data }) => {
        console.log('Loan added successfully', data);
      })
      .catch(error => {
        console.log('there was an error sending the mutation', error);
      });
  };


  render(){
    return (
      <Layer closer={true} overlayClose={false} onClose={this.props.handleModal}>
      <Form style={{padding:'10%'}}>
        <Header>
          <Heading>
            Add New Loans
          </Heading>
        </Header>
        <FormFields>
          <FormField label='Loan Name (Issuer)'>
            <TextInput 
            name='name'
            onDOMChange={this.handleChange}/>
          </FormField>
          <p />
          <FormField label='Remaining Balance ($)'>
            <TextInput 
            name='principal'
            onDOMChange={this.handleChange}/>
          </FormField>
          <p />
          <FormField label='Interest Rate (%)'>
            <TextInput 
            name='interest'
            onDOMChange={this.handleChange}/>
          </FormField>
          <p />
        <FormField label='Inception Date'>
          <DateTime
            format='M/D/YYYY'
            step={5}
            value={this.state.inception} 
            onChange={this.inceptionChange}/>
        </FormField>
        <FormField label='End Date'>
          <DateTime
            format='M/D/YYYY'
            step={5}
            value={this.state.maturity} 
            onChange={this.maturityChange}/>
        </FormField>
        </FormFields>
        <Footer pad={{"vertical": "medium"}}>
          <Button label='Submit'
            type='submit'
            primary={true}
            onClick={this.handleSubmit} />
        </Footer>
      </Form>
    </Layer>
    )
  }
};

export default graphql(ADD_LOAN, {
  options: {
    refetchQueries: ['LOANS_QUERY'],
  },
})(AddLoanForm);