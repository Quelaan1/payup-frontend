import React from 'react';
import { ImageSourcePropType, Text, View } from 'react-native';
import { Image } from 'expo-image';
import styles from './carouselItem.style';

export type Card = {
	id: string;
	discount: string;
	description: string;
	title: string;
	image_url: ImageSourcePropType;
};

const CarouselItem = ({
	id,
	discount,
	description,
	title,
	image_url,
}: Card): React.JSX.Element => {
	return (
		<View style={styles.cardContainerMain}>
			<View
				key={id}
				style={styles.cardContainer}>
				<View style={styles.cardLeftContainer}>
					<Text style={styles.cardDiscount}>{discount}</Text>
					<Text style={styles.cardTitle}>{title}</Text>
					<Text style={styles.cardDescription}>{description}</Text>
				</View>

				<Image
					source={image_url}
					style={{ width: 190, height: 110 }}
				/>
			</View>
		</View>
	);
};

export default CarouselItem;
