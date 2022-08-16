import {StyleSheet} from 'react-native';
import {bgInput, primaryColor, textColor} from '~/config/colors';

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
    fontSize: 25,
    paddingTop: 10,
  },
  select2Input: {
    height: 60,
    color: primaryColor,
    fontSize: 13,
    backgroundColor: bgInput,
    borderRadius: 60,
    paddingLeft: 20,
  },
  select2: {
    marginTop: 10,
    marginBottom: 20,
  },
  select2Item: {
    backgroundColor: bgInput,
    borderColor: 'transparent',
    borderWidth: 0,
    color: primaryColor,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  input: {
    paddingTop: 15,
    fontSize: 13,
    color: textColor,
    backgroundColor: 'transparent',
  },
  ViewNames: {
    padding: 25,
    paddingTop: 0,
  },
});
