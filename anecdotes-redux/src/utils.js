import {
  clearNotification,
  setNotification,
} from "./reducers/notificationReducer";

export const showNotification = (dispatch, message) => {
  dispatch(setNotification(message));

  setTimeout(() => {
    console.log("will clear..", message);
    dispatch(clearNotification(message));
  }, 5000);
};
