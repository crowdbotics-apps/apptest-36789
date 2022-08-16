import {StyleSheet} from 'react-native';
import {textColor} from '~/config/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: 'white',
  },
  content: {
    marginTop: 25,
    paddingLeft: 5,
  },
  title: {
    fontSize: 24,
    lineHeight: 30,
  },
  input: {
    paddingTop: 15,
    color: textColor,
    backgroundColor: 'transparent',
  },
  rowPrice: {
    marginTop: 30,
    marginBottom: 30,
    alignItems: 'center',
  },
});
