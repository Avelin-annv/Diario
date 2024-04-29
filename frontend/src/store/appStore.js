import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import noteReducer from "./notesSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    note: noteReducer,
  },
});
export default appStore;
