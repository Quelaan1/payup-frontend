import { StyleSheet } from 'react-native'
import { COLORS } from '../../../constants'

const OTPInputStyles = StyleSheet.create({
	otpContainer: {
		display: 'flex',
		flexDirection: 'row',
		marginTop: 34,
		gap: 10,
	},

	otp: {
		fontSize: 24,
		textAlign: 'center',
		width: 32,
		height: 40,
		borderWidth: 1,
		borderRadius: 6,
		borderColor: COLORS.DarkGray50,
	},

	error: {
		paddingTop: 4,
		paddingLeft: 4,
		color: COLORS.Red,
		fontSize: 14,
	},
})

export default OTPInputStyles
