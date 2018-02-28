require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const moment = require('moment')
const port = process.env.WORKER_PORT || 8003;
const knex = require('./database/index.js').knex;
const models = require('./database/models/index.js');
const schedule = require('node-schedule');
const billworker = require('./billWorker.js');
const email = require('../server/sendgrid.js');
const app = express();


app.use(cors());
app.use(bodyParser.json());

//This will run every day.
const deactivateExpiredBills = schedule.scheduleJob('0 0 * * *', () => {
  console.log('BILL WORKER - Deactivating Expired Bills');
  billworker.deactivateExpiredBills();
});

//This will run every day.
const createBillOccurence = schedule.scheduleJob('0 0 * * *', () => {
  console.log('BILL WORKER - Create Bill Occurence');
  billworker.createBillOccurence();
});

//This will run every Sunday at midnight.
const fetchUnpaidBillsDueNextWeek = schedule.scheduleJob({hour: 0, minute: 0, dayOfWeek: 0}, async () => {
		var users = await billworker.fetchAllUsers();
		users.forEach(async user => {
			var unpaidbillsDueNextWeek = await billworker.fetchUnpaidBillsDueNextWeek(user.user_id);
			var overdueBills = await billworker.fetchOverdueBills(user.user_id);
			if ((unpaidbillsDueNextWeek.length > 0 || overdueBills.length > 0) && user.email) {
				email.sendBillReminder(
					user.first_name,
					user.email,
					unpaidbillsDueNextWeek,
					overdueBills
				);
			}
		});
	});


app.listen(port, () => {
  console.log('BILL WORKER running on port ' + port)
})