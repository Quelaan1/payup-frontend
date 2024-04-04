import { createSlice } from '@reduxjs/toolkit';

interface ProfileState {
    id: string
    email: string
    first_name: string
    last_name: string
    onboarded: boolean
    kyc_complete: boolean
    kyc_pan: boolean
    kyc_uidai: boolean
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
    },
});

export const {
    setProfile,
    clearProfile,
} = profileSlice.actions;

export default profileSlice.reducer;
