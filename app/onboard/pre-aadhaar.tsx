import { Stack, useRouter } from 'expo-router';
import { Image, View } from 'react-native';
import {
	Header,
	CommonButton,
	ScreenHeaderProgress,
	InfoBox,
} from '../../components';
import { COLORS, IMAGES } from '../../constants';
import commonStyles from '../../styles/common';
import ButtonStyles from '../../components/common/buttons/commonButton/commonButton.style';
import React from 'react';

const PreAadhaar = (): React.JSX.Element => {
	const router = useRouter();

	const handleContinue = () => {
		router.push('/onboard/aadhaar');
	};

	return (
		<View style={commonStyles.container}>
			<Stack.Screen
				options={{
					headerTitle: () => <ScreenHeaderProgress progress={'two'} />,
				}}
			/>

			<View>
				<Header
					title={`Complete your Aadhaar based KYC`}
					description={
						'You need to complete your KYC to start making payments on PayUp.'
					}
				/>

				<View
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignContent: 'center',
						marginTop: 20,
						marginBottom: 50,
					}}>
					<Image
						source={IMAGES.aadhaarProcess}
						style={{
							width: 380,
							height: 220,
							resizeMode: 'contain',
						}}
					/>
				</View>

				<InfoBox />
			</View>

			<View style={ButtonStyles.buttonParent}>
				<CommonButton
					text={'Next'}
					onPress={handleContinue}
				/>
			</View>
		</View>
	);
};

export default PreAadhaar;
