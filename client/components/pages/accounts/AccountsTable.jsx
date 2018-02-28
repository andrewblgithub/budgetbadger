import React, { Component } from 'react';
import {Table, TableRow} from 'grommet';

const AccountsTable = ({accounts}) => {
  if (accounts) {
    return (
      <Table 
        scrollable={false}
      >
        <thead>
          <tr>
            <th>Bank</th>
            <th>Type </th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account)=> {
            return (
              <TableRow>
                <td>{account.bank_name}</td>
                <td>{account.type}</td>
                <td>{account.current_balance}</td>
              </TableRow>
            )
          })}
        </tbody>
      </Table>
    )
  } else {
    return null
  }
}

export default AccountsTable;