/* eslint-disable no-shadow */
import * as Types from './types';
import {dispatch} from '~/store';
import api from '~/providers/api';

export const loading = (params = {}) =>
  dispatch({type: Types.LOADING, ...params});
export const loadingSuccess = (params = {}) =>
  dispatch({type: Types.LOADING_SUCCESS, ...params});
export const loadingError = (params = {}) =>
  dispatch({type: Types.LOADING_ERROR, ...params});
export const setSingUp = (params = {}) =>
  dispatch({type: Types.SET_SINGUP, ...params});

export const loadHighSchools = () => async dispatch => {
  try {
    const data = await api.get('/api/highschools/');
    if (data.length > 0) {
      dispatch({type: Types.FETCH_HIGH_SCHOOLS, data});
    }
  } catch (error) {}
};
