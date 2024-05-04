import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import noteReducer from "./notesSlice";
import canvasReducer from "./canvasSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    note: noteReducer,
    canvas: canvasReducer,
  },
});
export default appStore;
