import { createSlice } from '@reduxjs/toolkit';

export interface AuthState {
	unlocked: boolean;
}

const initialState: AuthState = {
	unlocked: false,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUnlocked: (state, action) => {
			state.unlocked = action.payload;
		},
	},
});

export const { setUnlocked } = authSlice.actions;

export default authSlice.reducer;
