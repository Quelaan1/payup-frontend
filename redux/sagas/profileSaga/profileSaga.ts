import { call, put, select, takeLatest } from "redux-saga/effects";
import {
  fetchProfile,
  fetchProfileFailure,
  fetchProfileSuccess,
  setProfile,
  updateEmail,
  updateEmailFailure,
  updateEmailSuccess,
  updatePhoneNumber,
  updatePhoneNumberFailure,
  updatePhoneNumberSuccess,
} from "../../slices/profileSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { getProfile, updateProfile } from "../../../utils/apis/profile/profile";
import { parseProfileData } from "../../../utils/parsers/profile";

function* updateEmailSaga(action: PayloadAction<string>) {
  try {
    console.log("action", action.payload);

    const { id } = yield select((state) => state.profile);

    const profileData: UpdateProfileResponse = yield call(updateProfile, {
      id,
      email: action.payload,
    });

    const parsedProfileData = parseProfileData(profileData);

    yield put(setProfile(parsedProfileData));

    yield put(updateEmailSuccess());
  } catch (error) {
    yield put(updateEmailFailure(error));
  }
}

function* updatePhoneNumberSaga(action: PayloadAction<string>) {
  try {
    const { id } = yield select((state) => state.profile);

    const profileData: UpdateProfileResponse = yield call(updateProfile, {
      id,
      phone_number: action.payload,
    });

    const parsedProfileData = parseProfileData(profileData);

    yield put(setProfile(parsedProfileData));

    yield put(updatePhoneNumberSuccess());
  } catch (error) {
    yield put(updatePhoneNumberFailure(error));
  }
}

function* fetchProfileSaga() {
  try {
    const profileData: GetProfileResponse = yield call(getProfile);

    const parsedProfileData = parseProfileData(profileData);

    yield put(setProfile(parsedProfileData));

    yield put(fetchProfileSuccess());
  } catch (error) {
    yield put(fetchProfileFailure(error));
  }
}

export default function* watchProfileSaga() {
  yield takeLatest(fetchProfile.type, fetchProfileSaga);
  yield takeLatest(updateEmail.type, updateEmailSaga);
  yield takeLatest(updatePhoneNumber.type, updatePhoneNumberSaga);
}
