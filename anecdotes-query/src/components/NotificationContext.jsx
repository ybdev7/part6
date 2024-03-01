import { createContext, useReducer, useContext } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return action.payload;
    case "CLEAR":
      //only clear it's own message
      if (state === action.payload) {
        return "";
      } else {
        return state;
      }
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[0];
};

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[1];
};

export const useNotification = () => {
  const dispatch = useNotificationDispatch();
  return (message, seconds = 5) => {
    dispatch({ type: "SET", payload: message });
    setTimeout(() => {
      dispatch({ type: "CLEAR", payload: message });
    }, seconds * 1000);
  };
};
export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ""
  );

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
