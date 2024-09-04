import { call, put, takeLatest } from 'redux-saga/effects';
import {
	fetchPayeesStart,
	fetchPayeesSuccess,
	fetchPayeesFailure,
	deletePayeeSuccess,
	deletePayeeFailure,
	addPayeeSuccess,
	addPayeeFailure,
} from '../../slices/payeeSlice';
import {
	getPayees,
	deletePayee,
	addPayee,
} from '../../../utils/apis/payees/payees';
import {
	DELETE_PAYEE_REQUEST,
	DeletePayeeAction,
	FETCH_PAYEES_START,
	ADD_PAYEE_REQUEST,
	AddPayeeAction,
} from './payeeSagaTypes';

function* fetchPayeesSaga() {
	try {
		const payees: Payee[] = yield call(getPayees);
		yield put(fetchPayeesSuccess(payees));
	} catch (error) {
		yield put(fetchPayeesFailure(error));
	}
}

function* deletePayeeSaga(action: DeletePayeeAction) {
	try {
		yield call(deletePayee, action.payload);
		yield put(deletePayeeSuccess());
		yield put(fetchPayeesStart());
	} catch (error) {
		yield put(deletePayeeFailure(error));
	}
}

function* addPayeeSaga(action: AddPayeeAction) {
	try {
		yield call(addPayee, action.payload);
		yield put(addPayeeSuccess());
		yield put(fetchPayeesStart());
	} catch (error) {
		yield put(addPayeeFailure(error));
	}
}

function* watchFetchPayees() {
	yield takeLatest(FETCH_PAYEES_START, fetchPayeesSaga);
	yield takeLatest(DELETE_PAYEE_REQUEST, deletePayeeSaga);
	yield takeLatest(ADD_PAYEE_REQUEST, addPayeeSaga);
}

export default watchFetchPayees;
