import React, { useCallback, useEffect, useRef, useState } from 'react';
import Home from './home';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { Stack, useRouter } from 'expo-router';
import { AppState, AppStateStatus, Image, View } from 'react-native';
import { handleBiometricAuthentication } from '../utils/auth/auth';
import { setUnlocked } from '../redux/slices/auth';
import useNotification from '../utils/customHooks/useNotification';

const Index = () => {
	// Handle app state ---------------------------------------------
	const [appState, setAppState] = useState(AppState.currentState);
	const router = useRouter();
	const dispatch = useAppDispatch();
	const {
		isLoggedIn,
		appLocked,
		kyc_complete,
		kyc_pan,
		kyc_uidai,
		email,
		name,
	} = useAppSelector((state) => state.profile);
	const unlocked = useAppSelector((state) => state.auth.unlocked);

	// Handle Notification -------------------------------------------
	useNotification();
	// --------------------------------------------------------------

	// Handle biometric authentication ------------------------------------------
	const handleAuthenticate = async () => {
		await handleBiometricAuthentication({
			dispatch,
			setUnlocked: (unlocked: boolean) => dispatch(setUnlocked(unlocked)),
			router,
			checkSecurityLevel: false,
			failureRoute: {
				securityLevelZero: '/auth/login-failed?securityLevel=0',
				default: '/auth/login-failed',
			},
			errorMessages: {
				noSecurity:
					'Your device has no screen-lock, Please use screen-lock to continue using the app.',
				authenticationFailed: 'Authentication failed. Please try again.',
			},
		});
	};

	// Handle app state change for biometric authentication ---------------------
	const handleAppStateChange = useCallback(
		async (nextAppState: AppStateStatus) => {
			if (
				appState.match(/inactive|background/) &&
				nextAppState === 'active' &&
				!unlocked
			) {
				await handleAuthenticate();
			} else if (
				appState === 'active' &&
				nextAppState.match(/inactive|background/)
			) {
				dispatch(setUnlocked(false));
			}
			setAppState(nextAppState);
		},
		[appState, unlocked, dispatch]
	);

	useEffect(() => {
		const subscription = AppState.addEventListener(
			'change',
			handleAppStateChange
		);

		return () => {
			subscription.remove();
		};
	}, [handleAppStateChange]);
	// ---------------------------------------------------------------------------

	// Handle initial routing
	useEffect(() => {
		console.log(
			isLoggedIn,
			appLocked,
			kyc_complete,
			kyc_pan,
			kyc_uidai,
			email,
			name
		);

		if (isLoggedIn && appLocked && !unlocked) {
			handleAuthenticate().then((r) => {});
		}

		if (kyc_complete && !email) {
			setTimeout(() => {
				router.replace('/onboard/user-details?userName=' + name);
			}, 0);
			return;
		}

		if (!kyc_complete && !isLoggedIn) {
			setTimeout(() => {
				router.replace('/onboard/get-started');
			}, 0);
			return;
		}

		if (!kyc_complete && isLoggedIn) {
			if (!kyc_pan) {
				setTimeout(() => {
					router.replace('/onboard/pan');
				}, 0);
				return;
			} else if (!kyc_uidai) {
				setTimeout(() => {
					router.replace('/onboard/pre-aadhaar');
				}, 0);
				return;
			}
		} else if (!appLocked && kyc_pan && kyc_uidai) {
			setTimeout(() => {
				router.replace('/auth/secure-app');
			}, 0);
			return;
		}
	}, []);
	// ---------------------------------------------------------------------------

	if (isLoggedIn) {
		if (kyc_complete && appLocked && unlocked) {
			return (
				<View>
					<Home />
				</View>
			);
		}
	}

	return (
		<View>
			<Stack.Screen
				options={{
					headerStyle: {
						backgroundColor: '#F9EFE5',
					},
					headerTitle: '',
					headerShown: false,
				}}
			/>

			<Image
				source={require('../assets/splash.png')}
				style={{ width: '100%', height: '100%' }}
			/>
		</View>
	);
};

export default Index;
