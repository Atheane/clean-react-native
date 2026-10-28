export enum IStoreKey {
  ROOT_REDUCER = '@energy-app/rootreducer',
  USER_EMAIL = '@energy-app/useremail',
}

export enum IAuthTypes {
  // commands
  FETCH_LOGIN = 'FETCH_LOGIN',
  FETCH_LOGOUT = 'FETCH_LOGOUT',
  // domain events
  LOGIN_SUCCEDED = 'LOGIN_SUCCEDED',
  LOGIN_FAILED = 'LOGIN_FAILED',
  LOGGED_OUT = 'LOGGED_OUT',
}
