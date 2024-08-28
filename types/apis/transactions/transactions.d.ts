type Transaction = {
  id: number;
  name: string;
  date: string;
  amount: number;
};

type Transactions = {
  [month: string]: Transaction[];
};
