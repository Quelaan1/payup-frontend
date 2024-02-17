import {View, Text, FlatList} from 'react-native';
import Styles from './infoCard.style';
import React from 'react';
import {SvgProps} from 'react-native-svg';

interface Props {
    ImagePath?: React.FC<SvgProps>;
    Title: string;
    Points: string[];
}

const InfoCard = ({ImagePath, Title, Points}: Props): React.JSX.Element => {
    return (
        <View style={Styles.container}>
            {ImagePath && <ImagePath width={32} height={32}/>}

            <Text style={Styles.title}>{Title}</Text>

            <FlatList
                data={Points}
                ItemSeparatorComponent={() => <View style={{height: 16}}/>}
                renderItem={({item}) =>
                    <Text><Text>{`\u29BF`}</Text> {item}</Text>
                }
            />
        </View>
    );
};

export default InfoCard;
