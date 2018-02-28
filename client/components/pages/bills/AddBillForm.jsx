import React from 'react';
import ReactModal from 'react-modal';
import styles from '../../../../public/main/jStyles.js';
import {Box, Button, CheckBox, CloseIcon, Columns, DateTime, Form, FormField, Footer, Header, Heading, Label, Layer, NumberInput, Paragraph, RadioButton, SearchInput, Select, TextInput} from 'grommet';
import { graphql, compose, withApollo } from 'react-apollo';
import { CREATE_BILL, CREATE_BILL_PAYMENT_HISTORY, BILL_PAYMENT_HISTORY_QUERY } from '../../../queries.js';
import gql from 'graphql-tag';

var getInputCategoryID = (value, billCategoryObjs) => {
  let filteredCategories = billCategoryObjs.filter(
    billCategoryObj =>
      billCategoryObj.name.toLowerCase() === value.toLowerCase()
  );
  return filteredCategories.length > 0 ? filteredCategories[0].id : 0;
};


class AddBillForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: window.localStorage.getItem('user_id'),
      bill_category_id: 0,
      bill_category_description: '',
      description: '',
      amount: '',
      amount_due: '',
      bill_recurrence_id: 1,
      bill_recurrence_type: '',
      start_date: '',
      end_date: '',
      last_paid_date: null,
      last_occurence_date: null,
      alert: false,
      bill_status: true,
      bill_categories: [],
      bill_descriptions: [],
    };

    this.handleBillCategoryChange = this.handleBillCategoryChange.bind(this);
    this.handleBillAmountChange = this.handleBillAmountChange.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.handleDescriptionType = this.handleDescriptionType.bind(this);
    this.handleDescriptionSelect = this.handleDescriptionSelect.bind(this);
    this.handleAlertChange = this.handleAlertChange.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleCancelAddClick = this.handleCancelAddClick.bind(this);
    this.handleRecurrenceChange = this.handleRecurrenceChange.bind(this);
  }


  handleBillCategoryChange(e) {
    let selectedCategoryName = e.value;
    let categoryID = this.props.billCategories.filter(
      categoryObj =>
        categoryObj.name.toLowerCase() === selectedCategoryName.toLowerCase()
    )[0].id;

    this.setState({ bill_category_description: selectedCategoryName });
    this.setState({ bill_category_id: categoryID });
  }

  handleRecurrenceChange(e) {
    let selectedRecurrence = e.value;
    let recurrenceID = this.props.billRecurrenceTypes.filter(
      billRecurrenceType =>
        billRecurrenceType.recurrence_type.toLowerCase() ===
        selectedRecurrence.toLowerCase()
    )[0].id;
    this.setState({ bill_recurrence_type: selectedRecurrence });
    this.setState({ bill_recurrence_id: recurrenceID });
  }

  handleDescriptionType(e) {
    this.setState({ description: e.target.value });
  }

  handleDescriptionSelect(e) {
    this.setState({ description: e.suggestion });
  }

  handleBillAmountChange(e) {
    this.setState({ amount: e.target.value });
  }

  handleStartDateChange(e) {
    this.setState({ start_date: e });
  }

  handleEndDateChange(e) {
    this.setState({ end_date: e });
  }

  handleAlertChange(e) {
    this.setState({ alert: !this.state.alert });
  }

  handleCancelAddClick(e) {
    this.setState({
      user_id: window.localStorage.getItem('user_id'),
      bill_category_id: 0,
      bill_category_description: '',
      description: '',
      amount: '',
      bill_recurrence_id: 1,
      bill_recurrence_type: '',
      start_date: '',
      end_date: '',
      last_paid_date: null,
      last_occurence_date: null,
      alert: false,
      bill_status: true,
      bill_categories: [],
      bill_descriptions: [],
    });
    this.props.handleFormToggle();
  }

  handleAddClick(e) {
    let variables = {
      user_id: this.state.user_id,
      bill_category_id: this.state.bill_category_id,
      description: this.state.description,
      amount: this.state.amount,
      bill_recurrence_id: this.state.bill_recurrence_id,
      start_date: this.state.start_date,
      end_date: this.state.end_date,
      last_paid_date: null,
      last_occurence_date: this.state.start_date,
      alert: this.state.alert,
      bill_status: true,
    };
    if(this.state.bill_category_id 
      && this.state.description 
      && this.state.amount > 0 
      && this.state.bill_recurrence_id
      && this.state.start_date
      && this.state.end_date
      && this.state.bill_category_id
      && this.state.bill_category_description 
    ) {
    this.props
      .CREATE_BILL({ variables: variables })
      .then(({ data }) => {
        let billPaymentVariables = {
          bill_id: data.createBill.id,
          user_id: this.state.user_id,
          amount_paid: null,
          amount_due: this.state.amount,
          paid_date: null,
          due_date: this.state.start_date,
          paid: false,
        };
        this.props
          .CREATE_BILL_PAYMENT_HISTORY({ variables: billPaymentVariables })
          .then(({ data }) => {
            this.setState({
              user_id: window.localStorage.getItem('user_id'),
              bill_category_id: 0,
              bill_category_description: '',
              description: '',
              amount: '',
              bill_recurrence_id: 1,
              bill_recurrence_type: '',
              start_date: '',
              end_date: '',
              last_paid_date: null,
              last_occurence_date: null,
              alert: false,
              bill_status: true,
              bill_categories: [],
              bill_descriptions: [],
            });
            this.props.data.refetch();
          })
          .catch(error => {console.log('error saving new bill in billPaymentHistory table', error)});
      })
      .catch(error => {console.log('error saving new bill in bills table', error)});
    this.props.handleFormToggle();
    }else{
      console.log('Please enter all required fields');
    }
  }

  render() {
    if (this.props.billFormToggle) {
      return (
        <Layer
          closer="true"
          onClose={this.props.handleFormToggle}
          flush="true"
          overlayClose="true"
        >
          <Form style={{ padding: '10%' }}>
            <Header>
              <Heading tag="h3" strong="true">Enter bill details:</Heading>
            </Header>
            <Heading tag="h4" margin="small">
              Bill Category:
              <div>
                <Select
                  placeHolder="Select Bill Category"
                  options={this.props.billCategories.map(
                    billObj => billObj.name
                  )}
                  value={this.state.bill_category_description}
                  onChange={this.handleBillCategoryChange}
                />
              </div>
            </Heading>
            <Heading tag="h4" margin="medium">
              Bill Description:
              <div>
                <SearchInput
                  value={this.state.description}
                  placeHolder="Enter Description"
                  suggestions={this.state.bill_descriptions}
                  onSelect={this.handleDescriptionSelect}
                  onDOMChange={this.handleDescriptionType}
                />
              </div>
            </Heading>
            <Heading tag="h4" margin="small">
              Bill Amount:
              <div>
                <NumberInput
                  placeHolder="Enter Amount"
                  value={this.state.amount}
                  onChange={this.handleBillAmountChange}
                  min={0.0}
                />
              </div>
            </Heading>
            <Heading tag="h4" margin="small">
              Bill Start Date(Next Due Date):
              <Paragraph margin="none" size='small'>
               *Cannot be modified after creation
              </Paragraph>
              <div>
                <DateTime
                  id="id"
                  name="name"
                  format="M/D/YYYY"
                  step={5}
                  onChange={this.handleStartDateChange}
                  value={this.state.start_date}
                />
              </div>
            </Heading>
            <Heading tag="h4" margin="small">
              Bill End Date(Last Due Date):
              <div>
                <DateTime
                  id="id"
                  name="name"
                  format="M/D/YYYY"
                  step={5}
                  onChange={this.handleEndDateChange}
                  value={this.state.end_date}
                />
              </div>
            </Heading>
            <Heading tag="h4" margin="small">
              Recurrence:
              <Paragraph margin="none" size='small'>
                *Cannot be modified after creation
              </Paragraph>
              <div>
                <Select
                  placeHolder="Select Recurrence Pattern"
                  options={this.props.billRecurrenceTypes.map(
                    (billRecurrenceType, i) =>
                      billRecurrenceType.recurrence_type
                  )}
                  value={this.state.bill_recurrence_type}
                  onChange={this.handleRecurrenceChange}
                />
              </div>
            </Heading>
            <Heading tag="h4" margin="small">
              {' '}Alert
              <div>
                <CheckBox
                  toggle={true}
                  reverse={true}
                  onChange={this.handleAlertChange}
                />
              </div>
            </Heading>

            <Footer pad={{ vertical: 'medium' }}>
              <Columns justify="center" size="small" maxCount="2">
                <Box align="center" pad="small">
                  <Button
                    label="Cancel"
                    primary={true}
                    onClick={this.handleCancelAddClick}
                    style={{
                      backgroundColor: '#49516f',
                      color: 'white',
                      width: '130px',
                      fontSize: '20px',
                      padding: '6px 12px',
                      border: 'none',
                    }}
                  />
                </Box>
                <Box align="center" pad="small">
                  <Button
                    label="Add"
                    primary={true}
                    onClick={this.handleAddClick}
                    style={{
                      backgroundColor: '#49516f',
                      color: 'white',
                      width: '130px',
                      fontSize: '20px',
                      padding: '6px 12px',
                      border: 'none',
                    }}
                  />
                </Box>
              </Columns>
            </Footer>
          </Form>
        </Layer>
      );
    } else {
      return <div />;
    }
  }
}

export default compose(withApollo,
  graphql(CREATE_BILL_PAYMENT_HISTORY, {name: 'CREATE_BILL_PAYMENT_HISTORY'}),
  graphql(CREATE_BILL, { name: 'CREATE_BILL' }),
  graphql(BILL_PAYMENT_HISTORY_QUERY, {
    options: props => ({
      variables: {
        user_id: window.localStorage.getItem('user_id'),
      }
    })
  })
)(AddBillForm);
