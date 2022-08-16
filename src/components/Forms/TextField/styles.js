import {StyleSheet} from 'react-native';
import {
  textColor,
  primaryColor,
  disabledColor,
  dangerColor,
  bgInput,
} from '~/config/colors';

export const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  content: (floating, multiline) => ({
    borderRadius: 30,
    overflow: 'hidden',
    paddingHorizontal: 15,
    backgroundColor: bgInput,
    height: multiline ? 100 : 60,
    alignItems: floating ? 'flex-start' : 'center',
    flexDirection: floating ? 'column' : 'row',
  }),
  input: disabled => ({
    width: '100%',
    fontSize: 16,
    paddingRight: 25,
    fontFamily: 'Roboto-Medium',
    backgroundColor: bgInput,
    color: disabled ? disabledColor : textColor,
  }),
  label: disabled => ({
    paddingRight: 5,
    fontFamily: 'Roboto-Medium',
    color: disabled ? disabledColor : primaryColor,
  }),
  invalid: {
    fontSize: 13,
    color: dangerColor,
    fontFamily: 'Roboto_300Light',
  },
});
