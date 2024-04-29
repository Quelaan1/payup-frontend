import { View } from 'react-native';
import React from 'react';
import GetStarted from './get-started';
import Home from './home';
import { useAppSelector } from '../redux/hooks';

const Index = () => {
	const { isLoggedIn, kyc_complete } = useAppSelector((state) => state.profile);

	if (!kyc_complete) {
		return (
			<View>
				<GetStarted />
			</View>
		);
	}

	if (isLoggedIn && kyc_complete) {
		return (
			<View>
				<Home />
			</View>
		);
	}
};

export default Index;
