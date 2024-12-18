import { createSlice } from '@reduxjs/toolkit';

export interface PanState extends VerifyPanRequest, VerifyPanResponse {
	panError: string;
	isVerifying: boolean;
	error: string;
	nameError: string;
	dobError: string;
}

const initialState: Partial<PanState> = {
	entity_id: '',
	entity_type: 1,
	message: '',
	panError: '',
	isVerifying: false,
	error: '',
	nameError: '',
	dobError: '',
};

export const panSlice = createSlice({
	name: 'pan',
	initialState,
	reducers: {
		clearPan: (state) => {
			state.entity_id = '';
			state.panError = '';
			state.dobError = '';
			state.error = '';
			state.nameError = '';
			state.message = '';
			state.isVerifying = false;
		},
		PanVerifyRequest: (state, action) => {
			state.entity_id = action.payload.entity_id;
			state.isVerifying = true;
		},
		PanVerifySuccess: (state, action) => {
			state.entity_id = action.payload.entity_id;
			state.isVerifying = false;
		},
		PanVerifyFailure: (state, action) => {
			state.entity_id = '';
			state.message = '';
			if (action.payload.panError) {
				state.panError = action.payload.panError;
			}
			if (action.payload.nameError) {
				state.nameError = action.payload.nameError;
			}
			if (action.payload.dobError) {
				state.dobError = action.payload.dobError;
			}
			if (action.payload.error) {
				state.error = action.payload.error;
			}
			state.isVerifying = false;
		},
		setPanError: (state, action) => {
			state.panError = action.payload;
		},
		setNameError: (state, action) => {
			state.nameError = action.payload;
		},
		setError: (state, action) => {
			state.error = action.payload;
		},
		setIsVerifying: (state, action) => {
			state.isVerifying = action.payload;
		},
	},
});

export const {
	clearPan,
	PanVerifyRequest,
	PanVerifySuccess,
	PanVerifyFailure,
	setPanError,
	setIsVerifying,
	setError,
	setNameError,
} = panSlice.actions;

export default panSlice.reducer;
