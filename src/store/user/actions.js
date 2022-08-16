import * as Types from './types';
import api from '~/providers/api';
import auth from '~/providers/auth';
import {loadingSuccess} from '~/store/global/actions';
import {catchError} from '~/tools/functions';
import {setData} from '~/store/database';

export const login = (body, onSuccess) => async dispatch => {
  try {
    dispatch({type: Types.START_FETCH});

    const data = await auth.login(body, {});

    if (data?.id) {
      setData('user', data);
      dispatch({type: Types.FETCH, data});
      loadingSuccess({success: 'Logged In successfully'});
      if (onSuccess) {
        onSuccess();
      }
    } else {
      dispatch({type: Types.ERROR_FETCH});
    }
  } catch (error) {
    dispatch({type: Types.ERROR_FETCH});
    catchError(error, 'Email or password dont match');
  }
};

export const logout = onSuccess => async dispatch => {
  try {
    dispatch({type: Types.START_FETCH});

    setData('user', '');
    await auth.logout();
    dispatch({type: Types.FETCH, data: null});
    loadingSuccess();
    if (onSuccess) {
      onSuccess();
    }
  } catch (error) {
    dispatch({type: Types.ERROR_FETCH});
    catchError(error, 'Error to Logout');
  }
};

export const getUser = onSuccess => async dispatch => {
  try {
    dispatch({type: Types.START_FETCH});

    const data = await api.get('/rest-auth/user/');
    if (data?.id) {
      setData('user', data);
      dispatch({type: Types.FETCH, data});
      loadingSuccess();
      if (onSuccess) {
        onSuccess(data);
      }
    } else {
      dispatch({type: Types.ERROR_FETCH});
      catchError(data, 'Error to get your User');
    }
  } catch (error) {
    dispatch({type: Types.ERROR_FETCH});
    catchError(error, 'Error to get your User');
  }
};

export const recoverPassword = (body, onSuccess) => async dispatch => {
  try {
    dispatch({type: Types.START_FETCH});

    const data = await api.post('/api/password_reset/', body);

    if (data?.response && !data?.response?.ok) {
      dispatch({type: Types.ERROR_FETCH});
      catchError(
        data,
        data?.responseJSON?.email[0] || 'Error to recovery password',
      );
    } else {
      dispatch({type: Types.FETCH_SUCCESS});
      loadingSuccess({
        toastTitle: 'Success!',
        success: 'Token sent to your email!',
      });
      if (onSuccess) {
        onSuccess();
      }
    }
  } catch (error) {
    dispatch({type: Types.ERROR_FETCH});
    catchError(error, 'Error to recovery password');
  }
};

export const resetPassword = (body, onSuccess) => async dispatch => {
  try {
    dispatch({type: Types.START_FETCH});

    const data = await api.post('/api/password_reset/confirm/', body);
    if (data?.response && !data?.response?.ok) {
      dispatch({type: Types.ERROR_FETCH});
      if (data?.responseJSON?.detail) {
        catchError(data, 'Invalid Token');
      } else {
        catchError(
          data,
          data?.responseJSON?.password[0] || 'Error to recovery password',
        );
      }
    } else {
      dispatch({type: Types.FETCH_SUCCESS});
      loadingSuccess({
        toastTitle: 'Success!',
        success: 'Password Updated!',
      });
      if (onSuccess) {
        onSuccess();
      }
    }
  } catch (error) {
    dispatch({type: Types.ERROR_FETCH});
    catchError(error, 'Error to recovery password');
  }
};

export const resendTokenEmail = email => async dispatch => {
  try {
    dispatch({type: Types.START_FETCH});

    const data = await api.post('/api/password_reset/', {email});
    if (data?.response && !data?.response?.ok) {
      dispatch({type: Types.ERROR_FETCH});
      catchError(data, 'Error to resend token');
    } else {
      dispatch({type: Types.FETCH_SUCCESS});
      loadingSuccess({
        toastTitle: 'Success!',
        success: 'Token resent to your email!',
      });
    }
  } catch (error) {
    dispatch({type: Types.ERROR_FETCH});
    catchError(error, 'Error to resend token');
  }
};

export const singUp = (body, onSuccess) => async dispatch => {
  try {
    dispatch({type: Types.START_FETCH});

    const data = await api.post('/rest-auth/registration/', body);

    if (data.responseJSON) {
      data?.responseJSON?.email &&
        catchError(data, data?.responseJSON?.email[0]);
      data?.responseJSON?.username &&
        catchError(data, data?.responseJSON?.username[0]);
      if (Array.isArray(data?.responseJSON)) {
        catchError(data, ...data?.responseJSON?.map(item => item));
      }
      dispatch({type: Types.ERROR_FETCH});
    } else {
      dispatch({type: Types.FETCH_SUCCESS});
      loadingSuccess({
        toastTitle: 'Success!',
        success: 'Account Created!',
      });
      if (onSuccess) {
        onSuccess();
      }
    }
  } catch (error) {
    dispatch({type: Types.ERROR_FETCH});
    catchError(error, 'Error to SignUp');
  }
};

export const updateUser = (body, onSuccess) => async dispatch => {
  try {
    dispatch({type: Types.START_FETCH});

    const data = await api.patch('/rest-auth/user/', body);

    if (data?.id) {
      dispatch({type: Types.FETCH});
      loadingSuccess({
        toastTitle: 'Success!',
        success: 'Your data was Updated.',
      });
      if (onSuccess) {
        onSuccess();
      }
    } else {
      dispatch({type: Types.ERROR_FETCH});
      catchError(data, 'Error to update your data.');
    }
  } catch (error) {
    dispatch({type: Types.ERROR_FETCH});
    catchError(error, 'Error to update your data.');
  }
};

export const updateAvatar = (body, onSuccess) => async dispatch => {
  try {
    dispatch({type: Types.START_FETCH});
    const data = await api.requestWithFiles('/rest-auth/user/', body, 'PATCH');

    if (data?.id) {
      dispatch({type: Types.FETCH_SUCCESS});
      loadingSuccess({
        toastTitle: 'Parabéns!',
        success: 'Avatar atualizado com sucesso.',
      });
      if (onSuccess) {
        onSuccess();
      }
    } else {
      dispatch({type: Types.ERROR_FETCH});
      catchError(data, 'Não foi possível atualizar o avatar');
    }
  } catch (error) {
    dispatch({type: Types.ERROR_FETCH});
    catchError(error, 'Não foi possível atualizar o avatar');
  }
};
