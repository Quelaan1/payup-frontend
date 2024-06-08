import { createSlice } from '@reduxjs/toolkit';

export interface ProfileState extends Profile {
	isLoggedIn: boolean;
	appLocked: boolean;
	user_id: string;
}

const initialState: ProfileState = {
	id: '',
	user_id: '',
	email: '',
	name: '',
	onboarded: false,
	kyc_complete: false,
	kyc_pan: false,
	kyc_uidai: false,
	isLoggedIn: false,
	appLocked: false,
};

export const profileSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {
		setProfile: (state, action) => {
			state.id = action.payload.id;
			state.user_id = action.payload.user_id;
			state.email = action.payload.email;
			state.name = action.payload.name;
			state.onboarded = action.payload.onboarded;
			state.kyc_complete = action.payload.kyc_complete;
			state.kyc_pan = action.payload.kyc_pan;
			state.kyc_uidai = action.payload.kyc_uidai;
		},
		clearProfile: (state) => {
			state.id = '';
			state.user_id = '';
			state.email = '';
			state.name = '';
			state.onboarded = false;
			state.kyc_complete = false;
			state.isLoggedIn = false;
			state.appLocked = false;
			state.kyc_pan = false;
			state.kyc_uidai = false;
		},
		UserDetailsConfirmRequest: (state, action) => {},
		setIsLoggedIn: (state, action) => {
			state.isLoggedIn = action.payload;
		},
		setAppLocked: (state, action) => {
			state.appLocked = action.payload;
		},
	},
});

export const {
	setProfile,
	clearProfile,
	UserDetailsConfirmRequest,
	setIsLoggedIn,
	setAppLocked,
} = profileSlice.actions;

export default profileSlice.reducer;
