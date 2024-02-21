import {
	Keyboard,
	TextInput,
	TouchableWithoutFeedback,
	View,
	Text,
	TouchableOpacity,
} from 'react-native'
import commonStyles from '../../styles/common'
import { router, Stack } from 'expo-router'
import { Header, CommonButton, ScreenHeaderProgress } from '../../components'
import React, { useState } from 'react'
import { COLORS, ICONS } from '../../constants'
import Loader from '../../components/common/loader/loader'
import Styles from '../../components/common/inputBox/inputBox.style'
import InfoCard from '../../components/common/cards/infoCard/infoCard'
import { points } from '../../constants/onboard/GstInfo'
import ButtonStyles from '../../components/common/buttons/commonButton/commonButton.style'

const Tax = (): React.JSX.Element => {
	const [value, setValue] = React.useState('')
	const [error, setError] = React.useState('')
	const [isVerifying, setIsVerifying] = useState(false)
	const [showInfoCard, setShowInfoCard] = useState(false)

	const onChange = (value: string) => {
		setValue(value)
	}

	const handleSend = () => {
		// setIsVerifying(true);

		const userName = 'Pushpa'

		router.push('/onboard/user-details?userName=' + userName)
	}

	const handleInfoPress = () => {
		if (Keyboard.isVisible()) {
			Keyboard.dismiss()
		}

		setShowInfoCard(!showInfoCard)
	}

	const handleOutsidePress = () => {
		if (Keyboard.isVisible()) {
			Keyboard.dismiss()
		}

		if (showInfoCard) {
			setShowInfoCard(false)
		}
	}

	return (
		<TouchableWithoutFeedback onPress={handleOutsidePress}>
			<View style={commonStyles.container}>
				<Stack.Screen
					options={{
						navigationBarColor: COLORS.White,
						headerTitle: () => <ScreenHeaderProgress progress={'two'} />,
					}}
				/>

				<View>
					<Header
						title={'Enter your GSTIN or PAN'}
						description={'We require your GSTIN or PAN to open your account'}
					/>

					<View style={Styles.container}>
						<View style={Styles.InputContainer}>
							<TextInput
								style={error ? Styles.inputError : Styles.input}
								onChangeText={onChange}
								value={value}
								placeholder={'GST or PAN'}
								keyboardType={'default'}
							/>

							<TouchableOpacity style={Styles.image} onPress={handleInfoPress}>
								<ICONS.info width={26} height={26} />
							</TouchableOpacity>
						</View>

						{error && <Text style={Styles.error}>{error}</Text>}
					</View>
				</View>

				<View>
					<View style={ButtonStyles.buttonParent}>
						<CommonButton text={'Next'} onPress={handleSend} />
					</View>

					{isVerifying && (
						<Loader ImagePath={ICONS.mobile} Message={'Verifying GST/PAN'} />
					)}
				</View>

				{showInfoCard && (
					<InfoCard
						ImagePath={ICONS.infoFilled}
						Title='Why GST/PAN is required?'
						Points={points}
					/>
				)}
			</View>
		</TouchableWithoutFeedback>
	)
}

export default Tax
