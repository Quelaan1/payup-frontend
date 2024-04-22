export const OTP_REQUEST = "loginOtp/loginOtpRequest";
export const OTP_VERIFY_REQUEST = "loginOtp/loginOtpVerify";

export interface OtpRequestAction {
  type: typeof OTP_REQUEST;
  payload: SendOTPRequest;
}

export interface OtpVerifyAction {
  type: typeof OTP_VERIFY_REQUEST;
  payload: VerifyOTPRequest;
}
