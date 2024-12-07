import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { InputBox } from '../../../components'
import { COLORS } from '../../../constants'

describe('InputBox', () => {
	it('should render input box with placeholder', () => {
		const placeholder = 'Enter text'
		const { getByPlaceholderText } = render(
			<InputBox placeholder={placeholder} error={''} />
		)
		expect(getByPlaceholderText(placeholder)).toBeTruthy()
	})

	it('should call onChangeText when text is changed', () => {
		const onChangeMock = jest.fn()
		const { getByTestId } = render(
			<InputBox onChangeText={onChangeMock} testID='input' error={''} />
		)
		fireEvent.changeText(getByTestId('input'), 'new value')
		expect(onChangeMock).toHaveBeenCalledWith('new value')
	})

	it('should show error text when error prop is passed', () => {
		const errorText = 'Error message'
		const { getByText } = render(<InputBox error={errorText} />)
		expect(getByText(errorText)).toBeTruthy()
	})

	it('should apply error style when error prop is passed', () => {
		const { getByTestId } = render(<InputBox testID='input' error='Error' />)
		expect(getByTestId('input')).toHaveStyle({
			borderColor: COLORS.Red,
		})
	})
})
