import React from 'react';
import TableRow from 'grommet/components/TableRow';

const Transaction = (props) => {
  if (props.account.length > 0) {
    return (
      <TableRow 
        justify='between'
        separator='horizontal'>
        <td>10/10/17</td>
        <td>{props.account[0].type === 'depository' ? 'Debit' : 'Credit'}</td>
        <td>{props.category}</td>
        <td>{props.name}</td>
        <td>${props.amount}</td>
      </TableRow>
    )
  } else {
    return null
  }
}

export default Transaction;