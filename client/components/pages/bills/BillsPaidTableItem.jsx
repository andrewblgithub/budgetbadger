import React, { Component } from 'react';
import { Anchor, CircleInformationIcon, Columns, RevertIcon, Box, Button, Section, Heading, HistoryIcon, Menu, MoreIcon, Paragraph, Table, TableHeader, TableRow} from 'grommet';
import BillPaymentHistory from './BillPaymentHistory.jsx'
import styles from '../../../../public/main/jStyles';
import { graphql, compose, withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import {UPDATE_BILL, UPDATE_BILL_PAYMENT_HISTORY, BILL_PAYMENT_HISTORY_QUERY} from '../../../queries.js';
import moment from 'moment';

class BillsPaidTableItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      billPaymentHistoryToggle : false
    }
    this.onMarkUnpaidClick = this.onMarkUnpaidClick.bind(this);
    this.handleBillHistoryToggle = this.handleBillHistoryToggle.bind(this);
    this.handleMenuClick = this.handleMenuClick.bind(this);
  }

  onMarkUnpaidClick(bill) {
    this.props.UPDATE_BILL_PAYMENT_HISTORY({
        variables: {
          id: bill.id,
          amount_paid: null,
          paid_date: null,
          paid: false,
        },
      })
      .then(({ data }) => {
        console.log('successfully updated bill payment History', data);
        this.props
          .UPDATE_BILL({
            variables: {
              id: bill.bills[0].id,
              last_paid_date: null,
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
          {moment(this.props.bill.paid_date).format('MMMM D, YYYY')}
        </td>
        <td>
          ${this.props.bill.amount_paid.toFixed(2)}
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
              icon={<RevertIcon />}
              onClick={() => {
                this.onMarkUnpaidClick(this.props.bill);
              }}
            >
              Mark Unpaid
            </Anchor>
          </Menu>
          <BillPaymentHistory
            UserBillPaymentHistory = {this.props.UserBillPaymentHistory}
            billPaymentHistoryToggle={this.state.billPaymentHistoryToggle}
            handleBillHistoryToggle={this.handleBillHistoryToggle}
            selectedBill={this.props.selectedBill}
            bills={this.props.bills}
          />
        </td>
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
      }
    })
  })
)(BillsPaidTableItem);
