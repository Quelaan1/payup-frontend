import { createSlice } from '@reduxjs/toolkit';

interface AuthState {}

const initialState: AuthState = {};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: (builder) => {},
});

export const {} = authSlice.actions;

export default authSlice.reducer;
