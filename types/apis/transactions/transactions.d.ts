type Transaction = {
  transaction_id: string;
  name: string;
  date: string;
  amount: number;
};

type Transactions = {
  [month: string]: Transaction[];
};
