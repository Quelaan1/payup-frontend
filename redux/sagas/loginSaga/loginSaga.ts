import {
  call,
  put,
  takeLatest,
  CallEffect,
  PutEffect,
} from "redux-saga/effects";
import {
  OTP_REQUEST,
  OTP_VERIFY_REQUEST,
  OtpRequestAction,
  OtpVerifyAction,
} from "./loginSagaTypes";
import { sendOTP, verifyOTP } from "../../../utils/apis/auth/auth";
import {
  loginOtpRequestFailure,
  loginOtpRequestSuccess,
  loginOtpVerifyFailure,
  loginOtpVerifySuccess,
} from "../../slices/otpSlice";
import { router } from "expo-router";
import { getProfile } from "../../../utils/apis/profile/profile";
import { setIsLoggedIn, setProfile } from "../../slices/profileSlice";
import { saveValueToSecureStore } from "../../../utils/expo-store/expo-store";
import { handleInitialRegistration } from "../../../utils/initialRegistration/initialRegistration";
import { parseProfileData } from "../../../utils/parsers/profile";

function* handleOtpRequest(
  action: OtpRequestAction
): Generator<CallEffect<SendOTPResponse> | PutEffect, void, SendOTPResponse> {
  try {
    const phoneNumber = action.payload.phoneNumber;

    // Send OTP Request
    yield call(sendOTP, phoneNumber);

    // Handle success state
    yield put(loginOtpRequestSuccess());

    // Redirect to next screen
    router.push("/auth/otp-verification?phoneNumber=" + phoneNumber);
  } catch (error: any) {
    yield put(loginOtpRequestFailure(error));
  }
}

function* handleOtpVerification(action: OtpVerifyAction) {
  try {
    // Verify OTP
    const authData: VerifyOTPResponse = yield call(verifyOTP, action.payload);

    // Handle saving token
    yield call(saveValueToSecureStore, "access_token", authData.access_token);
    yield call(saveValueToSecureStore, "refresh_token", authData.refresh_token);

    // Get profile data
    const profileData: GetProfileResponse = yield call(getProfile);

    console.log("Profile data inside saga: ", profileData);

    const parsedProfileData = parseProfileData(profileData);

    // Set profile data
    yield put(setProfile(parsedProfileData));

    // Handle success state
    yield put(loginOtpVerifySuccess());

    yield put(setIsLoggedIn(true));

    const multiDeviceCheck: boolean = yield call(
      handleInitialRegistration,
      profileData.user_id
    );

    console.log("MultiDeviceCheck inside saga: ", multiDeviceCheck);

    if (!multiDeviceCheck) {
      router.replace("/auth/multi-device");
      return;
    }

    if (profileData.profile.kyc_complete) {
      router.replace("/auth/secure-app");
      return;
    } else if (
      !profileData.profile.kyc_complete &&
      profileData.profile.kyc_pan
    ) {
      router.replace("/onboard/aadhaar");
      return;
    }

    // Redirect to next screen
    router.replace("/onboard/pan");
  } catch (error: any) {
    yield put(loginOtpVerifyFailure(error));
  }
}

export default function* loginSaga() {
  yield takeLatest(OTP_REQUEST, handleOtpRequest);
  yield takeLatest(OTP_VERIFY_REQUEST, handleOtpVerification);
}
