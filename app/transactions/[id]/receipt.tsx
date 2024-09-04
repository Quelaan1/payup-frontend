import { COLORS, IMAGES } from '../../../constants';
import CustomHeaderLayout from '../../../components/common/customHeaderLayout/customHeaderLayout';
import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { Userpic } from 'react-native-userpic';
import React from 'react';
import { CommonButton } from '../../../components';
import { useAppSelector } from '../../../redux/hooks';
import { useLocalSearchParams } from 'expo-router';

const Receipt = () => {
	const transaction_id = useLocalSearchParams().id;

	const transaction: Transaction = useAppSelector(
		(state) => state.transaction.transactions
	).filter((transaction) => transaction.transaction_id === transaction_id)[0];

	return (
		<CustomHeaderLayout
			title={'Transfer Receipt'}
			headerTitleStyles={{
				color: COLORS.Black,
				fontSize: 18,
				fontWeight: 'bold',
			}}
			backgroundColor={COLORS.skinBackground}
			backColor={COLORS.Black}
			statusBarStyle={'dark'}>
			<View
				style={{
					flex: 1,
					backgroundColor: COLORS.skinBackground,
				}}>
				<View
					style={{
						flex: 1,
						backgroundColor: COLORS.White,
						marginHorizontal: 20,
						borderRadius: 4,
						position: 'relative',
					}}>
					{/* Inner Curves */}
					<View style={[styles.innerCurve, styles.leftCurve]} />
					<View style={[styles.innerCurve, styles.rightCurve]} />

					<Image
						source={IMAGES.Transfer}
						style={{
							width: 300,
							height: 300,
							resizeMode: 'contain',
							alignSelf: 'center',
						}}
					/>

					<View style={{ alignItems: 'center', gap: 8, marginBottom: 18 }}>
						<Text
							style={{
								fontSize: 24,
								fontWeight: '600',
								color: COLORS.Black,
							}}>
							Transfer Success
						</Text>

						<Text
							style={{
								color: COLORS.Gray,
								textAlign: 'center',
								paddingHorizontal: 20,
							}}>
							Your money has been successfully sent to {transaction.name}
						</Text>
					</View>

					<View style={{ alignItems: 'center', gap: 8 }}>
						<Text
							style={{
								color: COLORS.Gray,
								fontWeight: '300',
							}}>
							Total Transfer
						</Text>

						<Text
							style={{
								fontSize: 28,
								fontWeight: '600',
								color: COLORS.Black,
							}}>
							₹{transaction.amount}.00
						</Text>
					</View>

					<View
						style={{
							alignItems: 'center',
							justifyContent: 'center',
						}}>
						<View style={styles.dashedLineContainer}>
							{Array.from({ length: 20 }).map((_, index) => (
								<View
									key={index}
									style={styles.dash}
								/>
							))}
						</View>
					</View>

					<View
						style={{
							marginHorizontal: 20,
							gap: 8,
						}}>
						<Text
							style={{
								color: COLORS.Gray,
								fontWeight: '500',
							}}>
							Recipient
						</Text>

						<View
							style={{
								backgroundColor: COLORS.grayBackground,
								padding: 10,
								borderRadius: 4,
								flexDirection: 'row',
								alignItems: 'center',
								gap: 8,
							}}>
							<Userpic
								name={'Tilak'}
								radius={55}
								size={38}
								color={'white'}
								textStyle={{ color: COLORS.Black }}
							/>

							<View
								style={{
									gap: 4,
								}}>
								<Text
									style={{
										color: COLORS.Black,
										fontWeight: '600',
									}}>
									{transaction.name}
								</Text>

								<View
									style={{
										flexDirection: 'row',
										gap: 12,
									}}>
									<Text
										style={{
											color: COLORS.Gray,
											fontSize: 12,
										}}>
										UTR: {transaction.transaction_id}
									</Text>

									<Text
										style={{
											color: COLORS.Gray,
											fontSize: 12,
										}}>
										{transaction.date}
									</Text>
								</View>
							</View>
						</View>
					</View>

					<View
						style={{
							flex: 1,
							justifyContent: 'flex-end',
							marginHorizontal: 20,
							marginBottom: 40,
						}}>
						<CommonButton
							text={'Done'}
							onPress={() => {}}
						/>
					</View>
				</View>
			</View>
		</CustomHeaderLayout>
	);
};

const styles = StyleSheet.create({
	dashedLineContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '90%',
		marginVertical: 18,
	},
	dash: {
		width: 8,
		height: 0.5,
		backgroundColor: COLORS.Gray,
	},
	innerCurve: {
		position: 'absolute',
		top: '50%',
		width: 30,
		height: 30,
		backgroundColor: COLORS.skinBackground,
		borderRadius: 20,
		transform: [{ translateY: -20 }],
	},
	leftCurve: {
		left: -20,
	},
	rightCurve: {
		right: -20,
	},
});

export default Receipt;
