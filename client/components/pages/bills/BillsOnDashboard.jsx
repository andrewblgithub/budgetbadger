import React, { Component } from 'react';
import {Box, Heading, Table, TableHeader, TableRow } from 'grommet';
import BillsDueTableItem from './BillsDueTableItem.jsx';
import moment from 'moment';

class BillsOnDashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasUpcomingBills: false
    };
  }

  componentDidMount() {
    if (this.props.unpaidBills.length > 0) {
      this.setState({hasUpcomingBills: true});
    } else {
      this.setState({hasUpcomingBills: false})
    }
  }

  render() {
    return (
      <div>
        <Box style={{ margin: '0 5%', width: "65vw" }}>
        <Heading strong={true}
          tag='h2'
          style={{width: '360px'}}>
            {this.state.hasUpcomingBills ? "Upcoming Bills" : "No Upcoming Bills"}
        </Heading>
          <Table responsive="true">
            <TableHeader
              labels={[
                'Bill Description',
                'Category',
                'Due Date',
                'Amount'
              ]}
            />
            <tbody>
              {this.props.unpaidBills.map((bill, i) => {
                return (
                  <TableRow>
                    <td>
                      {bill.bills[0].description}
                    </td>
                    <td>
                      {bill.bills[0].bill_category[0].name}
                    </td>
                    <td>
                      {moment(bill.due_date).format('MMMM D, YYYY')}
                    </td>
                    <td>
                      ${bill.bills[0].amount.toFixed(2)}
                    </td>
                  </TableRow>)
                })
              }
            </tbody>
          </Table>
        </Box>
      </div>
    );
  }
}

export default BillsOnDashBoard;
