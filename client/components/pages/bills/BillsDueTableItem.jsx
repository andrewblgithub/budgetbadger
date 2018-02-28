import React, { Component } from 'react';
import { Actions, Anchor, Box, Button, CheckmarkIcon,CircleInformationIcon, Columns, EditIcon, Section, TrashIcon, Heading,  Menu, MoreIcon, Paragraph, Table, TableHeader, TableRow, Toast} from 'grommet';
import EditBillForm from '../bills/EditBillForm.jsx';
import DeleteBillForm from './DeleteBillForm.jsx';
import BillPaymentHistory from './BillPaymentHistory.jsx';
import { graphql, compose, withApollo } from 'react-apollo';
import {UPDATE_BILL, UPDATE_BILL_PAYMENT_HISTORY, BILL_PAYMENT_HISTORY_QUERY} from '../../../queries.js';
import moment from 'moment';

class BillsDueTableItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      billEditFormToggle: false,
      deleteBillFormToggle: false,
      billPaymentHistoryToggle: false,
    };
    this.onMarkPaidClick = this.onMarkPaidClick.bind(this);
    this.handleEditFormToggle = this.handleEditFormToggle.bind(this);
    this.handleDeleteBillFormToggle = this.handleDeleteBillFormToggle.bind(this);
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.handleBillHistoryToggle = this.handleBillHistoryToggle.bind(this);
  }

  onMarkPaidClick(bill) {
    console.log('bill marked paid', bill);
    let currentDate = new Date();
    this.props
      .UPDATE_BILL_PAYMENT_HISTORY({
        variables: {
          id: bill.id,
          amount_paid: bill.amount_due.toFixed(2),
          paid_date: currentDate,
          paid: true,
        },
      })
      .then(({ data }) => {
        console.log('successfully updated bill payment History', data);
        this.props
          .UPDATE_BILL({
            variables: {
              id: bill.bills[0].id,
              last_paid_date: currentDate,
            },
          })
          .then(({ data }) => {
            console.log('successfully updated the bills last_paid_date', data);
            this.props.data.refetch();
          })
          .catch(error => {
            console.log('error updating the bills last_paid_date', error);
          });
      })
      .catch(error => {
        console.log('error updating bill payment history', error);
      });
  }

  handleMenuClick(e) {
    this.props.handleBillSelect(this.props.bill);
  }

  handleEditFormToggle() {
    this.setState({ billEditFormToggle: !this.state.billEditFormToggle });
  }

  handleDeleteBillFormToggle() {
    this.setState({ deleteBillFormToggle: !this.state.deleteBillFormToggle });
  }

  handleBillHistoryToggle() {
    this.setState({
      billPaymentHistoryToggle: !this.state.billPaymentHistoryToggle
    });
  }

  render() {
    return (
      <TableRow>
        <td>
          {this.props.bill.bills[0].description}
        </td>
        <td>
          {this.props.bill.bills[0].bill_category[0].name}
        </td>
        <td>
          {moment(this.props.bill.due_date).format('MMMM D, YYYY')}
        </td>
        <td>
          ${this.props.bill.amount_due.toFixed(2)}
        </td>
        <td>
          <Menu
            responsive={true}
            onClick={this.handleMenuClick}
            icon={<MoreIcon />}
          >
            <Anchor
              icon={<CircleInformationIcon />}
              onClick={this.handleBillHistoryToggle}
            >
              Bill Details
            </Anchor>
            <Anchor
              icon={<CheckmarkIcon />}
              onClick={() => {
                this.onMarkPaidClick(this.props.bill);
              }}
            >
              Mark as Paid
            </Anchor>
            <Anchor icon={<EditIcon />} onClick={this.handleEditFormToggle}>
              Edit Bill
            </Anchor>
            <Anchor
              icon={<TrashIcon />}
              onClick={this.handleDeleteBillFormToggle}
            >
              Delete Bill
            </Anchor>
          </Menu>
          <DeleteBillForm
            bill={this.props.bill}
            deleteBillFormToggle={this.state.deleteBillFormToggle}
            handleDeleteBillFormToggle={this.handleDeleteBillFormToggle}
          />
        </td>
        <BillPaymentHistory
          UserBillPaymentHistory = {this.props.UserBillPaymentHistory}
          billPaymentHistoryToggle={this.state.billPaymentHistoryToggle}
          handleBillHistoryToggle={this.handleBillHistoryToggle}
          selectedBill={this.props.selectedBill}
          bills={this.props.bills}
        />
        <EditBillForm
          billRecurrenceTypes={this.props.billRecurrenceTypes}
          selectedBill={this.props.selectedBill}
          bills={this.props.bills}
          billCategories={this.props.billCategories}
          billEditFormToggle={this.state.billEditFormToggle}
          handleFormToggle={this.handleEditFormToggle}
        />
      </TableRow>
    );
  }
}

export default compose(
  graphql(UPDATE_BILL, { name: 'UPDATE_BILL' }),
  graphql(UPDATE_BILL_PAYMENT_HISTORY, { name: 'UPDATE_BILL_PAYMENT_HISTORY' }),
  graphql(BILL_PAYMENT_HISTORY_QUERY, {
    options: props => ({
      variables: {
        user_id: window.localStorage.getItem('user_id'),
      },
    }),
  })
)(BillsDueTableItem);
