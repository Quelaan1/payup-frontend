import { Keyboard, TouchableWithoutFeedback, View } from 'react-native'
import { router, Stack } from 'expo-router'
import React from 'react'
import { Header, ScreenHeaderProgress } from '../../components'
import commonStyles from '../../styles/common'
import InputBox from '../../components/common/inputBox/inputBox'
import { COLORS, ICONS } from '../../constants'
import { CommonButton } from '../../components'
import Footer from '../../components/common/footer/footer'
import Loader from '../../components/common/loader/loader'
import ButtonStyles from '../../components/common/buttons/commonButton/commonButton.style'

const phoneNumber = (): React.JSX.Element => {
	const [phoneNumber, setPhoneNumber] = React.useState('')
	const [isSendingSMS, setIsSendingSMS] = React.useState(false)
	const [error, setError] = React.useState('')

	const onChange = (value: string) => {
		if (value.length !== 10) {
			setError('Please enter a valid phone number')
		}

		if (value.length === 10) {
			setError('')
			Keyboard.dismiss()
		}

		setPhoneNumber(value)
	}

	const handleSend = () => {
		if (phoneNumber.length !== 10) {
			setError('Please enter a valid phone number')
		}

		if (phoneNumber.length === 10) {
			setIsSendingSMS(true)
		}

		router.push('/auth/otp-verification')
	}

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View style={commonStyles.container}>
				<Stack.Screen
					options={{
						navigationBarColor: COLORS.White,
						headerTitle: () => <ScreenHeaderProgress progress={'zero'} />,
					}}
				/>

				<View>
					<Header
						title={"Welcome to PayUp.\nLet's get you started"}
						description={
							'Enter the phone number where you would like to receive OTP on'
						}
					/>

					<View style={{ marginTop: 34 }}>
						<InputBox
							placeholder={'Phone Number'}
							ImagePath={ICONS.phone}
							onChangeText={onChange}
							value={phoneNumber}
							error={error}
							keyboardType={'number-pad'}
							autoFocus
						/>
					</View>
				</View>

				<View>
					<View style={ButtonStyles.buttonParent}>
						<CommonButton text={'Next'} onPress={handleSend} />
					</View>

					<Footer />

					{isSendingSMS && (
						<Loader ImagePath={ICONS.phone} Message={'Sending SMS'} />
					)}
				</View>
			</View>
		</TouchableWithoutFeedback>
	)
}

export default phoneNumber
