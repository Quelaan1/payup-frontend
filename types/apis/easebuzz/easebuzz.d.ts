type InitiatePaymentRequest = {
  amount: number;
  productinfo: string;
  payment_mode: string;
};

type InitiatePaymentResponse = {
  status: number;
  data: string;
  error_desc: string;
};
