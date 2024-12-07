import { createSlice } from '@reduxjs/toolkit';

export interface UserDetailsState {
	loading: boolean;
	error: string | null;
}

const initialState: UserDetailsState = {
	loading: false,
	error: null,
};

export const userDetailsSlice = createSlice({
	name: 'user-details',
	initialState,
	reducers: {
		setError: (state, action) => {
			state.error = action.payload;
		},
		setLoading: (state, action) => {
			state.loading = action.payload;
		},
	},
});

export const {
	setError: setUserDetailsError,
	setLoading: setUserDetailsLoading,
} = userDetailsSlice.actions;

export default userDetailsSlice.reducer;
