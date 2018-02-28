const sortingFuncs = {
  name: (a, b, direction) => {
    return direction ?
      a.localeCompare(b): 
      b.localeCompare(a);
  },
  category: (a, b, direction) => {
    return direction ?
      a.localeCompare(b): 
      b.localeCompare(a);
  },
  date: (a, b, direction) => {
    return direction ?
      new Date(a) - new Date(b):
      new Date(b) - new Date(a);
  }, 
  type: (a, b, direction) => {
    const a1 = a.account[0].type;
    const a2 = b.account[0].type;
    // console.log(a1, a2)
    return direction ?
      a1.localeCompare(a2) :
      a2.localeCompare(a1);
      // a.account[0].type.localeCompare(b.account[0].type) :
      // b.account[0].type.localeCompare(a.account[0].type)
  },
  amount: (a, b, direction) => {
    return direction ?
      (a - b) :
      (b - a);
  }
}
export default sortingFuncs;