import { Stack, useRouter } from 'expo-router'
import { StyleSheet, View } from 'react-native'
import { Header, CommonButton } from '../../components'
import { COLORS, IMAGES, ICONS } from '../../constants'
import commonStyles from '../../styles/common'
import ButtonStyles from '../../components/common/buttons/commonButton/commonButton.style'
import {
	CheckCircleIcon,
	CircleIcon,
	FormControl,
	Radio,
	RadioGroup,
	RadioIcon,
	RadioIndicator,
	RadioLabel,
	VStack,
} from '@gluestack-ui/themed'
import { useState } from 'react'
import Icons from '../../constants/icons'

const SecureApp = (): React.JSX.Element => {
	const [selection, setSelection] = useState('screen-lock')

	const router = useRouter()

	const handleContinue = () => {
		switch (selection) {
			case 'screen-lock':
				break
			case 'payup-lock':
				router.push('/auth/create-pin')
				break
		}
	}

	return (
		<View style={commonStyles.container}>
			<Stack.Screen
				options={{
					navigationBarColor: COLORS.White,
					headerTitle: '',
				}}
			/>

			<View>
				<Header
					title={`Secure your app so only you can access it`}
					description={''}
				/>

				<View
					style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'center',
						alignContent: 'center',
						width: '100%',
						marginTop: 20,
						marginBottom: 50,
					}}>
					<IMAGES.securityImage width={160} height={160} />
				</View>

				<View>
					<FormControl>
						<RadioGroup value={selection} onChange={setSelection}>
							<VStack
								style={{
									display: 'flex',
									flexDirection: 'column',
									gap: 16,
								}}>
								<View>
									<Radio
										value='screen-lock'
										borderColor={
											selection === 'screen-lock' ? 'black' : '#D9D9D9'
										}
										style={SecureAppStyles.radio}>
										<View
											style={{
												display: 'flex',
												flexDirection: 'column',
												gap: 8,
											}}>
											<RadioLabel
												style={{ fontSize: 16, fontFamily: 'Medium' }}>
												Use your screen lock
											</RadioLabel>

											<View
												style={{
													display: 'flex',
													flexDirection: 'row',
													gap: 4,
													alignContent: 'center',
												}}>
												<Icons.keypad width={22} height={22} />

												<RadioLabel>
													{`Use your existing PIN, pattern, face ID,\nor fingerprint`}
												</RadioLabel>
											</View>

											<View
												style={{
													display: 'flex',
													flexDirection: 'row',
													gap: 4,
													alignContent: 'center',
												}}>
												<Icons.offline width={22} height={22} />

												<RadioLabel>Works offline</RadioLabel>
											</View>
										</View>

										<RadioIndicator>
											<RadioIcon
												color='white'
												as={CheckCircleIcon}
												width={22}
												height={22}
											/>
										</RadioIndicator>
									</Radio>
								</View>

								<Radio
									borderColor={selection === 'payup-lock' ? 'black' : '#D9D9D9'}
									value='payup-lock'
									style={SecureAppStyles.radio}>
									<View
										style={{
											display: 'flex',
											flexDirection: 'column',
											gap: 8,
										}}>
										<RadioLabel style={{ fontSize: 16, fontFamily: 'Medium' }}>
											Use a 4-digit PayUp PIN
										</RadioLabel>

										<View
											style={{
												display: 'flex',
												flexDirection: 'row',
												gap: 4,
												alignContent: 'center',
											}}>
											<Icons.lock width={22} height={22} />

											<RadioLabel>Create a PayUp PIN</RadioLabel>
										</View>

										<View
											style={{
												display: 'flex',
												flexDirection: 'row',
												gap: 4,
												alignContent: 'center',
											}}>
											<Icons.online width={22} height={22} />

											<RadioLabel>Needs internet connection</RadioLabel>
										</View>
									</View>

									<RadioIndicator>
										<RadioIcon
											color='white'
											as={CheckCircleIcon}
											width={22}
											height={22}
										/>
									</RadioIndicator>
								</Radio>
							</VStack>
						</RadioGroup>
					</FormControl>
				</View>
			</View>

			<View style={ButtonStyles.buttonParent}>
				<CommonButton text={'Continue'} onPress={handleContinue} />
			</View>
		</View>
	)
}

export default SecureApp

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
})
