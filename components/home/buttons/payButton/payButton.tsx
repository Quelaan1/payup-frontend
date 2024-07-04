import { Text, TouchableOpacity } from 'react-native';
import { ICONS } from '../../../../constants';
import styles from './payButton.style';

const PayButton = () => {
	return (
		<TouchableOpacity style={styles.container}>
			<ICONS.pay
				width={24}
				height={24}
			/>

			<Text style={styles.text}>Send</Text>
		</TouchableOpacity>
	);
};

export default PayButton;
