import { IDLE } from "../constants";

import { createSlice } from "@reduxjs/toolkit";

const canvasSlice = createSlice({
  name: "canvas",
  initialState: {
    canvases: [],
    status: IDLE,
    errors: null,
  },
  reducers: {
    addCanvas: (action, state) => {},
    deleteCanvas: (action, state) => {},
  },
});
export const { deleteCanvas, addCanvas } = canvasSlice.actions;
export default canvasSlice.reducer;
