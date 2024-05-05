import { createSlice } from '@reduxjs/toolkit';
import { set } from 'lodash';

export interface AadhaarState
	extends SendAadhaarOtpRequest,
		SendAadhaarOtpResponse {
	isVerifying: boolean;
	isSendingOtp: boolean;
	error: string;
	aadhaarError: string | null;
	otpError: string | null;
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
		},
		AadhaarOtpSuccess: (state, action) => {
			state.entity_id = action.payload.entity_id;
			state.ref_id = action.payload.ref_id;
			state.isSendingOtp = false;
			state.step = 2;
		},
		AadhaarOtpFailure: (state, action) => {
			state.entity_id = '';
			state.ref_id = '';
			if (action.payload.error) {
				state.error = action.payload.error;
			}
			if (action.payload.aadhaarError) {
				state.aadhaarError = action.payload.aadhaarError;
			}
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
			if (action.payload.error) {
				state.error = action.payload.error;
			}
			if (action.payload.otpError) {
				state.otpError = action.payload.otpError;
			}
			state.isVerifying = false;
		},
		setAadhaarError: (state, action) => {
			state.aadhaarError = action.payload;
		},
		setOtpError: (state, action) => {
			state.otpError = action.payload;
		},
		setError: (state, action) => {
			state.error = action.payload;
		},
		setIsVerifying: (state, action) => {
			state.isVerifying = action.payload;
		},
		setStep: (state, action) => {
			state.step = action.payload;
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
	setStep,
	setError,
} = aadhaarSlice.actions;

export default aadhaarSlice.reducer;
