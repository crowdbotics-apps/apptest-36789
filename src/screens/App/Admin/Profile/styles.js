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
  row: {
    width: '100%',
    marginTop: 30,
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  image: {
    resizeMode: 'contain',
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  icon: {
    right: 25,
    padding: 6,
    paddingTop: 8,
    color: 'white',
    borderWidth: 2,
    borderRadius: 100,
    borderColor: 'white',
    textAlign: 'center',
    backgroundColor: primaryColor,
  },
});
