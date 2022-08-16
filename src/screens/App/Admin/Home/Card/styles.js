import {StyleSheet} from 'react-native';
import {boxColor, secondColor} from '~/config/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    paddingLeft: 25,
    paddingRight: 25,
    backgroundColor: boxColor,
    borderRadius: 10,
    marginTop: 10,
  },
  title: {
    fontSize: 20,
    marginTop: 10,
  },
  year: {
    fontSize: 16,
    marginTop: 10,
  },
  boxBuy: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  price: {
    paddingTop: 30,
    fontSize: 25,
    color: secondColor,
  },
  customButtom: {
    width: 100,
    marginRight: 30,
    alignSelf: 'flex-end',
  },
});
