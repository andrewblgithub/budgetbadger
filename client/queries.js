import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const TRANS_ACC_QUERY = gql`
  query TRANS_ACC_QUERY($user_id: Int!) {
    getTransactions(user_id: $user_id) {
        amount
        name
        category
        date
        account {
          id
          type
          bank_name
        }
      }
    getAccounts(user_id: $user_id) {
      type
      bank_name
      id
    }
    getUser(id: $user_id) {
      accounts {
        bank_name
        id
        monthly_balance {
          amount
          date
        }
      }
    }
  }`;


const ACCOUNTS_QUERY = gql`
query accountsQuery($user_id: Int!) {
  getAccounts(user_id: $user_id) {
    bank_name
    type
    current_balance
  }
}`

const UPDATE_TRANSACTIONS = gql`
  mutation UPDATE_TRANSACTIONS($user_id: Int!){
    getUpdatedTransactions(user_id: $user_id) {
      id
    }
  }`;

const CREATE_TRANSACTION = gql`
  mutation CREATE_TRANSACTION($user_id: Int!, $amount: Float!, $date: String!, $category: String!, $name: String!, $account_id: String!) {
    createTransaction(user_id: $user_id, amount: $amount, date: $date, category: $category, name: $name, account_id: $account_id) {
      id
    }
  }
  `

const NEW_BANK = gql`
  mutation NEW_BANK($user_id: Int!, $public_key: String!) {
    createBankAccount(user_id: $user_id, public_key: $public_key)
  }`;

const DASH_QUERY = gql`
  query DASH_QUERY($user_id: Int!) {
    getTransactions(user_id: $user_id) {
      amount
      name
      account {
        type
      }
      category
    }
    getAccounts(user_id: $user_id) {
      type
      bank_name
      current_balance
    }
    getLoans(user_id: $user_id) {
      id
      name
      amount
      interest_rate
      inception_date
      end_date
    }
    getGoals(user_id: $user_id) {
      id
      description
      amount
      is_budget
      start_date
      end_date
      goal_progress {
        amount
        date
      }
      goal_categories {
        name
      }
      goal_accounts {
        account {
          bank_name
          type
          current_balance
        }
      }
    }
    getBillPaymentHistory(user_id: $user_id) {
      id
      user_id
      paid
      paid_date
      due_date
      amount_paid
      amount_due
      bills {
        id
        user_id
        bill_category_id
        description
        amount 
        bill_recurrence_id 
        start_date
        end_date
        last_paid_date
        last_occurence_date
        bill_status
        alert
        bill_category {
          id
          name
        }
        bill_recurrence {
          id
          recurrence_type
        }
      }
    }
  }`;

const CREATE_BILL = gql`
  mutation createBill($user_id: Int!, $bill_category_id: Int!, $description: String!, $amount: Float!, $bill_recurrence_id: Int!, $start_date: Date!, $end_date: Date!, $last_paid_date: Date, $last_occurence_date: Date, $bill_status: Boolean, $alert: Boolean) {
    createBill(user_id: $user_id, bill_category_id: $bill_category_id, description: $description, amount: $amount, bill_recurrence_id: $bill_recurrence_id, start_date: $start_date, end_date: $end_date, last_paid_date: $last_paid_date, last_occurence_date: $last_occurence_date, bill_status: $bill_status, alert: $alert) {
      id
    }
  }`;


const UPDATE_BILL = gql`
  mutation updateBill($id: Int!, $user_id: Int, $bill_category_id: Int, $description: String, $amount: Float, $bill_recurrence_id: Int, $start_date: Date, $end_date: Date, $last_paid_date: Date, $last_occurence_date: Date, $bill_status: Boolean, $alert: Boolean) {
    updateBill(id: $id, user_id: $user_id, bill_category_id: $bill_category_id, description: $description, amount: $amount, bill_recurrence_id: $bill_recurrence_id, start_date: $start_date, end_date: $end_date, last_paid_date: $last_paid_date, last_occurence_date: $last_occurence_date, bill_status: $bill_status, alert: $alert) {
      id
    }
  }`;

const DELETE_BILL = gql`
  mutation deleteBill($id: Int!) {
    deleteBill(id: $id)
  }`;

const CREATE_BILL_CATEGORY = gql`
  mutation createBillCategory($name: String!, $user_id: Int!) {
    createBillCategory(name: $name, user_id: $user_id) {
      id
    }
  }`;

