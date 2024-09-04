import { call, put, takeLatest } from 'redux-saga/effects';
import {
	fetchTransactionsStart,
	fetchTransactionsSuccess,
	fetchTransactionsFailure,
} from '../../slices/transactionSlice';
import { getTransactions } from '../../../utils/apis/transactions/transactions';

function* fetchTransactionsSaga() {
	try {
		const transactions: Transaction[] | undefined = yield call(getTransactions);
		if (transactions) {
			yield put(fetchTransactionsSuccess(transactions));
		} else {
			yield put(fetchTransactionsFailure('No transactions found'));
		}
	} catch (error) {
		yield put(
			fetchTransactionsFailure(
				error instanceof Error ? error.message : String(error)
			)
		);
	}
}

function* watchFetchTransactions() {
	yield takeLatest(fetchTransactionsStart.type, fetchTransactionsSaga);
}

export default watchFetchTransactions;
