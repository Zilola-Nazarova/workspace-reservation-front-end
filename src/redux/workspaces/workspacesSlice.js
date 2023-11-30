import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const WORKSPACES_URL = 'http://127.0.0.1:3000/api/v1/greeting';

export const getWorkspaces = createAsyncThunk(
  'workspaces/getWorkspaces',
  async (_, thunkAPI) => {
    try {
      const resp = await axios.get(WORKSPACES_URL);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

const WorkspacesJson = [
  {
    ID: 1,
    name: 'room#1',
    image: 'https://i.pravatar.cc/300?img=1',
    description: 'Simple room with 1 seat and 1 talbes, no equipment is provided',
  },
  {
    ID: 2,
    name: 'room#2',
    image: 'https://i.pravatar.cc/300?img=2',
    description: 'Simple room with 2 seats and 1 talbe, no equipment is provided',
  },
  {
    ID: 3,
    name: 'room#3',
    image: 'https://i.pravatar.cc/300?img=3',
    description: 'Large room with 3 seats and 2 talbes, 1 monitor for presentations',
  },
  {
    ID: 4,
    name: 'room#4',
    image: 'https://i.pravatar.cc/300?img=4',
    description: 'Large room with 4 seats and 2 talbes, 1 monitor for presentations',
  },
  {
    ID: 5,
    name: 'room#5',
    image: '',
    description: 'Large room with 5 seats and 2 talbes, 1 monitor for presentations',
  },
];

const initialState = {
  workspaces: WorkspacesJson,
  isLoading: false,
  error: undefined,
};

export const workspacesSlice = createSlice({
  name: 'workspaces',
  initialState,
  reducers: { },
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
