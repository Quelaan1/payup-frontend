import { Stack, useNavigation, useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { CommonButton } from '../../components';
import { COLORS, IMAGES } from '../../constants';
import commonStyles from '../../styles/common';
import ButtonStyles from '../../components/common/buttons/commonButton/commonButton.style';
import React, { useEffect } from 'react';

const SecureApp = (): React.JSX.Element => {
	const router = useRouter();

	const handleContinue = () => {
		router.push('/home');
	};

	const navigation = useNavigation();

	useEffect(() => {
		navigation.addListener('beforeRemove', (e) => {
			e.preventDefault();
		});
	}, []);

	return (
		<View style={{ ...commonStyles.container, paddingTop: 50 }}>
			<Stack.Screen
				options={{
					headerShown: false,
			}}
			/>

			<View>
				<View
					style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'center',
						alignContent: 'center',
						width: '100%',
						marginTop: 90,
						marginBottom: 50,
					}}>
					<IMAGES.securityImage
						width={160}
						height={160}
					/>
				</View>

				<View>
					<Text style={{ fontSize: 38, fontWeight: '700' }}>
						{'Protect your\nprivacy'}
					</Text>
				</View>
			</View>

			<View style={ButtonStyles.buttonParent}>
				<CommonButton
					text={'Continue'}
					onPress={handleContinue}
				/>
			</View>
		</View>
	);
};

export default SecureApp;

const SecureAppStyles = StyleSheet.create({
	radio: {
		display: 'flex',
		flexDirection: 'row',
		borderWidth: 1,
		borderRadius: 4,
		padding: 12,
		justifyContent: 'space-between',
	},

	radioBlackBorder: {
		borderColor: COLORS.Black,
	},

	radioGreyBorder: {
		borderColor: COLORS.LightGray,
	},
});
