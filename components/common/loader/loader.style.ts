import { StyleSheet, Platform } from 'react-native';
import { COLORS } from '../../../constants';

const styles = StyleSheet.create({
  loader: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '26%',
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.LightGray,
  },
  text: {
    fontFamily: 'Regular',
    fontSize: 10,
    lineHeight: 34,
    paddingTop: 2,
  },
  spinnerContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 69.5 : 64,
  },
});

export default styles;
