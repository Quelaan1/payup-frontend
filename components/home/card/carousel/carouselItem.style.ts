import { Dimensions, StyleSheet } from 'react-native'
import { COLORS } from '../../../../constants'

const { width } = Dimensions.get('screen')

const carouselItemStyles = StyleSheet.create({
	cardContainerMain: { width: width },

	cardContainer: {
		flexDirection: 'row',
		padding: 20,
		backgroundColor: COLORS.skinBackground,
		borderRadius: 4,
		justifyContent: 'space-between',
		marginHorizontal: 20,
	},

	cardLeftContainer: {
		maxWidth: '55%',
	},

	cardDiscount: { fontSize: 24, fontWeight: '900' },

	cardTitle: { fontSize: 20, fontWeight: '800', marginBottom: 10 },

	cardDescription: { fontSize: 14 },
})

export default carouselItemStyles
