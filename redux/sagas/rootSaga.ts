import { all } from "redux-saga/effects";
import loginSaga from "./loginSaga/loginSaga";
import onboardSaga from "./onboardSaga/onboardSaga";

function* rootSaga() {
  yield all([loginSaga(), onboardSaga()]);
}

export default rootSaga;
