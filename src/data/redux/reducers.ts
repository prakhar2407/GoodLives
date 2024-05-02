import {combineReducers, createStore} from 'redux';
import userReducer from './modules/user/reducer';
import toastReducer from './modules/toast/reducer';

const rootReducers = combineReducers({
  userReducer: userReducer,
  toastReducer: toastReducer,
});

const configureStore = () => {
  return createStore(rootReducers);
};

export default configureStore;
