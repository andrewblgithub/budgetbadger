require('dotenv').config()
const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.WORKER_PORT || 8001;
const cors = require('cors');
const worker = require('./fetchData.js');
const schedule = require('node-schedule')

const app = express();

app.use(cors());
app.use(bodyParser.json());

const plaidFetch = schedule.scheduleJob('30 * * * *', () => {
  console.log('WORKER - running parser');
  worker.parseTransactions();
})

const mergeTables = schedule.scheduleJob('12 * *', () => {
  console.log('WORKER - merging to main table');
  worker.submitToMain();
})

app.listen(port, () => {
  console.log('WORKER running on port ' + port)
})