import {SET_USER, RESET_USER, UPDATE_USER} from './actions';
import {UserDTO} from '../../../../dtos/UserDTO';

type UserState = {data: UserDTO | null};

const initialState: UserState = {
  data: null,
};

const userReducer = (state = initialState, action: any): UserState => {
  switch (action.type) {
    case SET_USER: {
      return {data: action.payload};
    }
    case UPDATE_USER: {
      const dataToUpdate = action.payload;
      const alreadyPresentData = state.data;
      const updatedData = {...alreadyPresentData, ...dataToUpdate};

      return {data: updatedData};
    }
    case RESET_USER:
      return state;
    default:
      return state;
  }
};

export default userReducer;
