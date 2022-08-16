import {Dimensions, Platform} from 'react-native';
import {loadingError} from '~/store/global/actions';

export function onlyNumbers(value) {
  return value ? String(value).replace(/\D/g, '') : value;
}

export function validateEmail(email) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export function catchError(error, message) {
  const msgError = error?.responseJSON?.errors;
  loadingError({error: msgError?.join('') || message});
}

export function timeToString(time) {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
}

export function isIphoneX() {
  const dimen = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 812 ||
      dimen.width === 812 ||
      dimen.height === 896 ||
      dimen.width === 896)
  );
}

export function replaceInput(text) {
  if (text) {
    return text.replace(/,/g, '').replace(/\./g, '').replace('--', '');
  }
  return text;
}
