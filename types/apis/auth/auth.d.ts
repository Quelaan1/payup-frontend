interface SendOTPResponse {
  message: "string";
}

interface SendOTPRequest {
  phoneNumber: string;
}

interface VerifyOTPRequest {
  phoneNumber: string;
  otp: string;
}

interface VerifyOTPResponse {
  message: "string";
}
