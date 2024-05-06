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
export const fetchCanvasById = createAsyncThunk(
  "canvas/getById",
  async (id) => {
    try {
      const { data } = await axios.get(`/api/canvas/${id}`, getApiConfig());
      return data;
    } catch (e) {
      throw new Error(e?.response?.statusText || e?.message);
    }
  }
);
export const deleteCanvasById = createAsyncThunk(
  "canvas/delete",
  async (id, { dispatch }) => {
    try {
      const { data } = await axios.delete(`/api/canvas/${id}`, getApiConfig());
      dispatch(fetchAllCanvas());
      return data;
    } catch (e) {
      throw new Error(e?.response?.statusText || e?.message);
    }
  }
);
const canvasSlice = createSlice({
  name: "canvas",
  initialState: {
    canvases: [],
    selectedCanvas: null,
    status: IDLE,
    errors: null,
  },
  reducers: {
    addDefaultSelectedCanvas: (state) => {
      if (state?.canvases?.length > 0) state.selectedCanvas = state.canvases[0];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCanvas.fulfilled, (state, action) => {
        state.canvases = action.payload;
        state.status = SUCCESS;
      })
      .addCase(fetchAllCanvas.rejected, (state, action) => {
        state.status = FAILED;
      })
      .addCase(createNewCanvas.fulfilled, (state, action) => {
        state.canvases.push(action.payload);
        state.status = SUCCESS;
      })
      .addCase(createNewCanvas.rejected, (state, action) => {
        state.errors = action.payload;
        state.status = FAILED;
      })
      .addCase(fetchCanvasById.fulfilled, (state, action) => {
        state.selectedCanvas = action.payload;
        state.status = SUCCESS;
      })
      .addCase(fetchCanvasById.rejected, (state, action) => {
        state.errors = action.payload;
        state.status = FAILED;
      })
      .addCase(deleteCanvasById.fulfilled, (state) => {
        state.status = SUCCESS;
      });
  },
});
export const { addDefaultSelectedCanvas } = canvasSlice.actions;
export default canvasSlice.reducer;
