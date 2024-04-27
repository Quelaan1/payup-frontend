import { createSlice } from '@reduxjs/toolkit';

interface ProfileState extends GetProfileResponse {
	isLoggedIn: boolean;
}

const initialState: ProfileState = {
	id: '',
	email: '',
	first_name: '',
	last_name: '',
	onboarded: false,
	kyc_complete: false,
	kyc_pan: false,
	kyc_uidai: false,
	isLoggedIn: false,
};

export const profileSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {
		setProfile: (state, action) => {
			state.id = action.payload.id;
			state.email = action.payload.email;
			state.first_name = action.payload.first_name;
			state.last_name = action.payload.last_name;
			state.onboarded = action.payload.onboarded;
			state.kyc_complete = action.payload.kyc_complete;
			state.kyc_pan = action.payload.kyc_pan;
			state.kyc_uidai = action.payload.kyc_uidai;
		},
		clearProfile: (state) => {
			state.id = '';
			state.email = '';
			state.first_name = '';
			state.last_name = '';
			state.onboarded = false;
			state.kyc_complete = false;
			state.kyc_pan = false;
			state.kyc_uidai = false;
		},
		UserDetailsConfirmRequest: (state, action) => {},
		setIsLoggedIn: (state, action) => {
			state.isLoggedIn = action.payload;
		},
	},
});

export const {
	setProfile,
	clearProfile,
	UserDetailsConfirmRequest,
	setIsLoggedIn,
} = profileSlice.actions;

export default profileSlice.reducer;
