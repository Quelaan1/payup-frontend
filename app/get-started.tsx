import { StyleSheet, View } from 'react-native'
import React from 'react'
import CustomCarousel from 'carousel-with-pagination-rn'
import { Stack, useRouter } from 'expo-router'
import {
	IntroCards,
	CommonButton,
	ScreenHeaderTitle,
} from '../components/index'
import { COLORS, IMAGES } from '../constants'
import commonStyles from '../styles/common'
import CardsData from '../statics/cards/startup-cards.json'
import ButtonStyles from '../components/common/buttons/commonButton/commonButton.style'

export interface Card {
	id: number
	title: string
	description: string
}

const cards: Card[] = CardsData

const GetStarted = (): React.JSX.Element => {
	const router = useRouter()

	const handleNext = () => {
		router.push('/auth/phone-number')
	}

	return (
		<View style={{ ...commonStyles.container, paddingHorizontal: 0 }}>
			<View>
				<Stack.Screen
					options={{
						navigationBarColor: COLORS.White,
						headerTitle: () => <ScreenHeaderTitle />,
						headerStyle: { backgroundColor: COLORS.skinBackground },
					}}
				/>

				<View style={styles.frameContainer}>
					<IMAGES.frame width={'100%'} />
				</View>

				<CustomCarousel
					data={cards}
					indicatorWidth={[12, 18, 12]}
					indicatorHeight={[8, 12, 8]}
					inidicatorBorderRadius={4}
					indicatorHorizontalPadding={5}
					paginationContainerStyle={{ paddingTop: 15 }}
					renderItem={({ item }) => {
						return (
							<IntroCards
								id={item}
								description={item.description}
								title={item.title}
							/>
						)
					}}
				/>
			</View>

			<View style={{ ...ButtonStyles.buttonParent, paddingHorizontal: 20 }}>
				<CommonButton text={'Next'} onPress={handleNext} />
			</View>
		</View>
	)
}

export default GetStarted

const styles = StyleSheet.create({
	frameContainer: {
		backgroundColor: COLORS.skinBackground,
		paddingTop: 50,
		paddingBottom: 100,
	},
})
