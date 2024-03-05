import { Keyboard, TouchableWithoutFeedback, View } from 'react-native'
import commonStyles from '../../styles/common'
import { router, Stack } from 'expo-router'
import { Header, CommonButton, ScreenHeaderProgress } from '../../components'
import React, { useState } from 'react'
import { COLORS, ICONS } from '../../constants'
import Footer from '../../components/common/footer/footer'
import Loader from '../../components/common/loader/loader'
import ButtonStyles from '../../components/common/buttons/commonButton/commonButton.style'
import OTPInput from '../../components/common/otpInput/otpInput'

const otpVerification = (): React.JSX.Element => {
	const [otp, setOtp] = useState('')

	const [error, setError] = React.useState('')
	const [isVerifying, setIsVerifying] = useState(false)

	const handleSend = () => {
		const OTP = Object.values(otp)
			.map((value) => value)
			.join('')

		if (OTP.length !== 6) {
			setError('Please enter a valid OTP')
		}

		// if (OTP.length === 6) {
		setError('')
		setIsVerifying(true)

		// setTimeout(() => {
		setIsVerifying(false)
		router.push('/onboard/tax')
		// }, 2000);
		// }
	}

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View style={commonStyles.container}>
				<Stack.Screen
					options={{
						navigationBarColor: COLORS.White,
						headerTitle: () => <ScreenHeaderProgress progress={'one'} />,
					}}
				/>

				<View>
					<Header
						title={'Verify your phone number'}
						description={'Enter the OTP you received'}
					/>

					<OTPInput error={error} value={otp} digits={6} setValue={setOtp} />
				</View>

				<View>
					<View style={ButtonStyles.buttonParent}>
						<CommonButton text={'Next'} onPress={handleSend} />
					</View>

					<Footer />

					{isVerifying && (
						<Loader ImagePath={ICONS.mobile} Message={'Verifying number'} />
					)}
				</View>
			</View>
		</TouchableWithoutFeedback>
	)
}

export default otpVerification
