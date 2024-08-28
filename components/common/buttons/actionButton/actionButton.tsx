import { COLORS } from '../../../../constants';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacityProps } from 'react-native';

interface Props extends TouchableOpacityProps {
	title: string;
	description?: string | React.ReactNode;
	icon?: React.ReactNode;
	details?: string;
}

const ActionButton = ({
	title,
	description,
	icon,
	details,
	...buttonProps
}: Props) => {
	return (
		<TouchableOpacity
			{...buttonProps}
			style={styles.button}>
			<View style={styles.leftContainer}>
				{icon && <View style={styles.iconContainer}>{icon}</View>}

				<View>
					<Text style={styles.title}>{title}</Text>

					{description &&
						(typeof description === 'string' ? (
							<Text style={styles.description}>{description}</Text>
						) : (
							description
						))}
				</View>
			</View>

			<View style={styles.rightContainer}>
				{details && <Text style={styles.details}>{details}</Text>}
				<Feather
					style={styles.chevron}
					name='chevron-right'
					size={22}
					color='black'
				/>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: COLORS.White,
		paddingVertical: 14,
		borderRadius: 4,
		marginHorizontal: 20,
	},
	leftContainer: {
		marginLeft: 10,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	iconContainer: {
		marginRight: 8,
	},
	title: {
		fontSize: 14,
		color: COLORS.Black,
	},
	description: {
		fontSize: 12,
		color: COLORS.DarkGray,
	},
	rightContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	details: {
		fontSize: 14,
		color: COLORS.Black,
		fontWeight: '800',
	},
	chevron: {
		marginRight: 10,
	},
});

export default ActionButton;
