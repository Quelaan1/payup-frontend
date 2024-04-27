import { createPan, verifyPan } from '../../../utils/apis/onboard/pan';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
	PAN_VERIFY_REQUEST,
	PanVerifyRequestAction,
	PanVerifySuccessAction,
	USER_DETAILS_CONFIRM_REQUEST,
} from './onboardSagaTypes';
import { PanVerifyFailure, PanVerifySuccess } from '../../slices/panSlice';
import { router } from 'expo-router';
import { setProfile } from '../../slices/profileSlice';
import { updateProfile } from '../../../utils/apis/profile/profile';

function* handlePanVerify(action: PanVerifyRequestAction) {
	try {
		const response: VerifyPanResponse = yield call(verifyPan, action.payload);
		yield put(PanVerifySuccess(response));
		router.push('/onboard/user-details?userName=' + response.entity_name);
	} catch (error) {
		yield put(PanVerifyFailure(error));
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

export default function* onboardSaga() {
	yield takeLatest(PAN_VERIFY_REQUEST, handlePanVerify);
	yield takeLatest(USER_DETAILS_CONFIRM_REQUEST, handleUserDetailsConfirm);
}
