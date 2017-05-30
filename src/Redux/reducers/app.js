export default function app(state = {}, action) {
  switch (action.type) {
    case 'APP_LOADED': 
      return {...state, loaded: true, user: action.data, account: action.data.accounts[0]};
    case 'LOGIN_FETCH':
      return {...state, fetching: true};
    case 'LOGIN_FETCHED':
      return {...state, fetching: false};
    case 'LOGIN_FETCH_FAILED':
      return {...state, fetching: false, loginError: action.message};
    default:
      return state;
  }
}
