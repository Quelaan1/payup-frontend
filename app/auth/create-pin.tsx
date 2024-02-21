import { Keyboard, TouchableWithoutFeedback, View } from 'react-native'
import commonStyles from '../../styles/common'
import { router, Stack } from 'expo-router'
import { Header, CommonButton } from '../../components'
import React, { useRef, useState } from 'react'
import { COLORS, ICONS } from '../../constants'
import Loader from '../../components/common/loader/loader'
import InputBox from '../../components/common/inputBox/inputBox'
import ButtonStyles from '../../components/common/buttons/commonButton/commonButton.style'

const createPin = (): React.JSX.Element => {
	const inputRefs: React.RefObject<HTMLInputElement>[] = Array(4)
		.fill(null)
		.map(() => useRef(null))

	const [pin, setPin] = useState('')

	const [error, setError] = React.useState('')
	const [isVerifying, setIsVerifying] = useState(false)

	const onChange = (value: string, position: number) => {
		// Ensure only numeric characters are added to Pin
		if (!isNaN(Number(value))) {
			const newPin =
				pin.substring(0, position) + value + pin.substring(position + 1)

			setPin(newPin)

			// Focus next input if current input is filled
			if (value.length === 1 && position < 5) {
				inputRefs[position + 1]?.current?.focus()
			}
		}
	}

	const handleSend = () => {
		const OTP = Object.values(pin)
			.map((value) => value)
			.join('')

		if (OTP.length !== 4) {
			setError('Please enter a valid PIN')
		}

		// if (OTP.length === 4) {
		setError('')
		setIsVerifying(true)

		// setTimeout(() => {
		setIsVerifying(false)
		router.push('/home')
		// }, 2000);
		// }
	}

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View style={commonStyles.container}>
				<Stack.Screen
					options={{
						navigationBarColor: COLORS.White,
						headerTitle: '',
					}}
				/>

				<View>
					<Header title={'Create a 4-digit PayUp PIN'} description={''} />

					<InputBox
						onChangeWithPosition={onChange}
						error={error}
						type={'otp'}
						otpValue={pin}
						inputRefs={inputRefs}
						digits={4}
						setOtp={setPin}
					/>
				</View>

				<View>
					<View style={ButtonStyles.buttonParent}>
						<CommonButton text={'Next'} onPress={handleSend} />
					</View>

					{isVerifying && (
						<Loader ImagePath={ICONS.mobile} Message={'Setting your pin'} />
					)}
				</View>
			</View>
		</TouchableWithoutFeedback>
	)
}

export default createPin
