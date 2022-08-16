import queryString from 'query-string';
import SecureStore from 'react-native-encrypted-storage';
import jwt_decode from 'jwt-decode';
import {loadingError} from '~/store/global/actions';

const APP_URL = 'https://yearbook-app-30141.botics.co';
const ACCESS_TOKEN = 'access_token';
const USER_INFO = 'user_info';

class Request {
  constructor(provider) {
    this.provider = provider || APP_URL;
  }

  static async getToken() {
    let token;
    try {
      token = await SecureStore.getItem(ACCESS_TOKEN);
    } catch (error) {
      token = null;
    }
    return token;
  }

  static async getScopes() {
    const token = await Request.getToken();
    const decoded = token ? jwt_decode(token) : null;
    return (decoded && decoded.scopes) || [];
  }

  pathToUrl(path, params) {
    const urls = ['/rest-auth/login', '/api/password_reset'];
    const auth = urls.includes(path);
    const provider = auth ? APP_URL : this.provider;
    const query = queryString.stringify(params);
    return query ? `${provider}${path}?${query}` : `${provider}${path}`;
  }

  async getHeaders() {
    return {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
  }

  async request(path, options) {
    let token;
    try {
      token = await SecureStore.getItem(ACCESS_TOKEN);
    } catch (error) {
      token = null;
    }

    options.headers = {...(await this.getHeaders()), ...options.headers};
    const isLogin = path.includes('rest-auth/login');
    const isSignUp = path.includes('rest-auth/registration');
    const isResendToken = path.includes('api/password_reset');
    const isUpdatePass = path.includes('api/password_reset/confirm');
    const isHighSchool = path.includes('api/highschools');
    const with_oauth =
      isLogin || isSignUp || isResendToken || isUpdatePass || isHighSchool;

    if (!with_oauth) {
      options.headers = {
        ...options.headers,
        Authorization: `Token ${token}`,
      };
    }

    return fetch(path, options)
      .then(async response => {
        const getJSON = async () => {
          return response?.json() || response?.text();
        };
        const data = response.status === 204 ? {} : await getJSON();
        if (!response.ok) {
          let error = new Error('Network response was not ok.');
          error.response = response;
          error.responseJSON = data;

          if (data && data.logout) {
            await this.logout();
          }

          throw error;
        }
        return data;
      })
      .catch(error => {
        return error;
      });
  }

  async requestWithFiles(path, body, method) {
    let token;
    try {
      token = await SecureStore.getItem(ACCESS_TOKEN);
    } catch (error) {
      token = null;
    }

    return await fetch(`${APP_URL}${path}`, {
      method: method,
      headers: {
        Accept: 'application/json',
        Authorization: `Token ${token}`,
        'Content-Type': 'multipart/form-data',
      },
      body,
    })
      .then(async res => {
        const data = await res.json();
        return data;
      })
      .catch(err => {
        let error = new Error('Network response was not ok.');
        error.responseJSON = err;

        return error;
      });
  }

  async login(params) {
    return this.post('/rest-auth/login/', params, {})
      .then(async response => {
        if (response.responseJSON) {
          loadingError({
            error:
              response.responseJSON?.non_field_errors[0] ||
              'Email or password dont match',
          });
          return false;
        } else {
          SecureStore.setItem(ACCESS_TOKEN, String(response.key || ''), {});
          const data = await this.get('/rest-auth/user/');
          if (data?.role === 1) {
            return data;
          } else {
            this.logout();
            loadingError({
              error: 'You are not allowed to access this APP',
            });
            return false;
          }
        }
      })
      .catch(error => {
        return error;
      });
  }

  async logout() {
    await SecureStore.removeItem(ACCESS_TOKEN);
    await SecureStore.removeItem(USER_INFO);
  }

  async get(path, params = {}, options = {}) {
    return this.request(this.pathToUrl(path, params), {
      ...options,
      credentials: 'include',
      method: 'GET',
    });
  }

  async post(path, data, params = {}, options = {}) {
    return this.request(this.pathToUrl(path, params), {
      ...options,
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(data),
    });
  }

  async put(path, data, params = {}, options = {}) {
    return this.request(this.pathToUrl(path, params), {
      ...options,
      credentials: 'include',
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async patch(path, data, params = {}, options = {}) {
    return this.request(this.pathToUrl(path, params), {
      ...options,
      credentials: 'include',
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async del(path, params = {}, options = {}) {
    return this.request(this.pathToUrl(path, params), {
      ...options,
      credentials: 'include',
      method: 'DELETE',
    });
  }
}

export default Request;
