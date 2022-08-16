import {StyleSheet} from 'react-native';
import {textColor} from '~/config/colors';

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
    flex: 1,
    justifyContent: 'flex-end',
  },
  title: {
    left: 5,
    marginBottom: 15,
    color: textColor,
  },
  input: {
    paddingTop: 15,
    fontSize: 13,
    color: textColor,
    backgroundColor: 'transparent',
  },
});
