import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga/loginSaga';
import onboardSaga from './onboardSaga/onboardSaga';
import watchFetchTransactions from './transactionSaga/transactionSaga';
import watchFetchPayees from './payeeSaga/payeeSaga';

function* rootSaga() {
	yield all([
		loginSaga(),
		onboardSaga(),
		watchFetchPayees(),
		watchFetchTransactions(),
	]);
}

export default rootSaga;
