import React from 'react'
import { Image, Text, View } from 'react-native'

import styles from './screenheader.style'
import { IMAGES } from '../../../../../constants'

const ScreenHeaderTitle = (): React.JSX.Element => {
	return (
		<View style={styles.logo}>
			<Image source={IMAGES.logo} style={styles.logoImage} />
			<Text style={styles.logoTitle}>PayUp</Text>
		</View>
	)
}

export default ScreenHeaderTitle
