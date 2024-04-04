// actionTypes.ts
export const OTP_REQUEST = "OTP_REQUEST";
export const OTP_VERIFY_REQUEST = "OTP_VERIFY_REQUEST";

export interface OtpRequestAction {
  type: typeof OTP_REQUEST;
  payload: SendOTPRequest;
}

export interface OtpVerifyAction {
  type: typeof OTP_VERIFY_REQUEST;
  payload: VerifyOTPRequest;
}
