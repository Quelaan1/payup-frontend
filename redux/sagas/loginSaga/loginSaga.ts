import {
	call,
	put,
	takeLatest,
	CallEffect,
	PutEffect,
} from 'redux-saga/effects';
import {
	OTP_REQUEST,
	OTP_VERIFY_REQUEST,
	OtpRequestAction,
	OtpVerifyAction,
} from './loginSagaTypes';
import { sendOTP, verifyOTP } from '../../../utils/apis/auth/auth';
import {
	loginOtpRequestFailure,
	loginOtpRequestSuccess,
	loginOtpVerifyFailure,
	loginOtpVerifySuccess,
} from '../../slices/otpSlice';
import { router } from 'expo-router';
import { getProfile } from '../../../utils/apis/profile/profile';
import { setIsLoggedIn, setProfile } from '../../slices/profileSlice';
import { saveValueToSecureStore } from '../../../utils/expo-store/expo-store';

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
		router.push('/auth/otp-verification?phoneNumber=' + phoneNumber);
	} catch (error: any) {
		yield put(loginOtpRequestFailure(error));
	}
}

function* handleOtpVerification(action: OtpVerifyAction) {
	try {
		// Verify OTP
		const authData: VerifyOTPResponse = yield call(verifyOTP, action.payload);

		// Handle saving token
		yield call(saveValueToSecureStore, 'access_token', authData.access_token);
		yield call(saveValueToSecureStore, 'refresh_token', authData.refresh_token);

		// Get profile data
		const profileData: GetProfileResponse = yield call(getProfile);

		// Set profile data
		yield put(setProfile(profileData));

		// Handle success state
		yield put(loginOtpVerifySuccess());

		yield put(setIsLoggedIn(true));

		if (profileData.kyc_complete) {
			router.push('/auth/secure-app');
			return;
		} else if (!profileData.kyc_complete && profileData.kyc_pan) {
			router.push('/onboard/aadhaar');
			return;
		}

		// Redirect to next screen
		router.push('/onboard/pan');
	} catch (error: any) {
		yield put(loginOtpVerifyFailure(error));
	}
}

export default function* loginSaga() {
	yield takeLatest(OTP_REQUEST, handleOtpRequest);
	yield takeLatest(OTP_VERIFY_REQUEST, handleOtpVerification);
}
