type Payee = {
	payee_id: string;
	name: string;
	bankName: string;
	accountNumber: string;
	lastPaid: string;
	phoneNumber: string;
};

type DeletePayeeRequest = {
	payee_id: string;
};

type AddPayeeRequest = Payee;
