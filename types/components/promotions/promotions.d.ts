import { ImageSourcePropType } from 'react-native';

interface Promotion {
	id: number;
	discount: string;
	title: string;
	description: string;
	image_url: ImageSourcePropType;
}
