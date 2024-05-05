import axios from "axios";
import { FAILED, IDLE, SUCCESS } from "../constants";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getApiConfig } from "../utils/getApiConfig";
export const createNewCanvas = createAsyncThunk(
  "canvas/new",
  async (formData) => {
    try {
      const { data } = await axios.post(
        "/api/canvas/create",
        formData,
        getApiConfig()
      );
      return data;
    } catch (e) {
      throw new Error(e?.response?.statusText || e?.message);
    }
  }
);
export const fetchAllCanvas = createAsyncThunk("canvas/getAll", async () => {
  try {
    const { data } = await axios.get("/api/canvas/", getApiConfig());
    return data;
  } catch (e) {
    throw new Error(e?.response?.statusText || e?.message);
  }
});
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCanvas.fulfilled, (state, action) => {
        state.canvases = action.payload;
        state.status = SUCCESS;
      })
      .addCase(fetchAllCanvas.rejected, (state, action) => {
        state.status = FAILED;
      });
  },
});
export const { deleteCanvas, addCanvas } = canvasSlice.actions;
export default canvasSlice.reducer;
