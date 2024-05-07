import { Text, TouchableOpacity, View } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { COLORS, ICONS } from '../constants';
import commonStyles from '../styles/common';
import {
	HeaderLeft,
	HeaderRight,
	PayButton,
	Menu,
	CarouselItem,
} from '../components';
import { homeStyles } from '../styles/home.style';
import CustomCarousel from 'carousel-with-pagination-rn';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { promotionalCards } from '../constants/home/menu';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppDispatch } from '../redux/hooks';
import { clearProfile } from '../redux/slices/profileSlice';

const transactions = [
	{
		id: '1',
		name: 'Raj K',
		amount: 280,
		date: 'February 28, 2022',
	},
	{
		id: '2',
		name: 'Raj K',
		amount: 280,
		date: 'February 28, 2022',
	},
	{
		id: '3',
		name: 'Raj K',
		amount: 280,
		date: 'February 28, 2022',
	},
	{
		id: '4',
		name: 'Raj K',
		amount: 280,
		date: 'February 28, 2022',
	},
	{
		id: '5',
		name: 'Raj K',
		amount: 280,
		date: 'February 28, 2022',
	},
	{
		id: '6',
		name: 'Raj K',
		amount: 280,
		date: 'February 28, 2022',
	},
	{
		id: '7',
		name: 'Raj K',
		amount: 280,
		date: 'February 28, 2022',
	},
];

const Home = () => {
	const insets = useSafeAreaInsets();
	const router = useRouter();
	const dispatch = useAppDispatch();

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
				<View style={{ paddingHorizontal: 20 }}>
					<Text style={homeStyles.greeting}>good evening.</Text>
					<Text style={homeStyles.userName}>Samantha</Text>
				</View>

				<PayButton />

				<Menu />

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

			<View
				style={{
					display: 'flex',
					flexDirection: 'row',
					paddingVertical: 10,
					paddingHorizontal: 30,
					width: '100%',
					justifyContent: 'space-between',
					alignItems: 'center',
					backgroundColor: COLORS.White,
					position: 'absolute',
					bottom: 0,
				}}>
				<TouchableOpacity
					onPress={() => {
						dispatch(clearProfile());
					}}>
					<ICONS.houseOutline
						width={28}
						height={28}
					/>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => {}}>
					<ICONS.transaction
						width={28}
						height={28}
					/>
				</TouchableOpacity>

				<TouchableOpacity>
					<ICONS.payCircle
						width={54}
						height={54}
					/>
				</TouchableOpacity>

				<TouchableOpacity>
					<ICONS.cardBlack
						width={36}
						height={36}
					/>
				</TouchableOpacity>

				<TouchableOpacity>
					<ICONS.profile
						width={28}
						height={28}
					/>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default Home;
