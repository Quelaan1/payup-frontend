import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Add this import
import { PURGE } from "redux-persist";

export interface ProfileState extends Profile {
  isLoggedIn: boolean;
  appLocked: boolean;
  user_id: string;
  error: string;
  loading: boolean;
  isEmailModalVisible: boolean;
  isPhoneNumberModalVisible: boolean;
}

const initialState: ProfileState = {
  id: "",
  user_id: "",
  email: "",
  name: "",
  phone_number: "",
  onboarded: false,
  kyc_complete: false,
  kyc_pan: false,
  kyc_uidai: false,
  isLoggedIn: false,
  appLocked: false,
  error: "",
  loading: false,
  isEmailModalVisible: false,
  isPhoneNumberModalVisible: false,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.id = action.payload.id;
      state.user_id = action.payload.user_id;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.phone_number = action.payload.phone_number;
      state.onboarded = action.payload.onboarded;
      state.kyc_complete = action.payload.kyc_complete;
      state.kyc_pan = action.payload.kyc_pan;
      state.kyc_uidai = action.payload.kyc_uidai;
    },
    clearProfile: (state) => {
      state.id = "";
      state.user_id = "";
      state.email = "";
      state.name = "";
      state.phone_number = "";
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
    logoutUser: (state) => {
      AsyncStorage.clear(); // Clear all keys from AsyncStorage
      clearProfile(); // Pass the state to clearProfile to reset the state
    },
    fetchProfile: (state) => {
      state.loading = true;
    },
    fetchProfileSuccess: (state) => {
      state.loading = false;
    },
    fetchProfileFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateEmail: (state, action) => {
      state.loading = true;
    },
    updatePhoneNumber: (state, action) => {
      state.loading = true;
    },
    updateEmailFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updatePhoneNumberFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updatePhoneNumberSuccess: (state) => {
      state.error = "";
      state.loading = false;
      state.isPhoneNumberModalVisible = false;
    },
    updateEmailSuccess: (state) => {
      state.error = "";
      state.loading = false;
      state.isEmailModalVisible = false;
    },
    setIsEmailModalVisible: (state, action) => {
      state.isEmailModalVisible = action.payload;
    },
    setIsPhoneNumberModalVisible: (state, action) => {
      state.isPhoneNumberModalVisible = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState);
  },
});

export const {
  setProfile,
  clearProfile,
  UserDetailsConfirmRequest,
  setIsLoggedIn,
  setAppLocked,
  logoutUser,
  updateEmail,
  updatePhoneNumber,
  updateEmailFailure,
  updatePhoneNumberFailure,
  updateEmailSuccess,
  updatePhoneNumberSuccess,
  fetchProfile,
  fetchProfileSuccess,
  fetchProfileFailure,
  setIsEmailModalVisible,
  setIsPhoneNumberModalVisible,
} = profileSlice.actions;

export default profileSlice.reducer;
