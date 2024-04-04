import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OtpState {
  isSendingSMS: boolean;
  isVerifying: boolean;
  loginOtpRequestError: string | null;
  loginOtpVerifyError: string | null;
}

const initialState: OtpState = {
  isSendingSMS: false,
  isVerifying: false,
  loginOtpRequestError: null,
  loginOtpVerifyError: null,
};

export const loginOtpSlice = createSlice({
  name: "loginOtp",
  initialState,
  reducers: {
    loginOtpRequest: (state, action: PayloadAction<SendOTPRequest>) => {
      state.isSendingSMS = true;
      state.loginOtpRequestError = null;
    },
    loginOtpRequestSuccess: (state) => {
      state.isSendingSMS = false;
    },
    loginOtpRequestFailure: (state, action: PayloadAction<string>) => {
      state.isSendingSMS = false;
      state.loginOtpRequestError = action.payload; // payload should be the error message
    },
    loginOtpRequestSetError: (state, action: PayloadAction<string>) => {
      state.loginOtpRequestError = action.payload;
    },
    loginOtpVerify: (state, action: PayloadAction<VerifyOTPRequest>) => {
      state.isVerifying = true;
      state.loginOtpRequestError = null;
    },
    loginOtpVerifySuccess: (state) => {
      state.isVerifying = false;
    },
    loginOtpVerifyFailure: (state, action: PayloadAction<string>) => {
      state.isVerifying = false;
      state.loginOtpRequestError = action.payload; // payload should be the error message
    },
    loginOtpVerifySetError: (state, action: PayloadAction<string>) => {
      state.loginOtpRequestError = action.payload;
    },
  },
});

export const {
  loginOtpRequest,
  loginOtpRequestSuccess,
  loginOtpRequestFailure,
  loginOtpRequestSetError,
  loginOtpVerify,
  loginOtpVerifySuccess,
  loginOtpVerifyFailure,
  loginOtpVerifySetError,
} = loginOtpSlice.actions;

export default loginOtpSlice.reducer;
