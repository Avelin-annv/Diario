import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  CONFIG,
  FAILED,
  IDLE,
  LANDING_URLS,
  LOADING,
  SUCCESS,
} from "../constants";
export const authenticateUser = createAsyncThunk(
  "user/login",
  async function ({ formData, action }) {
    try {
      const { data } = await axios.post(LANDING_URLS[action], formData, CONFIG);
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (e) {
      throw new Error(e?.response?.statusText || e?.message);
    }
  }
);
export const logoutUser = createAsyncThunk(
  "user/logout",
  async function ({}, { dispatch }) {
    localStorage.removeItem("userInfo");
    dispatch(removeUser());
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: null,
    status: IDLE,
    errors: null,
  },
  reducers: {
    addUser: (state, action) => {
      state.userInfo = action.payload;
    },
    removeUser: (state) => {
      state = {
        userInfo: null,
        status: IDLE,
        errors: null,
      };
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(
        authenticateUser.pending,
        (state) => void (state.status = LOADING)
      )
      .addCase(authenticateUser.fulfilled, (state, action) => {
        state.status = SUCCESS;
        state.userInfo = action.payload;
      })
      .addCase(authenticateUser.rejected, (state, action) => {
        state.status = FAILED;
        state.errors = action.error.message;
      });
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
