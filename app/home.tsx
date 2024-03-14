import {
	Animated,
	SafeAreaView,
	Text,
	TouchableOpacity,
	View,
} from 'react-native'
import { Stack } from 'expo-router'
import React, { useState } from 'react'
import { COLORS } from '../constants'
import commonStyles from '../styles/common'
import {
	HeaderLeft,
	HeaderRight,
	PayButton,
	Menu,
	CarouselItem,
} from '../components'
import { homeStyles } from '../styles/home.style'
import CustomCarousel from 'carousel-with-pagination-rn'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { promotionalCards } from '../constants/home/menu'
import { TransactionsList } from '../components/transactions/transactionsList'

const transactions = [
	{
		id: '1',
		name: 'Raj K',
		amount: 240,
		date: 'February 24, 2022',
	},
	{
		id: '2',
		name: 'Raj K',
		amount: 240,
		date: 'February 24, 2022',
	},
	{
		id: '3',
		name: 'Raj K',
		amount: 240,
		date: 'February 24, 2022',
	},
	{
		id: '4',
		name: 'Raj K',
		amount: 240,
		date: 'February 24, 2022',
	},
	{
		id: '5',
		name: 'Raj K',
		amount: 240,
		date: 'February 24, 2022',
	},
	{
		id: '6',
		name: 'Raj K',
		amount: 240,
		date: 'February 24, 2022',
	},
	{
		id: '7',
		name: 'Raj K',
		amount: 240,
		date: 'February 24, 2022',
	},
]

const Home = () => {
	const [recentTransactionsExpanded, setRecentTransactionsExpanded] =
		useState(false)
	const [heightAnim] = useState(new Animated.Value(0)) // Initial height of the peek view

	const toggleTransactionsList = () => {
		console.log('calling')

		setRecentTransactionsExpanded(!recentTransactionsExpanded)

		// Animate the height change
		Animated.timing(heightAnim, {
			toValue: recentTransactionsExpanded ? 0 : 500, // Adjust these values as needed
			duration: 300, // Duration of the animation
			useNativeDriver: false, // This should be false as we are animating height
		}).start()
	}

	return (
		<SafeAreaView
			style={{
				...commonStyles.container,
				backgroundColor: COLORS.grayBackground,
				paddingHorizontal: 0,
			}}>
			<Stack.Screen
				options={{
					navigationBarColor: COLORS.White,
					headerTintColor: COLORS.Black,
					headerStyle: {
						backgroundColor: COLORS.grayBackground,
					},
					headerTitle: '',
					headerLeft: () => <HeaderLeft />,
					headerRight: () => <HeaderRight />,
				}}
			/>

			<View style={{ ...homeStyles.frameContainer }}>
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
							return <CarouselItem {...item} />
						}}
						isEndReached={() => {}}
					/>
				</GestureHandlerRootView>

				<View style={homeStyles.recentTransactionsContainer}>
					<View style={homeStyles.recentTransactions}>
						<Text style={homeStyles.recentTransactionsText}>
							Recent Transaction
						</Text>

						<TouchableOpacity onPress={toggleTransactionsList}>
							<Text style={homeStyles.recentTransactionsButton}>See All</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>

			<Animated.View
				style={{
					position: 'absolute',
					bottom: 0,
					left: 0,
					right: 0,
					height: heightAnim,
					backgroundColor: COLORS.grayBackground,
					paddingHorizontal: 20,
					paddingTop: 20,
					borderRadius: 20,
				}}>
				<TransactionsList
					transactions={transactions}
					recentTransactionsExpanded={recentTransactionsExpanded}
					setRecentTransactionsExpanded={setRecentTransactionsExpanded}
					toggleTransactionsList={toggleTransactionsList}
				/>
			</Animated.View>
		</SafeAreaView>
	)
}

export default Home
