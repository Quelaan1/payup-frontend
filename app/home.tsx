import { Text, View } from 'react-native';
import { Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { COLORS } from '../constants';
import commonStyles from '../styles/common';
import {
	HeaderLeft,
	HeaderRight,
	PayButton,
	Menu,
	CarouselItem,
	BottomNavigation,
} from '../components';
import { homeStyles } from '../styles/home.style';
import CustomCarousel from 'carousel-with-pagination-rn';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { promotionalCards } from '../constants/home/menu';
import { useAppSelector } from '../redux/hooks';

const getGreeting = () => {
	const hrs = new Date().getHours();
	if (hrs < 12) return 'good morning';
	if (hrs <= 17) return 'good afternoon';
	return 'good evening';
};

const Home = () => {
	const { name } = useAppSelector((state) => state.profile);

	const [greet, setGreet] = useState(getGreeting());

	useEffect(() => {
		setGreet(getGreeting());
	}, []);

	return (
		<View
			style={{
				...commonStyles.container,
				backgroundColor: COLORS.White,
				paddingHorizontal: 0,
			}}>
			<Stack.Screen
				options={{
					headerTintColor: COLORS.Black,
					headerStyle: {
						backgroundColor: COLORS.grayBackground,
					},
					headerTitle: '',
					headerShown: true,
					headerLeft: () => <HeaderLeft />,
					headerRight: () => <HeaderRight />,
				}}
			/>

			<View style={homeStyles.frameContainer}>
				<View style={{ paddingHorizontal: 20, gap: 4 }}>
					<Text style={homeStyles.greeting}>{greet}.</Text>
					<Text style={homeStyles.userName}>{name}</Text>
				</View>

				<PayButton />

				<View>
					<View
						style={{
							paddingVertical: 6,
							backgroundColor: COLORS.DarGray20,
							marginHorizontal: 20,
							borderTopEndRadius: 4,
							borderTopStartRadius: 4,
							alignItems: 'center',
						}}>
						<Text style={{ color: COLORS.White }}>Coming soon</Text>
					</View>
					<Menu />
				</View>

				<GestureHandlerRootView>
					<CustomCarousel
						disablePagination={true}
						data={promotionalCards}
						renderItem={({ item }) => {
							return <CarouselItem {...item} />;
						}}
					/>
				</GestureHandlerRootView>
			</View>

			<BottomNavigation />
		</View>
	);
};

export default Home;
