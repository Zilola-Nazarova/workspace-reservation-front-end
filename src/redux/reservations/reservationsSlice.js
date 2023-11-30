import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const RESERVATIONS_URL = 'http://127.0.0.1:3000/api/v1/reservations';

export const getReservations = createAsyncThunk(
  'reservations/getReservations',
  async (_, thunkAPI) => {
    try {
      const resp = await axios.get(RESERVATIONS_URL);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

const ReservationsJson = [
  {
    ID: 1,
    start_date: '4.12.2023',
    end_date: '5.12.2023',
    city: 'Redmond',
    user_id: 4,
    workspace_id: 1,
  },
  {
    ID: 2,
    start_date: '6.12.2023',
    end_date: '6.12.2023',
    city: 'Freiburg',
    user_id: 4,
    workspace_id: 2,
  },
  {
    ID: 3,
    start_date: '7.12.2023',
    end_date: '8.12.2023',
    city: 'Trinidad',
    user_id: 4,
    workspace_id: 3,
  },
  {
    ID: 4,
    start_date: '4.12.2023',
    end_date: '5.12.2023',
    city: 'Ito',
    user_id: 3,
    workspace_id: 3,
  },
  {
    ID: 5,
    start_date: '7.12.2023',
    end_date: '8.12.2023',
    city: 'Appleton',
    user_id: 3,
    workspace_id: 4,
  },
];

const initialState = {
  reservations: ReservationsJson,
  isLoading: false,
  error: undefined,
};

export const reservationsSlice = createSlice({
  name: 'reservations',
  initialState,
  reducers: { },
  extraReducers(builder) {
    builder
      .addCase(getReservations.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReservations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reservations = action.payload.reservations;
      })
      .addCase(getReservations.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      });
  },
});

export default reservationsSlice.reducer;
