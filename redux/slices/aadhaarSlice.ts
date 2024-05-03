import { createSlice } from '@reduxjs/toolkit';

interface AadhaarState extends SendAadhaarOtpRequest, SendAadhaarOtpResponse {
	isVerifying: boolean;
	isSendingOtp: boolean;
	error: string;
	aadhaarError: string;
	otpError: string;
	step: 1 | 2;
}

const initialState: Partial<AadhaarState> = {
	entity_id: '',
	entity_type: 2,
	error: '',
	aadhaarError: '',
	otpError: '',
	isVerifying: false,
	isSendingOtp: false,
	step: 1,
};

export const aadhaarSlice = createSlice({
	name: 'aadhaar',
	initialState,
	reducers: {
		clearAadhaar: (state) => {
			state.entity_id = '';
			state.message = '';
			state.error = '';
			state.aadhaarError = '';
			state.otpError = '';
			state.isVerifying = false;
			state.isSendingOtp = false;
			state.step = 1;
		},
		AadhaarOtpRequest: (state, action) => {
			state.entity_id = action.payload.entity_id;
			state.isSendingOtp = true;
			state.step = 2;
		},
		AadhaarOtpSuccess: (state, action) => {
			state.entity_id = action.payload.entity_id;
			state.ref_id = action.payload.ref_id;
			state.isSendingOtp = false;
		},
		AadhaarOtpFailure: (state, action) => {
			state.entity_id = '';
			state.ref_id = '';
			state.error = action.payload;
			state.aadhaarError = action.payload;
			state.isSendingOtp = false;
			state.step = 1;
		},
		AadhaarVerifyRequest: (state, action) => {
			state.isVerifying = true;
		},
		AadhaarVerifySuccess: (state) => {
			state.isVerifying = false;
		},
		AadhaarVerifyFailure: (state, action) => {
			state.entity_id = '';
			state.ref_id = '';
			state.error = action.payload;
			state.otpError = action.payload;
			state.isVerifying = false;
		},
		setAadhaarError: (state, action) => {
			state.aadhaarError = action.payload;
		},
		setOtpError: (state, action) => {
			state.otpError = action.payload;
		},
		setIsVerifying: (state, action) => {
			state.isVerifying = action.payload;
		},
	},
});

export const {
	clearAadhaar,
	AadhaarOtpRequest,
	AadhaarOtpSuccess,
	AadhaarOtpFailure,
	AadhaarVerifySuccess,
	AadhaarVerifyFailure,
	setAadhaarError,
	setOtpError,
	setIsVerifying,
	AadhaarVerifyRequest,
} = aadhaarSlice.actions;

export default aadhaarSlice.reducer;
