import UserEntity from '../../../../users/domain/entities/UserEntity';

export enum AuthActionTypes {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
}

const login = (user: UserEntity) => ({
  type: AuthActionTypes.LOGIN,
  payload: user,
});

const logout = () => ({
  type: AuthActionTypes.LOGOUT,
});

export {login, logout};
