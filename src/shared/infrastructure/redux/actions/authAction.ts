import UserEntity from '../../../../users/domain/entities/UserEntity';

export enum AuthActionTypes {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  GET_USER = 'GET_USER',
}

const login = (user: UserEntity) => ({
  type: AuthActionTypes.LOGIN,
  payload: user,
});

const logout = () => ({
  type: AuthActionTypes.LOGOUT,
});

const getUser = () => ({
  type: AuthActionTypes.GET_USER,
});

export {login, logout, getUser};
