import { Columns, Box, Section,Title, Header, Heading, Paragraph} from 'grommet';
import React, { Component } from 'react';
import styles from '../../../../public/main/jStyles';
import {Button, Layer, Headline} from 'grommet';




class AddCategoryWarning extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  this.handleAddCategoriesClick = this.handleAddCategoriesClick.bind(this);
  }


  handleAddCategoriesClick(){
    this.props.handleAddCategoryWarningToggle();
    this.props.handleAddBillCategoryFormToggle();
  }


  render() {
    if (this.props.AddCategoryWarningToggle) {
      return (
        <div>
        <Layer
          closer="true"
          onClose={this.props.handleAddCategoryWarningToggle}
          flush="true"
          overlayClose="true"
          align="center"
        >
        <Box 
          direction='column'
          justify='start'
          align='center'
          wrap={true}
          pad='small'
          margin='small'
          alignContent='center'
        >
        <Headline size="small" strong={true} style={{width:'500px', margin:'20px auto', textAlign:"center"}}>
          You must add a Bill Category before adding a Bill.
        </Headline>
        <Button
          label="Add Categories"
          primary={true}
          onClick={this.handleAddCategoriesClick}
          style={{
            backgroundColor: '#49516f',
            color: 'white',
            width: '200px',
            fontSize: '20px',
            padding: '6px 12px',
            border: 'none',
          }}
        />
        </Box>
          </Layer>
        </div>);
    } else {
      return (
        <div/>)
    }

  }
}

export default AddCategoryWarning;
