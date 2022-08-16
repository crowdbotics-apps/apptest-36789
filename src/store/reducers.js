import {combineReducers} from 'redux';
import user from './user/reducer';
import global from './global/reducer';
import yearbook from './yearbook/reducer';

export default combineReducers({
  user,
  global,
  yearbook,
});
