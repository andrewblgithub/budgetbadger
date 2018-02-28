const knex = require('./database/index.js').knex;
const Promise = require('bluebird');
const moment = require('moment');
const models = require('../server/database/models/index.js');

const fetchExpiredBills = async () => {
	let currentDate = new Date();
	return knex
		.raw('select * from bills where bill_status = true and end_date < ?', [
			currentDate,
		])
		.then(res => {
			console.log('Successfully fetched expired bills: ', res.rows);
			return res.rows;
		})
		.catch(err => {
			console.log('Error fetching expired bills: ', err);
			return err;
		});
};

const deactivateExpiredBills = async () => {
	let inactiveBills = await fetchExpiredBills();
	inactiveBills.forEach(bill => {
		knex('bills')
			.where('id', '=', bill.id)
			.update({
				bill_status: false,
				alert: false,
			})
			.then(res => {
				console.log('Successfully deactivated expired bills: ', res);
				return res.rows;
			})
			.catch(err => {
				console.log('Error fetching active recurring bills: ', err);
				return err;
			});
	});
};

const fetchActiveRecurringBills = async () => {
	return knex
		.select('*')
		.from('bills')
		.where({ bill_status: true })
		.andWhere('bill_recurrence_id', '>', 1)
		.then(res => {
			console.log('Successfully fetched active recurring bills: ', res);
			return res;
		})
		.catch(err => {
			console.log('Error fetching active recurring bills: ', err);
			return err;
		});
};

const createBillOccurence = async () => {
	let activeBills = await fetchActiveRecurringBills();
	let currentDate = moment().startOf('day');
	activeBills.forEach(bill => {
		if (moment(bill.last_occurence_date).add(1, 'days').isSame(currentDate)) {
			var nextDueDate;
			if (bill.bill_recurrence_id === 2) {
				nextDueDate = moment(bill.last_occurence_date).add(1, 'weeks');
			} else if (bill.bill_recurrence_id === 3) {
				nextDueDate = moment(bill.last_occurence_date).add(2, 'weeks');
			} else if (bill.bill_recurrence_id === 4) {
				nextDueDate = moment(bill.last_occurence_date).add(1, 'months');
			} else if (bill.bill_recurrence_id === 5) {
				nextDueDate = moment(bill.last_occurence_date).add(1, 'years');
			}
			var bphVars = {
				bill_id: bill.id,
				user_id: bill.user_id,
				amount_paid: null,
				amount_due: bill.amount,
				paid_date: null,
				due_date: nextDueDate,
				paid: false,
			};

			new models.BillPaymentHistory(bphVars)
				.save()
				.then(res => {
					knex('bills')
						.where('id', '=', res.attributes.bill_id)
						.update({
							last_occurence_date: nextDueDate,
						})
						.then(res => {
							console.log('Successfully updated bills last_occurrence_date: ', res);
							return res;
						})
						.catch(err => {
							console.log('Error updating Last_occurrence_date: ', err);
							return err;
						});
					return res;
				})
				.catch(err => {
					console.log('Error saving bill payment history record: ', err);
					return err;
				});
		}
	});
};

const fetchUnpaidBillsDueNextWeek = async (user_id) => {
	let currentDate = moment().startOf('day');
	return await knex
		.table('bills')
		.innerJoin('bill_payment_history','bills.id','=','bill_payment_history.bill_id')
		.where({
			'bills.bill_status': true,
			'bills.alert': true,
			'bill_payment_history.paid': false,
			'bills.user_id': user_id
		})
		.andWhere('bill_payment_history.due_date', '>=', currentDate)
		.andWhere('bill_payment_history.due_date','<=', moment(currentDate).add(1, 'weeks'))
		.then(async res => {
			var unpaidBillsData = res.map(bill => {
				return {
					"Description": bill.description,
					"Amount Due": bill.amount, 
					"Due Date":bill.due_date
				}
			});
			return unpaidBillsData;
		})
		.catch(err => {
			console.log('Error fetching unpaid bills', err);
			return err
		});
};

const fetchOverdueBills = async (user_id) => {
	let currentDate = moment().startOf('day');
	return await knex
		.table('bills')
		.innerJoin('bill_payment_history','bills.id','=','bill_payment_history.bill_id')
		.where({
			'bills.bill_status': true,
			'bills.alert': true,
			'bill_payment_history.paid': false,
			'bills.user_id': user_id
		})
		.andWhere('bill_payment_history.due_date', '<', currentDate)
		.then(res => {
			var overdueBillsData = res.map(bill => {
				return {
					"Description": bill.description,
					"Amount Due": bill.amount, 
					"Due Date":bill.due_date
				}
			});
			return overdueBillsData;
		})
		.catch(err => {
			console.log('Error fetching overdue bills ', err);
			return err;
		});
};

const fetchAllUsers = async () => {
	return knex.table('users').where({}).then( res => {
			var usersData = res.map(user => {
				return {
					"user_id": user.id,
					"email": user.email, 
					"first_name": user.first_name, 
					"last_name": user.last_name
				}
		});
		return usersData;
	})
}


module.exports = {
	fetchExpiredBills,
	fetchActiveRecurringBills,
	deactivateExpiredBills,
	createBillOccurence,
	fetchUnpaidBillsDueNextWeek,
	fetchOverdueBills,
	fetchAllUsers
};
