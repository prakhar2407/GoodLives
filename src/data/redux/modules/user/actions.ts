import {UserDTO} from '../../../../dtos/UserDTO';
import createActionName from '../../helper/createActionName';

export const SET_USER = createActionName('USER', 'SET_USER');
export const RESET_USER = createActionName('USER', 'RESET_USER');
export const UPDATE_USER = createActionName('USER', 'UPDATE');

export const setUser = (user: UserDTO | any | null) => ({
  type: SET_USER,
  payload: user,
});

export const updateUser = (userDataToUpdate: UserDTO | any) => ({
  type: UPDATE_USER,
  payload: userDataToUpdate,
});

export const resetUser = () => ({
  type: RESET_USER,
});
