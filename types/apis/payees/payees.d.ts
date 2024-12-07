type Payee = {
  payee_id: string;
  name: string;
  upi_id?: string;
  bank_name?: string;
  ifsc?: string;
  account_number?: string;
  last_paid: string;
  phone_number: string;
};

type DeletePayeeRequest = {
  payee_id: string;
};

type AddPayeeRequestUpi = {
  upi_id: string;
  phone_number: string;
  pan_number: string;
};

type AddPayeeRequestBank = {
  phone_number: string;
  bank_name?: string;
  ifsc: string;
  account_number: string;
  pan_number: string;
};
