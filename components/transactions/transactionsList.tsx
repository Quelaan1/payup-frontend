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
} from 'react-native'
import { COLORS } from '../../constants'
import { useRef } from 'react'

type Transaction = {
	id: string
	name: string
	amount: number
	date: string
}

type Props = {
	transactions: ArrayLike<Transaction>
	recentTransactionsExpanded: boolean
	setRecentTransactionsExpanded: React.Dispatch<React.SetStateAction<boolean>>
	toggleTransactionsList: () => void
}

type RenderItem = {
	item: Transaction
	index: number
	isEnd: boolean
}

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
	)
}

export const TransactionsList = ({
	transactions,
	recentTransactionsExpanded,
	setRecentTransactionsExpanded,
	toggleTransactionsList,
}: Props) => {
	const scrollY = useRef(new Animated.Value(0)).current // Keep track of scroll position
	const startY = useRef(0)

	const onScrollBeginDrag = Animated.event(
		[{ nativeEvent: { contentOffset: { y: scrollY } } }],
		{
			useNativeDriver: false,
			listener: (event: NativeSyntheticEvent<NativeScrollEvent>) => {
				startY.current = event.nativeEvent.contentOffset.y
			},
		}
	)

	const onScrollEndDrag = Animated.event(
		[{ nativeEvent: { contentOffset: { y: scrollY } } }],
		{
			useNativeDriver: false,
			listener: (event: NativeSyntheticEvent<NativeScrollEvent>) => {
				console.log('scrooling')

				const currentY = event.nativeEvent.contentOffset.y
				const deltaY = currentY - startY.current // Calculate the delta

				// Trigger only if the user is swiping down at the top of the list
				if (deltaY > 50 && startY.current === 0 && recentTransactionsExpanded) {
					toggleTransactionsList()
				}
			},
		}
	)

	return (
		<Animated.FlatList
			onScrollBeginDrag={onScrollBeginDrag}
			onScrollEndDrag={onScrollEndDrag}
			contentContainerStyle={{ gap: 10 }}
			data={transactions}
			renderItem={({ item, index }) => {
				const isEnd = index === transactions.length - 1

				return <Transaction item={item} index={index} isEnd={isEnd} />
			}}
			scrollEnabled={true}
		/>
	)
}

const transactionStyles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 14,
		alignItems: 'center',
		borderRadius: 4,
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
})
