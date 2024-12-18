import { all } from "redux-saga/effects";
import loginSaga from "./loginSaga/loginSaga";
import onboardSaga from "./onboardSaga/onboardSaga";
import watchFetchTransactions from "./transactionSaga/transactionSaga";
import watchFetchPayees from "./payeeSaga/payeeSaga";
import profileSaga from "./profileSaga/profileSaga";

function* rootSaga() {
  yield all([
    loginSaga(),
    onboardSaga(),
    watchFetchPayees(),
    watchFetchTransactions(),
    profileSaga(),
  ]);
}

export default rootSaga;
