import React, { Component } from 'react';
import {Distribution, Value} from 'grommet';

const AccountDashboard = ({accounts}) => {
  if (accounts) {
    let cash = 0;
    let debt = 0;
    for (let item of accounts.filter(account => account.type === 'depository')) {
      cash += item.current_balance
    }
    for (let item of accounts.filter(account => account.type === 'credit')) {
      debt += item.current_balance
    }
    return (
      <div style={{width: "100%"}}>
        <Value 
          value={cash-debt}
          units='USD'
          reverse={false}
          size='medium' 
          align='center'
        />
        <Distribution 
          series={[
            {"label": "Assets", "value": cash, "colorIndex": "graph-1"}, 
            {"label": "Debt", "value": debt, "colorIndex": "unset"}
          ]}
          full={false}
          size='small' 
        />
      </div>
    )
  } else {
    return null
  }
}

export default AccountDashboard;