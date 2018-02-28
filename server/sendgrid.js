const sgMail = require('@sendgrid/mail');
const moment = require('moment');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = (userName, userEmail, userHash) => {
  console.log('SENDGRID_API_KEY', process.env.SENDGRID_API_KEY);
  let passwordRecoveryLink = `<a href="localhost:1337/passwordresetpage/${userHash}">reset your password here</a>`
  console.log('PASSWORD RECOVERY LINK!!!!!', passwordRecoveryLink);
  const msg = {
    to: userEmail,
    from: 'sender@example.org',
    subject: 'Hello world',
    text: 'Hello plain world!',
    html: `<p>Hello ${userName}! Here is your password recovery link: ${passwordRecoveryLink}.</p><p> Please be aware that this link will only be active for fifteen (15) minutes. Thank you for choosing Budget Badger!</p>`,
  };
  sgMail.send(msg).then(() => {
    console.log('MESSAGE SENT SUCCESSFULLY:', msg);
  })
  .catch(error => {
  
    //Log friendly error
    console.error(error.toString());
  
    //Extract error msg
    const {message, code, response} = error;
  
    //Extract response msg
    const {headers, body} = response;
  });

}

const sendBillReminder = (userFirstName, userEmail, unpaidBillsArr, overdueBillsArr) => {
  let unpaidBillsTableRow = unpaidBillsArr.length > 0 ? unpaidBillsArr.map(bill => {
    return (`<tr><td align="center">${bill.Description}</td><td align="center">$${bill['Amount Due']}</td><td align="center">${moment(bill['Due Date']).format('MMMM D, YYYY')}</td><tr>`)
  }).join('') : '';

  let unpaidBillsTable = `<h3>Bills Due This Week</h3>
  <Table border="0" cellpadding="3px" cellspacing="0" margin="20px" width="100%">
    <tr style="border: 1px solid black;">
      <th>Description</th>
      <th>Amount</th>
      <th>Due Date</th>
    <tr>
    ${unpaidBillsTableRow}
  </Table>`

  let overdueBillsTableRow = overdueBillsArr.length > 0 ? overdueBillsArr.map(bill => {
    return 
    (`<tr>
        <td align="center">${bill.Description}</td>
        <td align="center">$${bill['Amount Due']}</td>
        <td align="center">${moment(bill['Due Date']).format('MMMM D, YYYY')}</td>
      </tr>`)
  }).sort((a,b)=>{return new Date(b.paid_date) - new Date(a.paid_date)}).join(''): '';

  let overdueBillsTable = `<h3>Bills Overdue</h3>
  <Table border="0" cellpadding="3px" cellspacing="0" margin="20px" width="100%">
    <tr style="border: 1px solid black;">
      <th>Description</th>
      <th>Amount</th>
      <th>Due Date</th>
    <tr>
    ${overdueBillsTableRow}
  </Table>`

  let noUnpaidBills = `<h3>No Unpaid Bills</h3>`;
  let noOverdueBills = `<h3>No Overdue Bills</h3>`;

  let unpaidBillsTableDisplay = unpaidBillsArr.length > 0 ? unpaidBillsTable: noUnpaidBills;
  let overdueBillsTableDisplay = overdueBillsArr.length > 0 ? overdueBillsTable: noOverdueBills;




  let billsHTML = `<head>
  <link href="https://fonts.googleapis.com/css?family=Work+Sans" rel="stylesheet">
</head>
<body style="margin: 0; padding: 0; font-family: 'Work Sans', sans-serif;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%">
     <table align="center" border="2" cellpadding="0" cellspacing="0" width="600px" height="120px">
        <tr>
           <td align="center">
              <div style="border: 0px solid black; height: 175px;
                 padding: 25px;
                 background: url(https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?w=1260&h=750&dpr=2&auto=compress&cs=tinysrgb);
                 background-repeat: no-repeat;
                 background-size: auto 600px;">
                 <h1 style="font-size: 45px; color: white; padding-top:25px;">Bill Reminder</h1>
              </div>
           </td>
        </tr>
        <tr>
           <td bgcolor="#ffffff" style="padding: 40px 30px 40px 30px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                 <tr>
                    <td>
                       Hello, ${userFirstName ? userFirstName.charAt(0).toUpperCase()+userFirstName.slice(1).toLowerCase(): userEmail}
                    </td>
                 </tr>
                 <tr>
                    <td>
                       Here is your weekly Bills Summary:
                    </td>
                 </tr>
                 <tr>
                    <td>
                      ${unpaidBillsTableDisplay}
                    </td>
                 </tr>
                 <tr>
                    <td>
                      ${overdueBillsTableDisplay}
                    </td>
                 </tr>
              </table>
           </td>
        </tr>
        <tr>
           <td bgcolor="#49516f" style="padding: 0px 20px 0px 20px;">
              <table cellpadding="0" cellspacing="0" width="100%">
                 <tr>
                    <td>
                       <p style="display: inline; float:left; color: white;">Budget Badger<img src="http://moziru.com/images/face-clipart-badger-16.png" alt="Budget Badger" width="20" height="20" style="display: inline; float:left; color: white;" /></p>
                       <p style="display: inline; float:right; color: white;">© 2018 Priam Labs</p>
                    </td>
                 </tr>
              </table>
           </td>
        </tr>
     </table>
  </table>
</body>`


  const billsMsg = {
    to: userEmail,
    from: 'budgetBadger@notifications.org',
    subject: 'Your Weekly Bill Summary:',
    text: 'Testing the text field',
    html: billsHTML,
  };

  sgMail.send(billsMsg)
  .then(() => {console.log('MESSAGE SENT SUCCESSFULLY')})
  .catch(error => {console.error(error.toString())}) 
}


module.exports = {sendEmail, sendBillReminder};