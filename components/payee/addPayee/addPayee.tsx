import React, { useRef, useEffect } from 'react';
import {
	Animated,
	StyleSheet,
	Text,
	TouchableWithoutFeedback,
	View,
} from 'react-native';
import { useRouter } from 'expo-router';
import ActionButton from '../../common/buttons/actionButton/actionButton';
import { COLORS } from '../../../constants';

interface AddPayeeProps {
	addPayee: boolean;
	setAddPayee: (value: boolean) => void;
	slideDownRef: React.MutableRefObject<() => void | undefined>;
	slideUpRef: React.MutableRefObject<() => void | undefined>;
}

const AddPayee = ({
	addPayee,
	setAddPayee,
	slideDownRef,
	slideUpRef,
}: AddPayeeProps) => {
	const router = useRouter();

	const slideAnim = useRef(new Animated.Value(0)).current; // Initial position for sliding animation

	const slideUp = () => {
		setAddPayee(true);
		Animated.timing(slideAnim, {
			toValue: 1,
			duration: 300,
			useNativeDriver: true,
		}).start();
	};

	const slideDown = () => {
		Animated.timing(slideAnim, {
			toValue: 0,
			duration: 300,
			useNativeDriver: true,
		}).start(() => setAddPayee(false));
	};

	// Assign the slideDown function to the ref so the parent can call it
	useEffect(() => {
		slideUpRef.current = slideUp;
	}, [slideUpRef]);

	// Assign the slideDown function to the ref so the parent can call it
	useEffect(() => {
		slideDownRef.current = slideDown;
	}, [slideDownRef]);

	const translateY = slideAnim.interpolate({
		inputRange: [0, 1],
		outputRange: [300, 0], // Sliding up from 300 to 0
	});

	if (addPayee)
		return (
			<View style={styles.modalOverlay}>
				<Animated.View
					style={[{ opacity: slideAnim, transform: [{ translateY }] }]}>
					<TouchableWithoutFeedback>
						<View style={styles.modalContainer}>
							<View style={styles.modalContent}>
								<Text style={styles.modalTitle}>
									Save Payee details for quick transfers!
								</Text>

								<Text style={styles.modalSubtitle}>
									Add UPI ID or bank account details
								</Text>
							</View>

							<View style={{ gap: 8 }}>
								<ActionButton
									title={'Enter UPI ID'}
									onPress={() => router.push('/payees/add-upi')}
								/>

								<ActionButton
									title={'Enter bank account details'}
									onPress={() => router.push('/payees/add-bank')}
								/>
							</View>
						</View>
					</TouchableWithoutFeedback>
				</Animated.View>
			</View>
		);
};

const styles = StyleSheet.create({
	modalOverlay: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: 'rgba(0, 0, 0, 0.8)',
		justifyContent: 'flex-end',
	},
	modalContainer: {
		height: 280,
		backgroundColor: COLORS.grayBackground,
		borderTopLeftRadius: 26,
		borderTopRightRadius: 26,
	},
	modalContent: {
		gap: 8,
		padding: 20,
		paddingTop: 30,
	},
	modalTitle: {
		fontSize: 14,
		fontWeight: '500',
	},
	modalSubtitle: {
		fontSize: 12,
		fontWeight: '400',
		color: COLORS.Gray,
	},
});

export default AddPayee;
