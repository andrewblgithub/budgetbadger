import React, { Component } from 'react';
import {Columns, Box, Button, Section, Heading, Paragraph, Split, Table, TableHeader, TableRow, Toast} from 'grommet';
import AddBillForm from '../bills/AddBillForm.jsx';
import { gql, graphql } from 'react-apollo';
import BillsDueTableItem from '../bills/BillsDueTableItem.jsx';
import AddBillCategoryForm from './AddBillCategoryForm.jsx';
import AddBillCategoryWarning from './AddCategoryWarning.jsx';

class BillsDueTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      billFormToggle: false,
      billCategoryFormToggle: false,
      sortIndex: 0,
      sortAscending: false,
      selectedBill: {},
      AddCategoryWarningToggle: false
    };
    this.handleFormToggle = this.handleFormToggle.bind(this);
    this.handleSortClick = this.handleSortClick.bind(this);
    this.handleBillSelect = this.handleBillSelect.bind(this);
    this.handleAddBillCategoryFormToggle = this.handleAddBillCategoryFormToggle.bind(this);
    this.handleAddCategoryWarningToggle = this.handleAddCategoryWarningToggle.bind(this);
  }

  handleBillSelect(bill) {
    this.setState({ selectedBill: bill });
  }

  handleSortClick(e) {
    let sortIdx = e;
    if (e < 4) {
      if (sortIdx === this.state.sortIndex) {
        this.setState({ sortAscending: !this.state.sortAscending }, () => {
          this.props.sortBills(
            false,
            this.state.sortIndex,
            !this.state.sortAscending
          );
        });
      } else {
        this.setState({ sortIndex: sortIdx }, () => {
          this.props.sortBills(
            false,
            this.state.sortIndex,
            !this.state.sortAscending
          );
        });
      }
    }
  }

  handleFormToggle() {
    if (this.props.billCategories.length === 0) {
      this.setState({AddCategoryWarningToggle: !this.state.AddCategoryWarningToggle})
    }else{
      this.setState({ billFormToggle: !this.state.billFormToggle });
    }
  }

  handleAddCategoryWarningToggle() {
    this.setState({AddCategoryWarningToggle: !this.state.AddCategoryWarningToggle})
  }


  handleAddBillCategoryFormToggle() {
    this.setState({
      billCategoryFormToggle: !this.state.billCategoryFormToggle,
    });
  }

  render() {
    return (
      <div>
        <AddBillCategoryWarning 
          AddCategoryWarningToggle = {this.state.AddCategoryWarningToggle}
          handleAddCategoryWarningToggle={this.handleAddCategoryWarningToggle}
          handleAddBillCategoryFormToggle = {this.handleAddBillCategoryFormToggle}
        />
        <Columns masonry={false} maxCount={2} size="small" justify="center">
          <Box
            align="end"
            size="large"
            direction="row"
            pad="none"
            margin="none"
            style={{ marginLeft: '70%' }}
          >
            <Box align="end" margin="small">
              <Button
                label="Add Bill"
                onClick={this.handleFormToggle}
                primary={false}
                hoverIndicator={{ background: 'neutral-4-a' }}
                style={{
                  backgroundColor: '#49516f',
                  color: 'white',
                  width: '130px',
                  fontSize: '20px',
                  padding: '6px 12px',
                  border: 'none',
                }}
                box="true"
              />
            </Box>
            <Box align="end" margin="small">
              <Button
                label="Add Category"
                onClick={this.handleAddBillCategoryFormToggle}
                primary={false}
                hoverIndicator={{ background: 'neutral-4-a' }}
                style={{
                  backgroundColor: '#49516f',
                  color: 'white',
                  width: '180px',
                  fontSize: '20px',
                  padding: '6px 12px',
                  border: 'none',
                }}
                box="true"
              />
            </Box>
          </Box>
        </Columns>
        <Box width="full" style={{ margin: '0 20%' }}>
          <Heading align="left" strong="true" style={{ fontSize: '30px' }}>
            Due
          </Heading>
        </Box>
        <Columns size="large" masonry={true} justify="center">
          <AddBillForm
            bills={this.props.bills}
            billCategories={this.props.billCategories}
            billRecurrenceTypes={this.props.billRecurrenceTypes}
            billFormToggle={this.state.billFormToggle}
            handleFormToggle={this.handleFormToggle}
          />
          <AddBillCategoryForm
            billCategoryFormToggle={this.state.billCategoryFormToggle}
            billCategories={this.props.billCategories}
            handleAddBillCategoryFormToggle={
              this.handleAddBillCategoryFormToggle
            }
          />
        </Columns>
        <Box width="full" style={{ margin: '20px 20%' }}>
          <Table responsive="true">
            <TableHeader
              labels={[
                'Bill Description',
                'Category',
                'Due Date',
                'Amount',
                'Actions',
              ]}
              sortIndex={this.state.sortIndex}
              sortAscending={this.state.sortAscending}
              onSort={this.handleSortClick}
              style={{ align: 'center' }}
            />
            <tbody>
              {this.props.bills
                ? this.props.bills
                    .filter(bill => bill.paid === false)
                    .map((bill, i) =>
                      <BillsDueTableItem
                        billRecurrenceTypes={this.props.billRecurrenceTypes}
                        handleBillSelect={this.handleBillSelect}
                        key={i}
                        bill={bill}
                        selectedBill={this.state.selectedBill}
                        bills={this.props.bills}
                        billCategories={this.props.billCategories}
                        UserBillPaymentHistory={
                          this.props.UserBillPaymentHistory
                        }
                      />
                    )
                : null}
            </tbody>
          </Table>
        </Box>
        {/* </Columns> */}
      </div>
    );
  }
}

export default BillsDueTable;