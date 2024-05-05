import React, { useEffect } from 'react';
import Home from './home';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { Stack, useRouter } from 'expo-router';
import { Image, View } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { setUnlocked } from '../redux/slices/profileSlice';

const Index = () => {
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
		unlocked,
	} = useAppSelector((state) => state.profile);

	const handleAuthenticate = async () => {
		const securityLevel = await LocalAuthentication.getEnrolledLevelAsync();

		if (securityLevel === 0) {
			router.replace('/auth/login-failed?securityLevel=0');
			return;
		}

		const result = await LocalAuthentication.authenticateAsync({
			promptMessage: 'Login with Biometrics',
		});

		if (result.success) {
			dispatch(setUnlocked(true));
		} else {
			router.replace('/auth/login-failed');
		}
	};

	useEffect(() => {
		if (isLoggedIn && appLocked && !unlocked) {
			handleAuthenticate();
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
					gestureEnabled: false,
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
