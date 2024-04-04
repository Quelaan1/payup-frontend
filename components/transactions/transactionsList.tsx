import {
	Animated,
	FlatList,
	Image,
	ListRenderItemInfo,
	NativeScrollEvent,
	NativeSyntheticEvent,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { COLORS } from '../../constants';
import { useRef } from 'react';

type Transaction = {
	id: string;
	name: string;
	amount: number;
	date: string;
};

type Props = {
	transactions: ArrayLike<Transaction>;
};

type RenderItem = {
	item: Transaction;
	index: number;
	isEnd: boolean;
};

const Transaction = ({ item, index, isEnd }: RenderItem) => {
	return (
		<View
			style={[
				transactionStyles.container,
				isEnd && {
					marginBottom: 12,
				},
			]}
			key={index}>
			<View style={transactionStyles.leftContainer}>
				<Image
					source={{
						uri: `https://ui-avatars.com/api/?name=${item?.name}&background=random&rounded=false`,
					}}
					alt={item?.name}
					width={34}
					height={34}
					style={{ borderRadius: 4 }}
				/>

				<View>
					<Text style={transactionStyles.name}>{item?.name}</Text>
					<Text style={transactionStyles.date}>{item?.date}</Text>
				</View>
			</View>

			<Text style={transactionStyles.amount}>&#8377;{item?.amount}</Text>
		</View>
	);
};

export const TransactionsList = ({ transactions }: Props) => {
	return (
		<Animated.FlatList
			contentContainerStyle={{ gap: 10 }}
			data={transactions}
			renderItem={({ item, index }) => {
				const isEnd = index === transactions.length - 1;

				return <Transaction item={item} index={index} isEnd={isEnd} />;
			}}
			scrollEnabled={true}
		/>
	);
};

const transactionStyles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 14,
		alignItems: 'center',
		borderRadius: 4,
		width: '100%',
	},

	leftContainer: {
		display: 'flex',
		flexDirection: 'row',
		gap: 10,
		alignItems: 'center',
	},

	name: {
		fontSize: 18,
		color: COLORS.DarGray20,
		fontWeight: '600',
	},

	date: {
		fontSize: 14,
		color: COLORS.MediumGray,
	},

	amount: {
		fontSize: 18,
		color: COLORS.Black,
		fontWeight: '700',
	},
});
