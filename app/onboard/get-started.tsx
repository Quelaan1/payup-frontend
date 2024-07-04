import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Stack, useRouter } from 'expo-router';
import { IntroCards, CommonButton, ScreenHeaderTitle } from '../../components';
import { COLORS, IMAGES } from '../../constants';
import commonStyles from '../../styles/common';
import ButtonStyles from '../../components/common/buttons/commonButton/commonButton.style';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
	StartupCards,
	startupCards,
} from '../../constants/get-started/get-started';
import CustomCarousel from '../../components/common/carousel/carousel';

const GetStarted = (): React.JSX.Element => {
	const router = useRouter();

	const handleNext = () => {
		router.push('/auth/phone-number');
	};

	return (
		<View style={{ ...commonStyles.container, paddingHorizontal: 0 }}>
			<View>
				<Stack.Screen
					options={{
						headerTitle: () => <ScreenHeaderTitle />,
						headerStyle: { backgroundColor: COLORS.skinBackground },
					}}
				/>

				<View style={styles.frameContainer}>
					<IMAGES.frame width={'100%'} />
				</View>
			</View>

			<GestureHandlerRootView>
				<CustomCarousel
					data={startupCards as StartupCards[]}
					indicatorWidth={[12, 18, 12]}
					indicatorHeight={[8, 12, 8]}
					inidicatorBorderRadius={4}
					indicatorHorizontalPadding={5}
					paginationContainerStyle={{ paddingTop: 15 }}
					renderItem={({ item }) => {
						return <IntroCards {...item} />;
					}}
				/>
			</GestureHandlerRootView>

			<View style={{ ...ButtonStyles.buttonParent, paddingHorizontal: 20 }}>
				<CommonButton
					text={'Next'}
					onPress={handleNext}
				/>
			</View>
		</View>
	);
};

export default GetStarted;

const styles = StyleSheet.create({
	frameContainer: {
		backgroundColor: COLORS.skinBackground,
		paddingTop: 50,
		paddingBottom: 100,
	},
});
