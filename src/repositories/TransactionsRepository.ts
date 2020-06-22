import Transaction from '../models/Transaction';


interface TransactionDTO{
  title:string,
  value:number,
  type:'income' | 'outcome'
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions
  }

  public getBalance(): Balance {

    const income = this.transactions.filter((val)=>{
      return val.type === 'income'
    })
    .map((val)=>{
        return val.value
    })
    .reduce((a,b)=>{
        return a+b
    })


    const outcome = this.transactions.filter((val)=>{
      return val.type === 'outcome'
    })
    .map((val)=>{
        return val.value
    })
    .reduce((a,b)=>{
        return a+b
    })

    const total = income - outcome



    const balance:Balance = {
      income,
      outcome,
      total
    }

    return balance  
  }

  public create({title,value,type}:TransactionDTO): Transaction {

    const transaction = new Transaction({title,value,type })

    this.transactions.push(transaction)
    return transaction

  }
}

export default TransactionsRepository;
