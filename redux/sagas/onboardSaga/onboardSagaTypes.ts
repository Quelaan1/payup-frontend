export const PAN_VERIFY_REQUEST = 'pan/PanVerifyRequest';
export const PAN_VERIFY_SUCCESS = 'pan/PanVerifySuccess';
export const USER_DETAILS_CONFIRM_REQUEST = 'profile/UserDetailsConfirmRequest';
export const AADHAAR_OTP_REQUEST = 'aadhaar/AadhaarOtpRequest';
export const AADHAAR_OTP_VERIFY = 'aadhaar/AadhaarOtpVerify';

export interface PanVerifyRequestAction {
	type: typeof PAN_VERIFY_REQUEST;
	payload: VerifyPanRequest;
}

export interface PanVerifySuccessAction {
	type: typeof PAN_VERIFY_SUCCESS;
	payload: UpdateProfileRequest;
}

export interface SendAadhaarOtpRequestAction {
	type: typeof AADHAAR_OTP_REQUEST;
	payload: SendAadhaarOtpRequest;
}

export interface VerifyAadhaarOtpRequestAction {
	type: typeof AADHAAR_OTP_VERIFY;
	payload: SendAadhaarOtpRequest;
}
