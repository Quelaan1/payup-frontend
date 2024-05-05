import React, { useEffect } from 'react';
import GetStarted from './onboard/get-started';
import Home from './home';
import { useAppSelector } from '../redux/hooks';
import { useRouter } from 'expo-router';
import { View } from 'react-native';

const Index = () => {
	const router = useRouter();

	const {
		isLoggedIn,
		appLocked,
		kyc_complete,
		kyc_pan,
		kyc_uidai,
		email,
		name,
	} = useAppSelector((state) => state.profile);

	useEffect(() => {
		console.log(
			'isLoggedIn',
			isLoggedIn,
			'appLocked',
			appLocked,
			'kyc_complete',
			kyc_complete,
			'kyc_pan',
			kyc_pan,
			'kyc_uidai',
			kyc_uidai
		);

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
		if (kyc_complete && appLocked) {
			return (
				<View>
					<Home />
				</View>
			);
		}
	}
};

export default Index;
