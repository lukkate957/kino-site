import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from './store';

interface MovieState {
  details: any;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: MovieState = {
  details: {},
  status: 'idle',
  error: null,
};

export const fetchMovieDetails = createAsyncThunk('movie/fetchDetails', async (id: number) => {
  const response = await axios.get(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}`, {
    headers: {
      'X-API-KEY': '4ae2012c-94f0-4b7f-9397-158c52ecc1b4',
      'Content-Type': 'application/json',
    },
  });
  return response.data;
});

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.details = action.payload;
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export const selectMovieDetails = (state: RootState) => state.movie.details;
export const selectMovieStatus = (state: RootState) => state.movie.status;
export const selectMovieError = (state: RootState) => state.movie.error;

export default movieSlice.reducer;
