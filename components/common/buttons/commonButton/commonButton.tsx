import React from 'react'
import styles from './commonButton.style'
import { Text, TouchableOpacity, View } from 'react-native'

interface Props {
	text: string
	onPress: () => void
	type?: 'Primary' | 'Secondary'
}
const CommonButton = ({
	text,
	onPress,
	type = 'Primary',
}: Props): React.JSX.Element => {
	return (
		<View style={styles.buttonContainer}>
			<TouchableOpacity
				style={type === 'Primary' ? styles.button : styles.filledButton}
				onPress={onPress}>
				<Text
					style={{
						...styles.buttonText,
						color: type === 'Primary' ? 'white' : 'black',
					}}>
					{text}
				</Text>
			</TouchableOpacity>
		</View>
	)
}

export default CommonButton