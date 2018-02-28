import { Columns, Box, Section,Title, Header, Heading, Paragraph} from 'grommet';
import React, { Component } from 'react';
import styles from '../../../../public/main/jStyles';

  const BillsSummary = (props) => {
    return (
      <div>
        <Box width="full" style={{ margin: '20px 20%' }}>
          <Heading align="left" strong="true" style={{ fontSize: '30px' }}>
            Monthly Summary
          </Heading>
        </Box>
        <Box width="full" style={{ margin: '20px 20%' }}>
          <Columns masonry={true} maxCount={4} justify="center" size="small">
            <Box
              align="center"
              pad="none"
              direction="column"
              margin="none"
              style={{ width: '180px' }}
            >
              <Heading
                align="center"
                margin="none"
                strong="true"
                style={{ fontSize: '20px', textAlign: 'center' }}
              >
                Bills Due
              </Heading>
              <Paragraph size="xlarge" style={{ textAlign: 'center' }}>
                ${props.billsDue
                  ? props.billsDue.reduce((total, bill) => (total += bill.bills[0].amount),0).toFixed(2) : "0.00"}
              </Paragraph>
            </Box>
              <Box
                align="center"
                pad="none"
                direction="column"
                margin="none"
                style={{ width: '180px' }}
              >
                <Heading
                  align="left"
                  margin="none"
                  strong="true"
                  style={{ fontSize: '20px', textAlign: 'center' }}
                >
                  Bills Overdue
                </Heading>
                <Paragraph size="xlarge" style={{ textAlign: 'center' }}>
                  ${props.overdueBills
                    ? props.overdueBills
                        .reduce((total, bill) => (total += bill.bills[0].amount),0.00)
                        .toFixed(2)
                    : "0.00"}
                </Paragraph>
              </Box>
              <Box
                align="center"
                pad="none"
                direction="column"
                margin="none"
                style={{ width: '180px' }}
              >
                <Heading
                  align="left"
                  margin="none"
                  strong="true"
                  style={{ fontSize: '20px', textAlign: 'center' }}
                >
                  Cash Available
                </Heading>
                <Paragraph size="xlarge" style={{ textAlign: 'center' }}>
                  ${props.cashAvailable ? props.cashAvailable.toFixed(2) : "0.00"}
                </Paragraph>
              </Box>
              <Box
                align="center"
                pad="none"
                direction="column"
                margin="none"
                style={{ width: '180px' }}
              >
                <Heading
                  align="left"
                  margin="none"
                  strong="true"
                  style={{ fontSize: '20px', textAlign: 'center' }}
                >
                  Credit Available
                </Heading>
                <Paragraph size="xlarge" style={{ textAlign: 'center' }}>
                  ${props.creditAvailable ? props.creditAvailable.toFixed(2) : "0.00"}
                </Paragraph>
              </Box>
          </Columns>
        </Box>
      </div>);
}

export default BillsSummary;
