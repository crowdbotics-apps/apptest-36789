import {StyleSheet} from 'react-native';
import {primaryColor, textColor, titleDark, bgInput} from '~/config/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    marginTop: 10,
  },
  scrollview: {
    padding: 25,
  },
  header: {
    padding: 25,
    paddingBottom: 0,
  },
  input: {
    paddingTop: 15,
    fontSize: 13,
    color: textColor,
    backgroundColor: 'transparent',
  },
  label: {
    color: titleDark,
    textAlign: 'left',
    fontFamily: 'Roboto-Regular',
  },
  textBtn: {
    fontWeight: 'bold',
    color: 'white',
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
  select2Input: active => ({
    height: 60,
    color: primaryColor,
    fontSize: 13,
    backgroundColor: bgInput,
    borderRadius: 60,
    paddingLeft: 20,
  }),
  select2Text: {
    color: textColor,
  },
  labelSelect2: {
    color: titleDark,
    textAlign: 'left',
    paddingLeft: 5,
    fontFamily: 'Roboto-Regular',
  },
});
