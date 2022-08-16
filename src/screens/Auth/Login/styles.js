import {StyleSheet, Platform, Dimensions} from 'react-native';
import {primaryColor, textColor} from '~/config/colors';
import {isIphoneX} from '~/tools/functions';
const height = Dimensions.get('window').height;
const smallDevice = height < 610;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    width: '100%',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingBottom: Platform.select({android: 0, ios: isIphoneX() ? 15 : 0}),
  },
  content: {
    flex: 1,
    paddingBottom: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 40,
    maxHeight: smallDevice ? 80 : 100,
    maxWidth: Platform.select({ios: 200, android: 180}),
  },
  form: {
    padding: 0,
    paddingBottom: 25,
    width: '100%',
  },
  input: {
    color: textColor,
  },
  icon: {
    fontSize: 18,
    marginRight: 15,
    color: primaryColor,
  },
  link: {
    fontSize: 14,
    paddingTop: 20,
    color: primaryColor,
    textAlign: 'center',
  },
  buttons: {
    zIndex: 1,
    left: 5,
    flexDirection: 'row',
    position: 'relative',
    justifyContent: 'center',
  },
});
