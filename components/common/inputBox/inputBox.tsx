import { TextInput, View, Text } from 'react-native'
import Styles from './inputBox.style'
import React, { memo } from 'react'
import { SvgProps } from 'react-native-svg'

type Props = {
	placeholder?: string
	value?: string
	onChangeText?: (text: string) => void
	ImagePath?: React.FC<SvgProps>
	error: string
}

const InputBox = memo(function ({
	placeholder,
	ImagePath,
	onChangeText,
	value,
	error,
}: Props): React.JSX.Element {
	return (
		<View style={Styles.container}>
			<View style={Styles.InputContainer}>
				<TextInput
					style={error ? Styles.inputError : Styles.input}
					onChangeText={onChangeText}
					value={value}
					placeholder={placeholder}
					keyboardType={'number-pad'}
				/>

				{ImagePath && <ImagePath width={26} height={26} style={Styles.image} />}
			</View>

			{error && <Text style={Styles.error}>{error}</Text>}
		</View>
	)
})

export default InputBox
