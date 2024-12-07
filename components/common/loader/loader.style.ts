import { StyleSheet, Platform } from 'react-native';
import { COLORS } from '../../../constants';

const loaderStyles = StyleSheet.create({
	loader: {
		position: 'absolute',
		left: 0,
		right: 0,
		bottom: 0,
		width: '100%',
		borderTopRightRadius: 18,
		borderTopLeftRadius: 18,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: COLORS.LightGray,
		gap: 10,
	},
	text: {
		fontFamily: 'Regular',
		fontSize: 12,
		lineHeight: 34,
		paddingTop: 2,
	},
	spinnerContainer: {
		position: 'absolute',
		top: -10,
		right: -10,
	},
});

export default loaderStyles;
