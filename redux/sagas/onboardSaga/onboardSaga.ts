import { verifyPan } from "../../../utils/apis/onboard/pan";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  PAN_VERIFY_REQUEST,
  PanVerifyRequestAction,
  PanVerifySuccessAction,
} from "./onboardSagaTypes";
import { PanVerifyFailure, PanVerifySuccess } from "../../slices/panSlice";
import { router } from "expo-router";

function* handlePanVerify(action: PanVerifyRequestAction) {
  try {
    const response: VerifyPanResponse = yield call(verifyPan, action.payload);
    yield put(PanVerifySuccess(response));
    router.push("/onboard/user-details?userName=" + response.entity_name);
  } catch (error) {
    yield put(PanVerifyFailure(error));
  }
}

function* handleUserDetailsConfirm(action: PanVerifySuccessAction) {
  router.push("/onboard/aadhaar");
}

export default function* onboardSaga() {
  yield takeLatest(PAN_VERIFY_REQUEST, handlePanVerify);
}
