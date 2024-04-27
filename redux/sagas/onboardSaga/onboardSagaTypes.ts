export const PAN_VERIFY_REQUEST = 'pan/PanVerifyRequest';
export const PAN_VERIFY_SUCCESS = 'pan/PanVerifySuccess';
export const USER_DETAILS_CONFIRM_REQUEST = 'profile/UserDetailsConfirmRequest';

export interface PanVerifyRequestAction {
	type: typeof PAN_VERIFY_REQUEST;
	payload: VerifyPanRequest;
}

export interface PanVerifySuccessAction {
	type: typeof PAN_VERIFY_SUCCESS;
	payload: UpdateProfileRequest;
}
