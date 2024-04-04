import {
  call,
  put,
  takeLatest,
  CallEffect,
  PutEffect,
} from "redux-saga/effects";
import { OtpRequestAction, OtpVerifyAction } from "./loginActionTypes";
import { sendOTP, verifyOTP } from "../../../utils/apis/auth/auth";
import {
  loginOtpRequest,
  loginOtpRequestFailure,
  loginOtpRequestSuccess,
  loginOtpVerify,
  loginOtpVerifyFailure,
  loginOtpVerifySuccess,
} from "../../slices/otpSlice";
import { router } from "expo-router";

function* handleOtpRequest(
  action: OtpRequestAction,
): Generator<CallEffect<SendOTPResponse> | PutEffect, void, SendOTPResponse> {
  try {
    const phoneNumber = action.payload.phoneNumber;
    yield call(sendOTP, phoneNumber);
    yield put(loginOtpRequestSuccess());
    router.push("/auth/otp-verification?phoneNumber=" + phoneNumber);
  } catch (error: any) {
    yield put(loginOtpRequestFailure(error));
  }
}

function* handleOtpVerification(action: OtpVerifyAction) {
  try {
    yield call(verifyOTP, action.payload);
    yield put(loginOtpVerifySuccess());
    router.push("/onboard/tax");
  } catch (error: any) {
    yield put(loginOtpVerifyFailure(error));
  }
}

export default function* loginSaga() {
  yield takeLatest(loginOtpRequest.type, handleOtpRequest);
  yield takeLatest(loginOtpVerify.type, handleOtpVerification);
}
