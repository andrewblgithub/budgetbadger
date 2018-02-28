import React from 'react';
import TableRow from 'grommet/components/TableRow';

const Transaction = (props) => {
  if (props.account.length > 0) {
    return (
      <TableRow 
        onClick={() => props.handleClick(props.transaction)}
        justify='between'
        separator='horizontal'>
        <td>{props.date}</td>
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