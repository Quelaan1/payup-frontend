import { createSlice } from '@reduxjs/toolkit';

interface PayeeState {
	payees: Payee[];
	loading: boolean;
	error: string | null;
}

const initialState: PayeeState = {
	payees: [
		
	],
	loading: false,
	error: null,
};

export const payeeSlice = createSlice({
	name: 'payees',
	initialState,
	reducers: {
		fetchPayeesStart: (state) => {
			state.loading = true;
			state.error = null;
		},
		fetchPayeesSuccess: (state, action) => {
			state.payees = action.payload;
			state.loading = false;
		},
		fetchPayeesFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		deletePayeeStart: (state, action) => {
			state.loading = true;
			state.error = null;
		},
		deletePayeeSuccess: (state) => {
			state.loading = false;
		},
		deletePayeeFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		addPayeeStart: (state, action) => {
			state.loading = true;
			state.error = null;
		},
		addPayeeSuccess: (state) => {
			state.loading = false;
		},
		addPayeeFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
	},
});

export const {
	fetchPayeesStart,
	fetchPayeesSuccess,
	fetchPayeesFailure,
	deletePayeeStart,
	deletePayeeSuccess,
	deletePayeeFailure,
	addPayeeStart,
	addPayeeSuccess,
	addPayeeFailure,
} = payeeSlice.actions;

export default payeeSlice.reducer;
