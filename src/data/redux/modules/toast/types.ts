export type ToastProps = {
  toastMessage: string;
  isError: boolean;
};

export type ToastReducerState = {
  data: ToastProps | null;
  show: boolean;
};
