const plaid = require('plaid');
const moment = require('moment');
const Promise = require('bluebird')
const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID;
const PLAID_SECRET = process.env.PLAID_SECRET;
const PLAID_PUBLIC_KEY = process.env.PLAID_PUBLIC_KEY;
const PLAID_ENV = process.env.PLAID_ENV || plaid.environments.sandbox;

const plaidClient = new plaid.Client(PLAID_CLIENT_ID, PLAID_SECRET, PLAID_PUBLIC_KEY, plaid.environments.sandbox);

const exchangeToken = (public_token) => {
  return new Promise((resolve, reject) => {
    plaidClient.exchangePublicToken(public_token || 'public-sandbox-e19fb01e-7942-40a7-81fd-ba9af519aecb', (err, res) => {
      if (res) resolve(res);
      else reject(err);
    })
  });
}

const getAccounts = (access_token) => {
  return new Promise((resolve, reject) => {
    plaidClient.getAccounts(access_token, async(err, res) => {
      if (res) resolve(res);
      else reject(err);
    })
  });
}

const getAccountsAndTransactions = (access_token, startDate) => {
  const currentDateTime = moment().format('YYYY-MM-DD');
  return new Promise((resolve, reject) => {
    plaidClient.getTransactions(access_token, startDate, currentDateTime, (err, res) => {
      if (res) resolve(res);
      else reject(err);
    })
  })
}

module.exports = {
  exchangeToken,
  getAccounts,
  getAccountsAndTransactions
}