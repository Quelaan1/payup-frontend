export const PAN_VERIFY_REQUEST = "onboard/PanVerifyRequest";
export const PAN_VERIFY_SUCCESS = "onboard/PanVerifySuccess";

export interface PanVerifyRequestAction {
  type: typeof PAN_VERIFY_REQUEST;
  payload: VerifyPanRequest;
}

export interface PanVerifySuccessAction {
  type: typeof PAN_VERIFY_SUCCESS;
  payload: CreatePanRequest;
}
