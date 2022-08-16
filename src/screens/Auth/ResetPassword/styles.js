import {StyleSheet} from 'react-native';
import {textColor, primaryColor} from '~/config/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    marginTop: 25,
  },
  footer: {
    justifyContent: 'flex-end',
  },
  title: {
    left: 5,
    marginBottom: 15,
    color: textColor,
  },
  text: {
    marginTop: 15,
    fontWeight: '500',
    fontFamily: 'Roboto-Medium',
  },
  input: {
    paddingTop: 15,
    fontSize: 13,
    color: textColor,
    backgroundColor: 'transparent',
  },
  link: {
    fontSize: 18,
    paddingTop: 30,
    paddingBottom: 30,
    color: primaryColor,
    textAlign: 'center',
  },
});
