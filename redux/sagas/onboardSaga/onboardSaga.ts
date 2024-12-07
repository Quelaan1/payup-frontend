import { verifyPan } from "../../../utils/apis/onboard/pan";
import { call, put, select, takeLatest } from "redux-saga/effects";
import {
  AADHAAR_OTP_REQUEST,
  AADHAAR_OTP_VERIFY,
  PAN_VERIFY_REQUEST,
  USER_DETAILS_CONFIRM_REQUEST,
  PanVerifyRequestAction,
  PanVerifySuccessAction,
  SendAadhaarOtpRequestAction,
  VerifyAadhaarOtpRequestAction,
} from "./onboardSagaTypes";
import {
  PanVerifyFailure,
  PanVerifySuccess,
  setError,
} from "../../slices/panSlice";
import { router } from "expo-router";
import { setProfile } from "../../slices/profileSlice";
import { updateProfile } from "../../../utils/apis/profile/profile";
import { AxiosError, AxiosResponse } from "axios";
import {
  sendAadhaarOtp,
  verifyAadhaarOtp,
} from "../../../utils/apis/onboard/aadhaar";
import {
  AadhaarOtpFailure,
  AadhaarOtpSuccess,
  AadhaarVerifyFailure,
  AadhaarVerifySuccess,
} from "../../slices/aadhaarSlice";
import { setUserDetailsLoading } from "../../slices/userDetailsSlice";
import { parseProfileData } from "../../../utils/parsers/profile";

function* handlePanVerify(action: PanVerifyRequestAction) {
  try {
    const response: VerifyPanResponse & AxiosResponse = yield call(
      verifyPan,
      action.payload
    );

    const errors: any = {};
    if (response.name_as_per_pan_match === false) {
      errors.nameError = "Name does not match with PAN";
    }
    if (response.date_of_birth_match === false) {
      errors.dobError = "Date of birth does not match with PAN";
    }

    // If there are any errors, dispatch failure and exit
    if (Object.keys(errors).length > 0) {
      yield put(PanVerifyFailure(errors));
      return;
    }

    // If everything is fine, dispatch success and navigate
    yield put(setProfile(response));
    yield put(PanVerifySuccess(response));
    router.replace("/onboard/pre-aadhaar");
  } catch (error) {
    if ((error as AxiosError).response?.status === 422) {
      yield put(
        PanVerifyFailure({
          panError: "Invalid PAN/GSTIN",
        })
      );
    } else {
      yield put(
        PanVerifyFailure({
          error: "Error while verifying PAN,\n please try again later",
        })
      );
    }
  }
}

function* handleUserDetailsConfirm(action: PanVerifySuccessAction) {
  try {
    yield put(setUserDetailsLoading(true));

    const { id } = yield select((state) => state.profile);

    const profileData: UpdateProfileResponse = yield call(updateProfile, {
      ...action.payload,
      id,
    });

    const parsedProfileData = parseProfileData(profileData);

    yield put(setProfile(parsedProfileData));

    yield put(setUserDetailsLoading(false));

    router.replace("/auth/secure-app");
  } catch (error) {
    yield put(setUserDetailsLoading(false));
    yield put(setError("Something went wrong, please try again later"));
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
          aadhaarError:
            (err.response?.data as any)?.message || "Something went wrong",
        })
      );
    } else {
      yield put(
        AadhaarOtpFailure({
          error: "Something went wrong",
        })
      );
    }
  }
}

function* handleAadhaarOtpVerify(action: VerifyAadhaarOtpRequestAction) {
  try {
    const profileData: GetProfileResponse & AxiosResponse = yield call(
      verifyAadhaarOtp,
      action.payload
    );

    if (profileData?.status === 200) {
      const parsedProfileData = parseProfileData(profileData);

      yield put(setProfile(parsedProfileData));
      yield put(AadhaarVerifySuccess());

      router.replace(
        "/onboard/user-details?userName=" + parsedProfileData.name
      );
    }
  } catch (error) {
    const err = error as AxiosError;

    console.log(error);

    if ((err.response?.data as any)?.message) {
      yield put(
        AadhaarVerifyFailure({
          otpError: (err.response?.data as any)?.message,
        })
      );
    } else {
      yield put(
        AadhaarVerifyFailure({
          error: "Something went wrong",
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
