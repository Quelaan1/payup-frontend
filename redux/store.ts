import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas/rootSaga";
import { profileSlice } from "./slices/profileSlice";
import { loginOtpSlice } from "./slices/otpSlice";
import { panSlice } from "./slices/panSlice";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    profile: profileSlice.reducer,
    loginOtp: loginOtpSlice.reducer,
    pan: panSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
