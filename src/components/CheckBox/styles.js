import {StyleSheet} from 'react-native';
import {primaryColor} from '~/config/colors';

export const styles = StyleSheet.create({
  row: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 15,
  },
  icon: {
    fontSize: 25,
    marginRight: 10,
    color: primaryColor,
  },
});
