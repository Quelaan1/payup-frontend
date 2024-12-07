import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants';

const errorAlertStyles = StyleSheet.create({
	container: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: 'rgba(0, 0, 0, 0.2)',
	},

	errorContainer: {
		position: 'absolute',
		bottom: 160,
		left: 0,
		right: 0,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		marginHorizontal: 60,
	},

	borderStyle: {
		position: 'absolute',
		top: -4,
		height: '110%',
		width: 5,
		backgroundColor: 'red',
	},

	topContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgb(224	1	56)',
		borderTopLeftRadius: 20,
		borderBottomLeftRadius: 20,
		padding: 10,
	},

	bottomContainer: {
		backgroundColor: COLORS.Black,
		borderTopRightRadius: 20,
		borderBottomRightRadius: 20,
		padding: 10,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},

	text: {
		color: COLORS.White,
		textAlign: 'center',
		fontSize: 16,
	},
});

export default errorAlertStyles;
