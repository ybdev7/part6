import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setNotification(state, action) {
      state = action.payload;
      return state;
    },
    clearNotification(state, action) {
      console.log("clearing..", action.payload);
      //only clear the corresponding message, not a newer one
      if (state === action.payload) {
        state = "";
      }

      return state;
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
