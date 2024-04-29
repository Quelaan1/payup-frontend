import { createPan, verifyPan } from '../../../utils/apis/onboard/pan';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
	AADHAAR_OTP_REQUEST,
	AADHAAR_OTP_VERIFY,
	PAN_VERIFY_REQUEST,
	USER_DETAILS_CONFIRM_REQUEST,
	PanVerifyRequestAction,
	PanVerifySuccessAction,
	SendAadhaarOtpRequestAction,
	VerifyAadhaarOtpRequestAction,
} from './onboardSagaTypes';
import { PanVerifyFailure, PanVerifySuccess } from '../../slices/panSlice';
import { router } from 'expo-router';
import { setProfile } from '../../slices/profileSlice';
import { updateProfile } from '../../../utils/apis/profile/profile';
import { AxiosError, AxiosResponse } from 'axios';
import {
	sendAadhaarOtp,
	verifyAadhaarOtp,
} from '../../../utils/apis/onboard/aadhaar';
import {
	AadhaarOtpFailure,
	AadhaarOtpSuccess,
	AadhaarVerifyFailure,
	AadhaarVerifySuccess,
} from '../../slices/aadhaarSlice';

function* handlePanVerify(action: PanVerifyRequestAction) {
	try {
		const response: VerifyPanResponse & AxiosResponse = yield call(
			verifyPan,
			action.payload
		);

		if (response) {
			if (response.status === 200) {
				if (response.name_as_per_pan_match === false) {
					yield put(
						PanVerifyFailure({
							nameEror: 'Name does not match with PAN',
						})
					);
					return;
				}

				if (response.date_of_birth_match === false) {
					yield put(
						PanVerifyFailure({
							dobError: 'Date of birth does not match with PAN',
						})
					);
					return;
				}

				yield put(PanVerifySuccess(response));
				router.push('/onboard/user-details?userName=' + response.entity_name);
			}
		}
	} catch (error) {
		if ((error as AxiosError).response?.status === 422) {
			yield put(
				PanVerifyFailure({
					panError: 'Invalid PAN/GSTIN',
				})
			);
		} else {
			yield put(
				PanVerifyFailure({
					error: 'Error while verifying PAN, please try again later',
				})
			);
		}
	}
}

function* handleUserDetailsConfirm(action: PanVerifySuccessAction) {
	try {
		const { entity_id, entity_type, entity_name, internal_id } = yield select(
			(state) => state.pan
		);

		const createPanResponse: GetProfileResponse = yield call(createPan, {
			entity_id,
			entity_type,
			entity_name,
			internal_id,
		});
		yield put(setProfile(createPanResponse));

		const profileResponse: UpdateProfileResponse = yield call(updateProfile, {
			...action.payload,
			id: createPanResponse.id,
		});
		yield put(setProfile(profileResponse));

		router.push('/onboard/pre-aadhaar');
	} catch (error) {
		console.error(error);
	}
}

function* handleAadhaarOtpRequest(action: SendAadhaarOtpRequestAction) {
	try {
		const response: SendAadhaarOtpResponse & AxiosResponse = yield call(
			sendAadhaarOtp,
			action.payload
		);

		if (response?.status === 200) {
			if (response.ref_id) {
				yield put(AadhaarOtpSuccess(response));
			} else {
				yield put(
					AadhaarOtpFailure({
						aadhaarError: response.message,
					})
				);
			}
		}
	} catch (error) {
		const err = error as AxiosError;

		if (
			err.status === 403 ||
			err.status === 422 ||
			err.status === 500 ||
			err.status === 503
		) {
			yield put(
				AadhaarOtpFailure({
					error: (err.response?.data as any)?.message || 'Something went wrong',
				})
			);
		} else {
			yield put(
				AadhaarOtpFailure({
					error: 'Something went wrong',
				})
			);
		}
	}
}

function* handleAadhaarOtpVerify(action: VerifyAadhaarOtpRequestAction) {
	try {
		const response: GetProfileResponse & AxiosResponse = yield call(
			verifyAadhaarOtp,
			action.payload
		);

		if (response?.status === 200) {
			yield put(setProfile(response));
			yield put(AadhaarVerifySuccess());

			router.push('/auth/secure-app');
		}
	} catch (error) {
		const err = error as AxiosError;

		if ((err.response?.data as any)?.message) {
			yield put(
				AadhaarVerifyFailure({
					otpError: (err.response?.data as any)?.message,
				})
			);
		} else {
			yield put(
				AadhaarVerifyFailure({
					error: 'Something went wrong',
				})
			);
		}
	}
}

export default function* onboardSaga() {
	yield takeLatest(PAN_VERIFY_REQUEST, handlePanVerify);
	yield takeLatest(USER_DETAILS_CONFIRM_REQUEST, handleUserDetailsConfirm);
	yield takeLatest(AADHAAR_OTP_REQUEST, handleAadhaarOtpRequest);
	yield takeLatest(AADHAAR_OTP_VERIFY, handleAadhaarOtpVerify);
}
