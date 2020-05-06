import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionCreate {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  private balance: Balance;

  constructor() {
    this.transactions = [];
    this.balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    if (this.transactions.length > 0) {
      this.balance.income = 0;
      this.balance.outcome = 0;

      this.transactions.forEach(transaction => {
        if (transaction.type === 'income') {
          this.balance.income += transaction.value;
        } else if (transaction.type === 'outcome') {
          this.balance.outcome += transaction.value;
        }
      });
      this.balance.total = this.balance.income - this.balance.outcome;
    }

    return this.balance;
  }

  public create({ title, value, type }: TransactionCreate): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
