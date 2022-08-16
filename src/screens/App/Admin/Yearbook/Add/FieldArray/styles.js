import {StyleSheet} from 'react-native';
import {bgInput} from '~/config/colors';

export const styles = StyleSheet.create({
  input: {
    fontSize: 15,
    backgroundColor: bgInput,
    borderRadius: 60,
    marginLeft: 5,
  },
  viewFields: {
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 15,
  },
  icon: {
    paddingTop: 10,
    paddingLeft: 5,
  },
  buttonAdd: {
    padding: 30,
  },
});
