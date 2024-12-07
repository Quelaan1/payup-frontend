export const FETCH_PAYEES_START = 'payees/fetchPayeesStart';
export const DELETE_PAYEE_REQUEST = 'payees/deletePayeeStart';
export const ADD_PAYEE_REQUEST = 'payees/addPayeeStart';

export interface DeletePayeeAction {
	type: typeof DELETE_PAYEE_REQUEST;
	payload: DeletePayeeRequest;
}


type AddPayeeRequest = AddPayeeRequestUpi | AddPayeeRequestBank;

export interface AddPayeeAction {
	type: typeof ADD_PAYEE_REQUEST;
	payload: AddPayeeRequest;
}
