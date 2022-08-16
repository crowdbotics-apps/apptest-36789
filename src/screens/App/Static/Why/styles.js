import {StyleSheet} from 'react-native';
import {primaryColor} from '~/config/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
  },
  content: {
    marginTop: 25,
    paddingLeft: 5,
  },
  text: {
    fontSize: 15,
    marginBottom: 15,
  },
  image: {
    resizeMode: 'contain',
    maxWidth: '100%',
  },
  item: {
    backgroundColor: primaryColor,
  },
  title: {
    fontSize: 16,
    color: 'white',
  },
});
