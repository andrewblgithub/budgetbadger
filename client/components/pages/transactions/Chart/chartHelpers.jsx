import moment from 'moment'

// Formats data in preparation for chart
const generateChartDataObject = (labels, data, oldData) => {
  const chartData = {
    labels: labels, 
    datasets:[
    {
      label: 'Monthly Amounts',
      data: [...data],
      backgroundColor: "rgb(71, 255, 178)"
    }]
  }
  return chartData;   
}

// Groups annual transactions by date
const assignToDate = (transactions) => {
  let dates = {};
  transactions.forEach(transaction => {
    let date = transaction.date;
    dates[date] ?
    dates[date].push(transaction) :
    dates[date] = [transaction];
  })
  return dates;
}

// Groups annual transactions by month
const assignToMonth = (transactions) => {
  let months = {};
  transactions.forEach(transaction => {
    let month = moment(transaction.date).format('MMMM')
    months[month] ?
    months[month].push(transaction) :
    months[month] = [transaction];
  })
  return months;
}

// Filters transactions according to filter object in state
// if transaction matches all properties of filter, it is returned
export const filterTransactionsByValue = (transactions, filterObject) => {
  console.log('transactions', transactions)
  if (transactions) {
    let filteredTransactions = transactions.filter(transaction => {
      return Object.keys(filterObject).every((key) => {
        if (key === 'account') {
          return transaction[key][0].bank_name === filterObject[key];
        }
        return transaction[key] === filterObject[key]
      })
    })
    return filteredTransactions
  }
}

// Takes daily transactions and calculates total spend for the day for each date
// then sets state to rerender the chart

export const generateDailyData = (transactions, month) => {
  const monthlyTransactions = assignToMonth(transactions)[month];
  if (monthlyTransactions) {
    const dailyTransactions = assignToDate(monthlyTransactions)
    // for some reason map didn't like an object-like array...
    const days = [...Object.keys(dailyTransactions)];
    const amounts = days.map(day => {
      return dailyTransactions[day].reduce((a, b) => {
        return  a += Math.abs(b.amount);
      }, 0)
    })
    return generateChartDataObject(days, amounts);
  }
  return generateChartDataObject([], [])
}

  // Takes monthly transactions and calculates total spend for the month
  // then sets state to rerender the chart

export const generateMonthlyData = (transactions) => {
  const months = assignToMonth(transactions);
  const year = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const amounts = year.map(month => {
    months[month] = months[month] || [];
    return months[month].reduce((a, b) => {
      return a += Math.abs(b.amount)
    }, 0);
  });
  return generateChartDataObject(year, amounts);
}