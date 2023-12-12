import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const WORKSPACES_URL = 'https://workspace-reservation.onrender.com/api/v1/workspaces';

export const getWorkspaces = createAsyncThunk(
  'workspaces/getWorkspaces',
  async (token, { rejectWithValue }) => {
    try {
      const resp = await axios.get(WORKSPACES_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return resp.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const getWorkspace = createAsyncThunk(
  'workspaces/getWorkspace',
  async (data, { rejectWithValue }) => {
    const { id, token } = data;
    try {
      const resp = await axios.get(`${WORKSPACES_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return resp.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const postWorkspace = createAsyncThunk(
  'workspaces/postWorkspaces',
  async (newData, { rejectWithValue }) => {
    const { data, token } = newData;
    try {
      const response = await axios.post(WORKSPACES_URL, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const deleteWorkspace = createAsyncThunk(
  'workspaces/deleteWorkspaces',
  async (deleteData, { rejectWithValue }) => {
    const { id, token } = deleteData;
    try {
      const response = await axios.delete(
        `${WORKSPACES_URL}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const initialState = {
  workspace: {},
  workspaces: [],
  isLoading: false,
  error: undefined,
  // post states
  isPosting: false,
  postFail: undefined,
  // delete states
  isDeleting: false,
  deleteFail: undefined,
};

export const workspacesSlice = createSlice({
  name: 'workspaces',
  initialState,
  reducers: {
    resetPostFail: (state) => {
      state.postFail = undefined;
    },
    resetDeleteFail: (state) => {
      state.deleteFail = undefined;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getWorkspaces.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getWorkspaces.fulfilled, (state, action) => {
        state.isLoading = false;
        state.workspaces = action.payload.workspaces;
      })
      .addCase(getWorkspaces.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(getWorkspace.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getWorkspace.fulfilled, (state, action) => {
        state.isLoading = false;
        state.workspace = action.payload.workspace;
      })
      .addCase(getWorkspace.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(postWorkspace.pending, (state) => {
        state.isPosting = true;
      })
      .addCase(postWorkspace.fulfilled, (state) => {
        state.isPosting = false;
      })
      .addCase(postWorkspace.rejected, (state, action) => {
        state.isPosting = false;
        state.postFail = action.payload.message;
      })
      .addCase(deleteWorkspace.pending, (state) => {
        state.isDeleting = true;
      })
      .addCase(deleteWorkspace.fulfilled, (state) => {
        state.isDeleting = false;
      })
      .addCase(deleteWorkspace.rejected, (state, action) => {
        state.isDeleting = false;
        state.deleteFail = action.payload.message;
      });
  },
});

export const { resetPostFail, resetDeleteFail } = workspacesSlice.actions;
export default workspacesSlice.reducer;
