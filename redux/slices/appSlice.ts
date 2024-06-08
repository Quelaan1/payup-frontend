import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
	firstLaunch: boolean;
}

const initialState: AppState = {
	firstLaunch: true,
};

export const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setFirstLaunch: (state, action: PayloadAction<boolean>) => {
			state.firstLaunch = action.payload;
		},
	},
});

export const { setFirstLaunch } = appSlice.actions;
export default appSlice.reducer;
