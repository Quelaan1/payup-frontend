import { StyleSheet } from 'react-native'
import { COLORS } from '../../../../constants'

const Styles = StyleSheet.create({
	container: {
		position: 'absolute',
		zIndex: 10,
		left: 0,
		right: 0,
		bottom: 0,
		height: '56%',
		borderTopRightRadius: 18,
		borderTopLeftRadius: 18,
		alignItems: 'center',
		paddingHorizontal: 28,
		paddingVertical: 18,
		backgroundColor: COLORS.LightGray,
	},

	title: {
		fontSize: 26,
		fontWeight: 'bold',
		marginTop: 10,
		marginBottom: 20,
	},

	pointContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'stretch',
		flexWrap: 'wrap',
		gap: 6,
	},
})

export default Styles
