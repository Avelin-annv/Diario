import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { FAILED, IDLE, LOADING, SUCCESS } from "../constants";

export const fetchAllNotes = createAsyncThunk("notes/fetch", async function () {
  try {
    const token = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo")).token
      : "";
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get("/api/notes", config);
    return data;
  } catch (e) {
    throw new Error(e?.response?.statusText || e?.message);
  }
});
export const createNewNote = createAsyncThunk(
  "notes/create",
  async (formData) => {
    try {
      const token = localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo")).token
        : "";
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post("/api/notes/create", formData, config);
      return data;
    } catch (e) {
      throw new Error(e?.response?.statusText || e?.message);
    }
  }
);

const notesSlice = createSlice({
  name: "note",
  initialState: {
    notes: [],
    status: IDLE,
    errors: null,
    selectedNote: null,
  },
  reducers: {
    addNote: (state, action) => {
      state.notes.push(action.payload);
    },
    removeNote: (state) => {},
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllNotes.pending, (state) => void (state.status = LOADING))
      .addCase(fetchAllNotes.fulfilled, (state, action) => {
        state.status = SUCCESS;
        state.notes = action.payload;
      })
      .addCase(fetchAllNotes.rejected, (state, action) => {
        state.status = FAILED;
        state.errors = action.error.message;
      })
      .addCase(createNewNote.pending, (state) => void (state.status = LOADING))
      .addCase(createNewNote.fulfilled, (state, action) => {
        state.status = SUCCESS;
        state.notes.push(action.payload);
      })
      .addCase(createNewNote.rejected, (state, action) => {
        state.status = FAILED;
        state.errors = action.error.message;
      });
  },
});

export const { addNote, removeNote } = notesSlice.actions;
export default notesSlice.reducer;
