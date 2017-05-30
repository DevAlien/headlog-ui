import { takeLatest, delay } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import Cookie from 'js-cookie';

function* login(api, action) {
  try {
    const login = yield call([api, api.post], '/login', action.data);
    yield put({ type: 'LOGIN_FETCHED', data: login });
    Cookie.set('token', login.accessToken);
    window.location.href = '/';
  } catch (e) {
    yield put({ type: 'LOGIN_FETCH_FAILED', message: e.message });
  }
}

function* loadApp(api, action) {
  console.log('load')
  try {
    const user = yield call([api, api.get], '/me');
    yield put({ type: 'APP_LOADED', data: user });
  } catch (e) {
    console.log('eee', e)
    yield put({ type: 'APP_LOAD_FAILED', message: e.message });
  }
}

function* mySaga(api, router) {
  yield [
    takeLatest('LOGIN_FETCH', login, api),
    takeLatest('APP_LOAD', loadApp, api)
  ];
}

export default mySaga;