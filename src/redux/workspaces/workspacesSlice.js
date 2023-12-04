import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const WORKSPACES_URL = 'http://127.0.0.1:3000/api/v1/workspaces';

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
        `http://127.0.0.1:3000/api/v1/workspaces/${id}`,
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
  workspaces: [],
  isLoading: false,
  error: undefined,
};

export const workspacesSlice = createSlice({
  name: 'workspaces',
  initialState,
  reducers: {},
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
      });
  },
});

export default workspacesSlice.reducer;
