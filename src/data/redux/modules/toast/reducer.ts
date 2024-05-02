import {HIDE_TOAST, JUST_HIDE_TOAST, SHOW_TOAST} from './actions';
import {ToastReducerState} from './types';

const initialState: ToastReducerState = {
  show: false,
  data: null,
};

const toastReducer = (state = initialState, action: any): ToastReducerState => {
  switch (action.type) {
    case SHOW_TOAST:
      return {show: true, data: action.payload};
    case HIDE_TOAST:
      return {show: false, data: null};
    case JUST_HIDE_TOAST:
      return {show: false, data: action.payload};
    default:
      return state;
  }
};

export default toastReducer;
