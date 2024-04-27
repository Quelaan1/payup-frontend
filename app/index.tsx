import { View } from 'react-native';
import React, { useEffect, useState } from 'react';
import GetStarted from './get-started';
import Home from './home';
import { getValueFromSecureStore } from '../utils/expo-store/expo-store';
import { useAppSelector } from '../redux/hooks';

const Index = () => {
	const {isLoggedIn} = useAppSelector((state) => state.profile);

	return <View>{isLoggedIn ? <Home /> : <GetStarted />}</View>;
};

export default Index;
