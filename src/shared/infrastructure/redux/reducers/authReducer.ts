import UserEntity from '../../../../users/domain/entities/UserEntity';
import {AuthActionTypes} from '../actions/authAction';

interface AuthState {
  isLoggedIn: boolean;
  user?: UserEntity | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
};

export const authReducer = (
  state = initialState,
  action: {type: AuthActionTypes; payload?: UserEntity},
): AuthState => {
  switch (action.type) {
    case AuthActionTypes.LOGIN:
      return {
        isLoggedIn: true,
        user: action.payload,
      };
    case AuthActionTypes.LOGOUT:
      return {
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
};