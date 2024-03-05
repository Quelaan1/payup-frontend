import { TextInput, View, Text, TextInputProps } from 'react-native'
import Styles from './inputBox.style'
import React, { memo } from 'react'
import { SvgProps } from 'react-native-svg'

interface Props extends TextInputProps {
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
	...textInputProps
}: Props): React.JSX.Element {
	return (
		<View style={Styles.container}>
			<View style={Styles.InputContainer}>
				<TextInput
					testID='input-box'
					style={error ? Styles.inputError : Styles.input}
					onChangeText={onChangeText}
					value={value}
					placeholder={placeholder}
					{...textInputProps}
				/>

				{ImagePath && <ImagePath width={26} height={26} style={Styles.image} />}
			</View>

			{error && <Text style={Styles.error}>{error}</Text>}
		</View>
	)
})

export default InputBox
