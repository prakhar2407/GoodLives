import createActionName from '../../helper/createActionName';
import {ToastProps} from './types';

export const SHOW_TOAST = createActionName('TOAST', 'SHOW');
export const HIDE_TOAST = createActionName('TOAST', 'HIDE');
export const JUST_HIDE_TOAST = createActionName('JUST_TOAST', 'HIDE');

export const showToast = (payload: ToastProps) => ({
  type: SHOW_TOAST,
  payload,
});

export const hideToast = () => ({
  type: HIDE_TOAST,
});

export const justHideToast = () => ({
  type: JUST_HIDE_TOAST,
});
