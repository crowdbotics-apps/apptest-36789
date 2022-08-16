import {StyleSheet} from 'react-native';
import {primaryColor, primaryLabelColor} from '~/config/colors';

const defaultStyles = StyleSheet.create({
  root: {
    flex: 1,
    fontFamily: 'Poppins',
    outline: 'none',
  },
  btnDefault: disabled => ({
    height: 56,
    width: '100%',
    borderRadius: 60,
    borderWidth: 0,
    marginBottom: 25,
    justifyContent: 'center',
    backgroundColor: disabled ? primaryLabelColor : primaryColor,
  }),
  textBtn: {
    fontWeight: 'bold',
    color: 'white',
  },
  textInverse: {
    fontWeight: 'bold',
    color: primaryColor,
  },
  btnInverse: {
    height: 50,
    width: '100%',
    borderRadius: 60,
    marginBottom: 25,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: primaryColor,
    backgroundColor: 'transparent',
  },
  spinner: {
    color: 'white',
  },
});

export default defaultStyles;
