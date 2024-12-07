import { View, Text, FlatList } from 'react-native';
import Styles from './infoCard.style';
import React from 'react';
import { SvgProps } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
	ImagePath?: React.FC<SvgProps>;
	Title: string;
	Points: string[];
}

const InfoCard = ({ ImagePath, Title, Points }: Props): React.JSX.Element => {
	const insets = useSafeAreaInsets();

	return (
		<View style={{ ...Styles.container, bottom: insets.bottom }}>
			{ImagePath && (
				<ImagePath
					width={32}
					height={32}
				/>
			)}

			<Text style={Styles.title}>{Title}</Text>

			<FlatList
				data={Points}
				ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
				renderItem={({ item }) => (
					<Text>
						<Text>{`\u29BF`}</Text> {item}
					</Text>
				)}
			/>
		</View>
	);
};

export default InfoCard;
