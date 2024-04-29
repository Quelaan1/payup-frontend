import { createSlice } from '@reduxjs/toolkit';

interface PanState extends VerifyPanRequest, VerifyPanResponse {
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
	entity_name: '',
	internal_id: '',
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
			state.entity_name = '';
			state.internal_id = '';
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
			state.entity_name = action.payload.entity_name;
			state.internal_id = action.payload.internal_id;
			state.isVerifying = false;
		},
		PanVerifyFailure: (state, action) => {
			state.entity_id = '';
			state.entity_name = '';
			state.internal_id = '';
			state.message = '';
			state.panError = action.payload;
			state.error = action.payload;
			state.nameError = action.payload;
			state.dobError = action.payload;
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
