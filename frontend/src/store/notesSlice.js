import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { FAILED, IDLE, LOADING, SUCCESS } from "../constants";
import { getApiConfig } from "../utils/getApiConfig";
import { handleError } from "../utils/handleError";

export const fetchAllNotes = createAsyncThunk("notes/fetch", async function () {
  try {
    const { data } = await axios.get("/api/notes", getApiConfig());
    return data;
  } catch (e) {
    handleError(e);
  }
});
export const createNewNote = createAsyncThunk(
  "notes/create",
  async (formData) => {
    try {
      const { data } = await axios.post(
        "/api/notes/create",
        formData,
        getApiConfig()
      );
      return data;
    } catch (e) {
      handleError(e);
    }
  }
);
export const fetchNoteById = createAsyncThunk("note/get", async (noteId) => {
  try {
    const { data } = await axios.get(`/api/notes/${noteId}`, getApiConfig());
    return data;
  } catch (e) {
    handleError(e);
  }
});
export const editNote = createAsyncThunk(
  "note/edit",
  async (formData, noteId) => {
    try {
      const { data } = await axios.put(
        `/api/notes/${noteId}`,
        formData,
        getApiConfig
      );
      return data;
    } catch (e) {
      handleError(e);
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
    clearSelectedNote: (state) => {
      state.selectedNote = null;
    },
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
      })
      .addCase(fetchNoteById.pending, (state) => void (state.status = LOADING))
      .addCase(fetchNoteById.fulfilled, (state, action) => {
        state.status = SUCCESS;
        state.selectedNote = action.payload;
      })
      .addCase(fetchNoteById.rejected, (state, action) => {
        state.status = FAILED;
        state.errors = action.error.message;
      });
  },
});

export const { addNote, clearSelectedNote } = notesSlice.actions;
export default notesSlice.reducer;
