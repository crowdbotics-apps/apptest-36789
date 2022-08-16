import * as Types from './types';
import api from '~/providers/api';
import {catchError} from '~/tools/functions';
import {loadingSuccess} from '../global/actions';

export const loadYearbook = id => async dispatch => {
  try {
    dispatch({type: Types.START_FETCH});

    const data = await api.get(`/api/recapp/${id}`);

    if (data) {
      dispatch({type: Types.VIEW, data});
    } else {
      dispatch({type: Types.ERROR_FETCH});
      catchError(data, 'Error to load Yearbook');
    }
  } catch (error) {
    dispatch({type: Types.ERROR_FETCH});
    catchError(error, 'Error to load Yearbook');
  }
};

export const loadYearbooks = () => async dispatch => {
  try {
    dispatch({type: Types.START_FETCH});

    const data = await api.get('/api/recapp/');

    if (data) {
      dispatch({type: Types.FETCH, data});
    } else {
      dispatch({type: Types.ERROR_FETCH});
      catchError(data, 'Error to load Yearbooks');
    }
  } catch (error) {
    dispatch({type: Types.ERROR_FETCH});
    catchError(error, 'Error to load Yearbooks');
  }
};

export const loadPurchasedYearbooks = () => async dispatch => {
  try {
    dispatch({type: Types.START_FETCH});

    const data = await api.get('/api/purchase/');

    if (data) {
      dispatch({type: Types.PURCHASED, data});
    } else {
      dispatch({type: Types.ERROR_FETCH});
      catchError(data, 'Error to load Yearbooks');
    }
  } catch (error) {
    dispatch({type: Types.ERROR_FETCH});
    catchError(error, 'Error to load Yearbooks');
  }
};

export const addYearbook = (body, topics, onSuccess) => async dispatch => {
  try {
    dispatch({type: Types.START_FETCH});

    const data = await api.requestWithFiles('/api/recapp/', body, 'POST');
    if (data.responseJSON) {
      dispatch({type: Types.ERROR_FETCH});
    } else {
      await dispatch(
        addTopics([
          ...topics.map(item => {
            return {...item, recapp_id: data.id, recapp: data.id};
          }),
        ]),
      );
      loadingSuccess({
        toastTitle: 'Success!',
        success: 'Yearbook added successfully!',
      });
      if (onSuccess) {
        onSuccess();
      }
    }
  } catch (error) {
    dispatch({type: Types.ERROR_FETCH});
    catchError(error, 'Error to add Yearbook');
  }
};

export const addTopics = body => async dispatch => {
  try {
    dispatch({type: Types.START_FETCH});

    const data = await api.post('/api/table_of_contents/', body);
    if (data.responseJSON) {
      dispatch({type: Types.ERROR_FETCH});
    } else {
      dispatch({type: Types.FETCH_SUCCESS});
    }
  } catch (error) {
    dispatch({type: Types.ERROR_FETCH});
    catchError(error, 'Error to add Yearbook');
  }
};

export const buyYearbook = (body, onSuccess) => async dispatch => {
  try {
    dispatch({type: Types.START_FETCH});

    const data = await api.post('/api/purchase/', body);

    if (data.responseJSON) {
      if (Array.isArray(data?.responseJSON)) {
        catchError(data, ...data?.responseJSON?.map(item => item));
      }
      dispatch({type: Types.ERROR_FETCH});
    } else {
      dispatch({type: Types.FETCH_SUCCESS});
      loadingSuccess({
        toastTitle: 'Success!',
        success: 'Yearbook purchased successfully!',
      });
      if (onSuccess) {
        onSuccess();
      }
    }
  } catch (error) {
    dispatch({type: Types.ERROR_FETCH});
    catchError(error, 'Error to add Yearbook');
  }
};
