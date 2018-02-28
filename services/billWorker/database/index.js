const knex = require('knex')({
  client: 'pg',
  connection: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: 'bbadger',
    charset: 'utf8',
  }
});

knex.schema.hasTable('users').then(exists => {
  if (!exists) {
    knex.schema.createTable('users', table => {
      table.increments('id').primary();
      table.string('email');
      table.string('password');
      table.string('first_name');
      table.string('last_name');
      table.string('street');
      table.string('zip_code');
      table.string('state');
      table.string('phone');
      table.string('school');
    }).then(() => console.log('created table users'))
  }
})

knex.schema.hasTable('loan_payments').then(exists => {
  if (!exists) {
    knex.schema.createTable('loan_payments', table => {
      table.increments('id').primary();
      table.decimal('amount', 14, 2);
      table.string('date');
      table.integer('loan_id');
      table.integer('user_id');
    }).then(() => console.log('created table loan_payments'))
  }
})

knex.schema.hasTable('loans').then(exists => {
  if (!exists) {
    knex.schema.createTable('loans', table => {
      table.increments('id').primary();
      table.string('name');
      table.decimal('amount', 14, 2);
      table.decimal('interest_rate', 14, 2);
      table.string('recurrence');
      table.string('inception_date');
      table.string('end_date');
      table.integer('user_id');
    }).then(() => console.log('created table loans'))
  }
})

knex.schema.hasTable('transactions').then(exists => {
  if (!exists) {
    knex.schema.createTable('transactions', table => {
      table.increments('id').primary();
      table.string('plaid_id');
      table.integer('user_id');
      table.string('category');
      table.string('account_id');
      table.string('amount');
      table.string('date');
      table.string('name');
      table.string('street');
      table.string('zip_code');
      table.string('state');
    }).then(() => console.log('created table transactions'))
  }
})

knex.schema.hasTable('daily_transactions').then(exists => {
  if (!exists) {
    knex.schema.createTable('daily_transactions', table => {
      table.increments('id').primary();
      table.string('plaid_id');
      table.integer('user_id');
      table.string('category');
      table.string('account_id');
      table.string('amount');
      table.string('date');
      table.string('name');
      table.string('street');
      table.string('zip_code');
      table.string('state');
    }).then(() => console.log('created table daily_transactions'))
  }
})

knex.schema.hasTable('accounts').then(exists => {
  if (!exists) {
    knex.schema.createTable('accounts', table => {
      table.string('id').primary();
      table.integer('user_id');
      table.string('bank_name');
      table.string('type');
      table.integer('current_balance');
      table.integer('limit');
      table.string('bank_id');
    }).then(() => console.log('created table accounts'))
  }
})

knex.schema.hasTable('schools').then(exists => {
  if (!exists) {
    knex.schema.createTable('schools', table => {
      table.increments('id').primary();
      table.string('name');
    }).then(() => console.log('created table schools'));
  }
})

knex.schema.hasTable('banks').then(exists => {
  if (!exists) {
    knex.schema.createTable('banks', table => {
      table.string('id').primary();
      table.string('access_token');
      table.integer('user_id');
      table.string('last_updated');
      table.string('previous_updated');
    }).then(() => console.log('created table banks'));
  }
})

knex.schema.hasTable('bills').then(exists => {
  if (!exists) {
    knex.schema.createTable('bills', table => {
      table.increments('id').primary();
      table.integer('user_id').references('users.id');
      table.integer('bill_category_id').references('bill_categories.id');
      table.string('description');
      table.decimal('amount',14,2);
      table.integer('bill_recurrence_id').references('bill_recurrence.id');
      table.date('start_date');
      table.date('end_date');
      table.date('last_paid_date');
      table.date('last_occurence_date');
      table.boolean('bill_status');
      table.boolean('alert');
    }).then(() => console.log('created table bills'))
  }
})

knex.schema.hasTable('bill_categories').then(exists => {
  if (!exists) {
    knex.schema.createTable('bill_categories', table => {
      table.increments('id').primary();
      table.string('name');
      table.integer('user_id').references('users.id');
    }).then(() => console.log('created table bill_categories'))
  }
})

knex.schema.hasTable('goals').then(exists => {
  if (!exists) {
    knex.schema.createTable('goals', table => {
      table.increments('id').primary();
      table.integer('user_id').references('users.id');
      table.string('description');
      table.string('amount');
      table.boolean('is_budget');
      table.date('start_date');
      table.date('end_date');
    }).then(() => console.log('created table goals'))
  }
})

knex.schema.hasTable('goal_categories').then(exists => {
  if (!exists) {
    knex.schema.createTable('goal_categories', table => {
      table.increments('id').primary();
      table.integer('goal_id').references('goals.id');
      table.string('name');
    }).then(() => console.log('created table goal_categories'))
  }
})

knex.schema.hasTable('goal_accounts').then(exists => {
  if (!exists) {
    knex.schema.createTable('goal_accounts', table => {
      table.increments('id').primary();
      table.integer('goal_id').references('goals.id');
      table.string('account_id').references('accounts.id');
    }).then(() => console.log('created table goal_accounts'))
  }
})

knex.schema.hasTable('goal_progress').then(exists => {
  if (!exists) {
    knex.schema.createTable('goal_progress', table => {
      table.increments('id').primary();
      table.integer('goal_id').references('goals.id');
      table.string('amount');
      table.date('date');
    }).then(() => console.log('created table goal_progress'))
  }
})

knex.schema.hasTable('monthly_balance').then(exists => {
  if (!exists) {
    knex.schema.createTable('monthly_balance', table => {
      table.increments('id').primary();
      table.string('account_id').references('accounts.id');
      table.string('amount');
      table.date('date');
    }).then(() => console.log('created table monthly_balance'))
  }
})

knex.schema.hasTable('bill_recurrence').then(exists => {
  if (!exists) {
    knex.schema
      .createTable('bill_recurrence', table => {
        table.increments('id').primary();
        table.string('recurrence_type');
      })
      .then(() => {
        console.log('created table bill_recurrence');
        return knex('bill_recurrence').insert([
          { id: 1, recurrence_type: 'None' },
          { id: 2, recurrence_type: 'Weekly' },
          { id: 3, recurrence_type: 'Biweekly'},
          { id: 4, recurrence_type: 'Monthly' },
          { id: 5, recurrence_type: 'Yearly' },
        ]).then(()=> console.log('created recurrence types: None, Weekly, Biweekly, Monthly, Yearly'));
      });
  }
});


knex.schema.hasTable('bill_payment_history').then(exists => {
  if (!exists) {
    knex.schema.createTable('bill_payment_history', table => {
      table.increments('id').primary();
      table.integer('bill_id').references('bills.id');
      table.integer('user_id').references('users.id');
      table.decimal('amount_paid',14,2);
      table.decimal('amount_due',14,2);
      table.date('paid_date');
      table.date('due_date');
      table.boolean('paid');
    }).then(() => console.log('created table bill_payment_history'))
  }
})



const db = require('bookshelf')(knex);

module.exports = { db, knex };
