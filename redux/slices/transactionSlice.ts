import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TransactionState {
	transactions: Transaction[];
	loading: boolean;
	error: string | null;
}

const initialState: TransactionState = {
	transactions: [],
	loading: false,
	error: null,
};

export const transactionSlice = createSlice({
	name: 'transactions',
	initialState,
	reducers: {
		fetchTransactionsStart: (state) => {
			state.loading = true;
		},
		fetchTransactionsSuccess: (state, action: PayloadAction<Transaction[]>) => {
			state.transactions = action.payload;
			state.loading = false;
		},
		fetchTransactionsFailure: (state, action: PayloadAction<string>) => {
			state.error = action.payload;
			state.loading = false;
		},
	},
});

export const {
	fetchTransactionsStart,
	fetchTransactionsSuccess,
	fetchTransactionsFailure,
} = transactionSlice.actions;

export default transactionSlice.reducer;
