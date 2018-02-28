const billSortingFunctions = {
  description: (a, b, direction) => {
    return direction ?
    a.bills[0].description.localeCompare(b.bills[0].description): 
    b.bills[0].description.localeCompare(a.bills[0].description);
  },
  bill_category: (a, b, direction) => {
    return direction ?
    a.bills[0].bill_category[0].name.localeCompare(b.bills[0].bill_category[0].name) :
    b.bills[0].bill_category[0].name.localeCompare(a.bills[0].bill_category[0].name)
  },
  due_date: (a, b, direction) => {
    return direction ?
      new Date(a.due_date) - new Date(b.due_date):
      new Date(b.due_date) - new Date(a.due_date);
  }, 
  paid_date: (a, b, direction) => {
    return direction ?
      new Date(a.paid_date) - new Date(b.paid_date):
      new Date(b.paid_date) - new Date(a.paid_date);
  },
  amount: (a, b, direction) => {
    return direction ?
      (a.bills[0].amount - b.bills[0].amount) :
      (b.bills[0].amount - a.bills[0].amount);
  }
}
export default billSortingFunctions;