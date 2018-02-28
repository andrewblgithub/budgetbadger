import React, { Component } from 'react';
import {Box, Button,Form, Heading, Header, Layer, Columns} from 'grommet';
import EditBillForm from '../bills/EditBillForm.jsx';
import { compose, gql, graphql } from 'react-apollo';
import {UPDATE_BILL, BILL_PAYMENT_HISTORY_QUERY} from '../../../queries.js';


class DeleteBillForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  handleDeleteClick(e) {
    let variables = {
      id: this.props.bill.bills[0].id,
      bill_status: false,
    };
    this.props
      .mutate({ variables: variables })
      .then(({ data }) => {
        console.log('successfully updated Bill_status to false(inactive)', data);
        this.props.handleDeleteBillFormToggle();
        this.props.data.refetch();
      })
      .catch(error => {
        console.log('there was an error updating Bill_status to false(inactive)', error);
      });
  }

  render() {
    if (this.props.deleteBillFormToggle) {
      return (
        <Layer
          closer="true"
          onClose={this.props.handleDeleteBillFormToggle}
          flush="true"
          overlayClose="true"
        >
          <Form style={{ padding: '10%' }}>
            <Header>
              <Heading tag="h3" strong="true">
                Are you sure you want to delete this bill?
              </Heading>
            </Header>
            <Columns justify="center" size="small" maxCount="2">
              <Box align="center" pad="small">
                <Button
                  label="Cancel"
                  primary={true}
                  onClick={this.props.handleDeleteBillFormToggle}
                  style={{
                    backgroundColor: '#49516f',
                    color: 'white',
                    width: '130px',
                    fontSize: '20px',
                    padding: '6px 20px',
                    border: 'none',
                  }}
                />
              </Box>
              <Box align="center" pad="small">
                <Button
                  label="Delete"
                  primary={true}
                  onClick={this.handleDeleteClick}
                  style={{
                    backgroundColor: '#49516f',
                    color: 'white',
                    width: '130px',
                    fontSize: '20px',
                    padding: '6px 20px',
                    border: 'none',
                  }}
                />
              </Box>
            </Columns>
          </Form>
        </Layer>
      );
    } else {
      return <div />;
    }
  }
}

export default compose(
  graphql(UPDATE_BILL),
  graphql(BILL_PAYMENT_HISTORY_QUERY, {
  options: props => ({
    variables: {
      user_id: window.localStorage.getItem('user_id'),
    }
  })
}))(DeleteBillForm);
