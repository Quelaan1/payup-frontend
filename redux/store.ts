import { combineReducers, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/rootSaga';
import { profileSlice } from './slices/profileSlice';
import { loginOtpSlice } from './slices/otpSlice';
import { panSlice } from './slices/panSlice';
import { userDetailsSlice } from './slices/userDetailsSlice';
import { aadhaarSlice } from './slices/aadhaarSlice';
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authSlice } from './slices/auth';
import { appSlice } from './slices/appSlice';

const persistConfig = {
	key: 'root',
	storage: AsyncStorage,
	whitelist: ['profile', 'app'],
};

const sagaMiddleware = createSagaMiddleware();

// Combine reducers as usual
const rootReducer = combineReducers({
	auth: authSlice.reducer,
	profile: profileSlice.reducer,
	loginOtp: loginOtpSlice.reducer,
	pan: panSlice.reducer,
	userDetails: userDetailsSlice.reducer,
	aadhaar: aadhaarSlice.reducer,
	app: appSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat(sagaMiddleware),
});

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
