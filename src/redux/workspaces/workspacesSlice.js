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
  'workspaces/postworkspaces',
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

const initialState = {
  workspace: {},
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
      });
  },
});

export default workspacesSlice.reducer;
