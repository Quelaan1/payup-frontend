import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants';

const Styles = StyleSheet.create({
  container: {
    marginTop: 34,
    paddingHorizontal: 20,
    position: 'relative',
    width: '100%',
  },

  InputContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },

  input: {
    width: '100%',
    padding: 14,
    borderRadius: 4,
    backgroundColor: '#fff',
    shadowColor: 'rgba(0, 0, 0, 0.6)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    borderStyle: 'solid',
    borderColor: '#d0d3d8',
    borderWidth: 1,
  },

  image: {
    position: 'absolute',
    right: 10,
  },

  inputError: {
    width: '100%',
    padding: 14,
    borderRadius: 4,
    backgroundColor: COLORS.LightRed,
    borderStyle: 'solid',
    borderColor: COLORS.Red,
    borderWidth: 1,
  },

  error: {
    paddingTop: 4,
    paddingLeft: 4,
    color: COLORS.Red,
    fontSize: 14,
  },

  otpContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 34,
    gap: 10,
    paddingHorizontal: 20,
  },

  otp: {
    fontSize: 24,
    textAlign: 'center',
    width: 32,
    borderBottomWidth: 2.5,
    borderBottomColor: COLORS.DarkGray50,
  },
});

export default Styles;
