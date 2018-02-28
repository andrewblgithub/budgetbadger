import React, { Component } from 'react';
import Spinner from '../Spinner.jsx';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Card from 'grommet/components/Card';
import Meter from 'grommet/components/Meter'

const Goals = (props) => {
  if (props.goals) {
    let goalsTiles = null
    if (props.goals.length > 0) {
      goalsTiles = (
        props.goals.map((goal => {
          let progressLabel = '$0 out of ' + goal.amount
          let progressValue = 0
          if (goal.goal_progress.length > 0) {
            progressLabel = '$' + goal.goal_progress[goal.goal_progress.length - 1].amount + ' out of ' + '$' +  goal.amount
            progressValue = goal.goal_progress[goal.goal_progress.length - 1].amount
          }
          return (
            <Tile>
              <Card
                heading={goal.description}
                label={goal.is_budget? 'Budget Goal': 'Savings Goal'}
              >
                <Meter 
                  type='bar'
                  size='medium'
                  label={progressLabel}
                  value={progressValue}
                  max={goal.amount}
                />
                <br/>
                Accounts: {goal.goal_accounts.map(account => account.account[0].bank_name).join(', ')}
                <br/>
                Categories: {goal.goal_categories.length > 0? goal.goal_categories.map(category => category.name).join(', ') : 'All'}
              </Card>
            </Tile>
          )
        }))
      )
    }
    return (
      <Tiles
        fill={true}
        flush={false}
        selectable={true}
        onSelect={props.handleClick}
      >
        {goalsTiles}
      </Tiles>
    )
  } else {
    return <Spinner/>
  }
}

export default Goals