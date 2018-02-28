import React, { Component } from 'react';
import { Columns, Box, Button, Section, Heading, Paragraph, Table, TableHeader, TableRow} from 'grommet';
import moment from 'moment';
import styles from '../../../../public/main/jStyles';
import { graphql, compose, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import BillsPaidTableItem from './BillsPaidTableItem.jsx';

class BillsPaidTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      billFormToggle: false,
      sortIndex: 0,
      sortAscending: false,
      selectedBill: {},
    };
    this.handleSortClick = this.handleSortClick.bind(this);
    this.handleBillSelect = this.handleBillSelect.bind(this);
  }

  handleBillSelect(bill) {
    this.setState({ selectedBill: bill });
  }

  handleSortClick(e) {
    let sortIdx = e;
    if (sortIdx < 5) {
      if (sortIdx === this.state.sortIndex) {
        this.setState({ sortAscending: !this.state.sortAscending }, () => {
          this.props.sortBills(
            true,
            this.state.sortIndex,
            !this.state.sortAscending
          );
        });
      } else {
        this.setState({ sortIndex: sortIdx }, () => {
          this.props.sortBills(
            true,
            this.state.sortIndex,
            !this.state.sortAscending
          );
        });
      }
    }
  }

  render() {
    return (
      <div>
        <Box width="full" style={{ margin: '20px 14%' }}>
          <Heading align="left" strong="true" style={{ fontSize: '30px' }}>
            Recently Paid
          </Heading>
        </Box>
        <Box width="full" style={{ margin: '0 20%' }}>
          <Table responsive="true">
            <TableHeader
              labels={[
                'Bill Description',
                'Category',
                'Due Date',
                'Paid Date',
                'Amount',
                'Actions',
              ]}
              sortIndex={this.state.sortIndex}
              sortAscending={this.state.sortAscending}
              onSort={this.handleSortClick}
            />
            <tbody>
              {this.props.bills
                ? this.props.bills
                    .filter(
                      bill =>
                        bill.paid === true &&
                        moment(bill.paid_date) >= moment().subtract(2, 'months')
                    )
                    .map((bill, j) =>
                      <BillsPaidTableItem
                        key={j}
                        bill={bill}
                        UserBillPaymentHistory={
                          this.props.UserBillPaymentHistory
                        }
                        handleBillSelect={this.handleBillSelect}
                        selectedBill={this.state.selectedBill}
                      />
                    )
                : null}
            </tbody>
          </Table>
        </Box>
      </div>
    );
  }
}

export default BillsPaidTable;
