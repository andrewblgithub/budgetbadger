import React, { Component } from 'react';
import { Accordion,AccordionPanel, Actions, Anchor, Box, Button, CheckmarkIcon, Columns, EditIcon, Form, Label, Section, TrashIcon, Header, Heading , Layer, Menu, MoreIcon, Paragraph, Table, TableHeader, TableRow, Toast} from 'grommet';
import { graphql, compose, withApollo } from 'react-apollo';
import moment from 'moment';

class BillPaymentHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      billPaymentHistoryForSelectedBill: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedBill.bills && nextProps.UserBillPaymentHistory) {
      var selectedBillId = nextProps.selectedBill.bills[0].id;
      var historyForBill = nextProps.UserBillPaymentHistory
        .filter(
          UserBillPayment =>
            UserBillPayment.bills[0].id === selectedBillId &&
            UserBillPayment.paid
        )
        .sort((a, b) => new Date(b.due_date) - new Date(a.due_date));

      this.setState({ billPaymentHistoryForSelectedBill: historyForBill });
    }
  }

  render() {
    if (this.props.billPaymentHistoryToggle) {
      return (
        <div>
          <Layer
            closer="true"
            onClose={this.props.handleBillHistoryToggle}
            flush="true"
            overlayClose="true"
          >
            <Form
              style={{
                width: '875px',
                padding: '5%',
                overflowY: 'auto',
                margin: 'auto',
              }}
            >
              <Header>
                <Heading tag="h3" strong="true">Bill Details</Heading>
              </Header>
              <Columns size="medium" maxCount={2} justify="center">
                <Box
                  pad="none"
                  direction="column"
                  margin="small"
                >
                  <Heading align="center" margin="none" strong="true" tag="h4">
                    DESCRIPTION
                  </Heading>
                  <Paragraph size="small" align="center">
                    {this.props.selectedBill
                      ? this.props.selectedBill.bills[0].description
                      : ''}
                  </Paragraph>
                </Box>
                <Box
                  align="stretch"
                  pad="none"
                  direction="column"
                  margin="small"
                >
                  <Heading align="center" margin="none" strong="true" tag="h4">
                    CATEGORY NAME
                  </Heading>
                  <Paragraph size="medium" align="center">
                    {this.props.selectedBill.bills[0].bill_category[0].name}
                  </Paragraph>
                </Box>
                <Box
                  align="stretch"
                  pad="none"
                  direction="column"
                  margin="small"
                >
                  <Heading align="center" margin="none" strong="true" tag="h4">
                    AMOUNT
                  </Heading>
                  <Paragraph size="medium" align="center">
                    ${this.props.selectedBill.bills[0].amount.toFixed(2)}
                  </Paragraph>
                </Box>
                <Box
                  align="stretch"
                  pad="none"
                  direction="column"
                  margin="small"
                >
                  <Heading align="center" margin="none" strong="true" tag="h4">
                    START DATE
                  </Heading>
                  <Paragraph size="medium" align="center">
                    {moment(this.props.selectedBill.bills[0].start_date).format(
                      'MMMM D, YYYY'
                    )}
                  </Paragraph>
                </Box>
                <Box
                  align="stretch"
                  pad="none"
                  direction="column"
                  margin="small"
                >
                  <Heading align="center" margin="none" strong="true" tag="h4">
                    END DATE
                  </Heading>
                  <Paragraph size="medium" align="center">
                    {moment(this.props.selectedBill.bills[0].end_date).format(
                      'MMMM D, YYYY'
                    )}
                  </Paragraph>
                </Box>
                <Box
                  align="stretch"
                  pad="none"
                  direction="column"
                  margin="small"
                >
                  <Heading align="center" margin="none" strong="true" tag="h4">
                    LAST PAID
                  </Heading>
                  <Paragraph size="medium" align="center">
                    {this.props.selectedBill.bills[0].last_paid_date
                      ? moment(
                          this.props.selectedBill.bills[0].last_paid_date
                        ).format('MMMM D, YYYY')
                      : 'No Payments made'}
                  </Paragraph>
                </Box>
                <Box
                  align="stretch"
                  pad="none"
                  direction="column"
                  margin="small"
                >
                  <Heading align="center" margin="none" strong="true" tag="h4">
                    RECURRENCE TYPE
                  </Heading>
                  <Paragraph size="medium" align="center">
                    {
                      this.props.selectedBill.bills[0].bill_recurrence[0]
                        .recurrence_type
                    }
                  </Paragraph>
                </Box>
                <Box
                  align="stretch"
                  pad="none"
                  direction="column"
                  margin="small"
                >
                  <Heading align="center" margin="none" strong="true" tag="h4">
                    BILL ALERTS
                  </Heading>
                  <Paragraph size="medium" align="center">
                    {this.props.selectedBill.bills[0].alert
                      ? 'Active'
                      : 'Inactive'}
                  </Paragraph>
                </Box>
              </Columns>
              <Accordion>
                <AccordionPanel heading={<Heading tag="h3" strong="true">Payment History</Heading>}>
                  <Table>
                    <thead>
                      <tr>
                        <th>
                          BILL DESCRIPTION
                        </th>
                        <th>
                          DATE PAID
                        </th>
                        <th>
                          DUE DATE
                        </th>
                        <th>
                          AMOUNT PAID
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.billPaymentHistoryForSelectedBill
                        ? this.state.billPaymentHistoryForSelectedBill.map(
                            bill =>
                              <TableRow>
                                <td>
                                  {bill.bills[0].description}
                                </td>
                                <td>
                                  {bill.paid_date
                                    ? moment(bill.paid_date).format(
                                        'MMMM D, YYYY'
                                      )
                                    : ''}
                                </td>
                                <td>
                                  {bill.paid_date
                                    ? moment(bill.due_date).format(
                                        'MMMM D, YYYY'
                                      )
                                    : ''}
                                </td>
                                <td>
                                  ${bill.amount_paid.toFixed(2) || ''}
                                </td>
                              </TableRow>
                          )
                        : 0}
                    </tbody>
                  </Table>
                </AccordionPanel>
              </Accordion>
            </Form>
          </Layer>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

export default BillPaymentHistory;
