import { createSlice } from "@reduxjs/toolkit";

interface OnboardPanState extends VerifyPanRequest, VerifyPanResponse {
  error: string;
  isVerifying: boolean;
}

const initialState: OnboardPanState = {
  entity_id: "",
  entity_type: 1,
  message: "",
  entity_name: "",
  internal_id: "",
  error: "",
  isVerifying: false,
};

export const panSlice = createSlice({
  name: "onboard",
  initialState,
  reducers: {
    clearPan: (state) => {
      state.entity_id = "";
      state.entity_name = "";
      state.internal_id = "";
      state.error = "";
      state.message = "";
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
      state.entity_id = "";
      state.entity_name = "";
      state.internal_id = "";
      state.message = "";
      state.error = action.payload;
      state.isVerifying = false;
    },
    SetPanError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  clearPan,
  PanVerifyRequest,
  PanVerifySuccess,
  PanVerifyFailure,
  SetPanError,
} = panSlice.actions;

export default panSlice.reducer;
