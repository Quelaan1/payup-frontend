import {
	FlatList,
	ListRenderItemInfo,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import React from 'react';
import styles from './menu.style';
import { MenuItem, menuData } from '../../../../constants/home/menu';

const ItemComponent = ({ item, index }: ListRenderItemInfo<MenuItem>) => {
	return (
		<TouchableOpacity key={index} style={styles.button}>
			{<item.icon width={26} height={26} />}
			<Text style={styles.buttonText}>{item.text}</Text>
		</TouchableOpacity>
	);
};

const Menu = () => {
	return (
		<View style={styles.container}>
			<FlatList
				data={menuData}
				numColumns={4}
				renderItem={ItemComponent}
				keyExtractor={(item) => item.id.toString()}
				contentContainerStyle={{
					display: 'flex',
					rowGap: 18,
				}}
				columnWrapperStyle={{
					display: 'flex',
					justifyContent: 'space-between',
				}}
			/>
		</View>
	);
};

export default Menu;
