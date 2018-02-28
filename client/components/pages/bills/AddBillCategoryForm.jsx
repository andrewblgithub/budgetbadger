import React from 'react';
import {Box, Button, Columns, Footer, Form, Header, Heading, Headline, Layer,List,ListItem, SearchInput} from 'grommet';
import { graphql, compose, withApollo } from 'react-apollo';
import {CREATE_BILL_CATEGORY, BILL_PAYMENT_HISTORY_QUERY} from '../../../queries.js';

class AddBillCategoryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      billCategoryDescription: '',
      user_id: window.localStorage.getItem('user_id'),
      billCategories: this.props.billCategories,
    };
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.handleBillCategoryType = this.handleBillCategoryType.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
  }

  handleCancelClick(e) {
    this.props.handleAddBillCategoryFormToggle();
  }

  handleBillCategoryType(e) {
    e.preventDefault();
    this.setState({ billCategoryDescription: e.target.value });
  }

  handleAddClick() {
    this.props
      .CREATE_BILL_CATEGORY({
        variables: {
          name: this.state.billCategoryDescription,
          user_id: this.state.user_id,
        },
      })
      .then(({ data }) => {
        console.log('successfully saved new bill category', data);
        this.props.data.refetch().then(data => {
          console.log('successfully fetched data after saving bill category', data);
        });
      })
      .catch(error => {
        console.log('error saving new bill after saving new bill category', error);
      });
  }

  render() {
    if (this.props.billCategoryFormToggle) {
      return (
        <Layer
          closer="true"
          onClose={this.props.handleAddBillCategoryFormToggle}
          flush="true"
          overlayClose="true"
        >
          <Form style={{ padding: '10%', width:'500px', margin:'0 auto', textAlign:"center"}}>
          <Headline size="small" strong={true}>
          Add Bill Categories
          </Headline>
              <div>
                <SearchInput
                  value={this.state.bill_category_description}
                  placeHolder="Enter Category Name"
                  onDOMChange={this.handleBillCategoryType}
                />
              </div>
            <Heading tag="h4" strong="true" margin="small" padding="small">
              Current Bill Categories:
            </Heading>
              <div>
                <List>
                  {this.props.billCategories.map(billObj =>
                    <ListItem
                      justify="between"
                      separator="horizontal"
                      style={{ fontSize: '16px', textAlign:'center'}}
                      align="center"
                    >
                      <span style={{textAlign:'center', margin: '0 auto'}}>
                        {billObj.name}
                      </span>
                    </ListItem>
                  )}
                </List>
              </div>
            <Footer pad={{ vertical: 'medium' }}>
              <Columns justify="center" size="small" maxCount="2">
                <Box align="center" pad="small">
                  <Button
                    label="Cancel"
                    primary={true}
                    onClick={this.handleCancelClick}
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

export default compose(
  graphql(CREATE_BILL_CATEGORY, { name: 'CREATE_BILL_CATEGORY' }),
  graphql(BILL_PAYMENT_HISTORY_QUERY, {
    options: props => ({
      variables: {
        user_id: window.localStorage.getItem('user_id'),
      },
    }),
  })
)(AddBillCategoryForm);