const ADD_LOAN = gql`
  mutation ADD_LOAN($name: String!, $amount: Float!, $interest_rate: Float!, $inception_date: String!, $end_date: String!, $user_id: Int!) {
    createLoan(name: $name, amount: $amount, interest_rate: $interest_rate, inception_date: $inception_date, end_date: $end_date, user_id: $user_id) {
      id
    }
  }`;

const BILL_PAYMENT_HISTORY_QUERY = gql`
query getBillPaymentHistory($user_id: Int!, $bill_id: Int) {
  getBillPaymentHistory(user_id: $user_id, bill_id: $bill_id) {
    id
    user_id
    paid
    paid_date
    due_date
    amount_paid
    amount_due
    bills {
      id
      user_id
      bill_category_id
      description
      amount 
      bill_recurrence_id 
      start_date
      end_date
      last_paid_date
      last_occurence_date
      bill_status
      alert
      bill_category {
        id
        name
      }
      bill_recurrence {
        id
        recurrence_type
      }
    }
  } 
  getBillCategories(user_id: $user_id) {
    id
    name
  }
  getBillRecurrence(id: 0) {
    id
    recurrence_type
  }
  getAccounts(user_id: $user_id) {
    bank_name
    type
    current_balance
    limit
  }
}`;

const CREATE_BILL_PAYMENT_HISTORY = gql`
mutation createBillPaymentHistory($bill_id: Int!, $user_id: Int!, $amount_paid: Float, $amount_due: Float, $paid_date: Date, $due_date: Date!, $paid: Boolean!) {
  createBillPaymentHistory(bill_id: $bill_id, user_id: $user_id , amount_paid: $amount_paid, amount_due:$amount_due, paid_date: $paid_date, due_date: $due_date, paid: $paid) {
    id
  }
}`;

const UPDATE_BILL_PAYMENT_HISTORY = gql`
mutation updateBillPaymentHistory($id:Int!, $user_id: Int,  $bill_id: Int, $amount_paid: Float, $amount_due: Float, $paid_date: Date, $due_date: Date, $paid: Boolean) {
  updateBillPaymentHistory(id:$id, user_id: $user_id,  bill_id: $bill_id, amount_paid: $amount_paid, amount_due: $amount_due, paid_date: $paid_date, due_date: $due_date, paid: $paid) {
    id
  }
}`
const LOANS_QUERY = gql`
  query LOANS_QUERY($user_id: Int!){
    getLoans(user_id: $user_id) {
      id
      name
      amount
      interest_rate
      inception_date
      end_date
    }
  }`;

const DELETE_LOAN = gql`
  mutation deleteLoan($id: Int!) {
    deleteLoan(id: $id)
  }`;


const GOALS_QUERY = gql`
  query GOALS_QUERY($user_id: Int!) {
    getGoals(user_id: $user_id) {
      id
      description
      amount
      is_budget
      start_date
      end_date
      goal_progress {
        amount
        date
      }
      goal_categories {
        name
      }
      goal_accounts {
        account {
          bank_name
          type
          current_balance
        }
      }
    }
    getAccounts(user_id: $user_id) {
      id
      bank_name
    }
    getTransactions(user_id: $user_id) {
      category
    }
  }`;

const CREATE_GOAL = gql`
  mutation CREATE_GOAL(
    $user_id: Int!,
    $description: String!,
    $amount: String!,
    $is_budget: Boolean!,
    $start_date: Date!,
    $end_date: Date,
    $accounts: [String],
    $categories: [String]
  ) {
    createGoal(
      user_id: $user_id,
      description: $description,
      amount: $amount,
      is_budget: $is_budget,
      start_date: $start_date,
      end_date: $end_date,
      accounts: $accounts,
      categories: $categories
    ) {
      id
    }
  }`;


const GET_USER_BALANCES = gql`
  query GET_USER_BALANCES($id: Int!) {
    getUser(id: $id) {
      accounts {
        bank_name
        monthly_balance {
          amount
          date
        }
      }
    }
  }`;


export {
  TRANS_ACC_QUERY,
  ACCOUNTS_QUERY,
  UPDATE_TRANSACTIONS,
  CREATE_TRANSACTION,
  NEW_BANK,
  DASH_QUERY,
  UPDATE_BILL,
  DELETE_BILL,
  CREATE_BILL,
  CREATE_BILL_CATEGORY,
  BILL_PAYMENT_HISTORY_QUERY,
  CREATE_BILL_PAYMENT_HISTORY,
  UPDATE_BILL_PAYMENT_HISTORY,
  ADD_LOAN,
  LOANS_QUERY,
  DELETE_LOAN,
  GOALS_QUERY,
  GET_USER_BALANCES,
  CREATE_GOAL
};
