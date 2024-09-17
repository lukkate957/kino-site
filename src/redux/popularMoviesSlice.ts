import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from './store';

interface PopularMoviesState {
  movies: any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: PopularMoviesState = {
  movies: [],
  status: 'idle',
  error: null,
};

// export const fetchPopularMovies = createAsyncThunk('movies/fetchPopularMovies', async (page = 1) => {
//   const response = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_POPULAR_ALL&page=${page}`, {
//       headers: {
//         'X-API-KEY': '4ae2012c-94f0-4b7f-9397-158c52ecc1b4',
//         'Content-Type': 'application/json',
//       },
//     });
//   return response.json();
// });

export const fetchPopularMovies = createAsyncThunk<
  any, // Тип данных, который thunk должен вернуть после завершения
  number, // Тип первого аргумента функции
  {
    rejectValue: string // Тип для значения, которое будет использоваться в случае ошибки
  }
>('movies/fetchPopularMovies', async (page = 1, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_POPULAR_ALL&page=${page}`, {
        headers: {
          'X-API-KEY': '4ae2012c-94f0-4b7f-9397-158c52ecc1b4',
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    } catch (error) {
      return rejectWithValue('Ошибка запроса');
    }
});



const searchSlice = createSlice({
  name: 'popularmovies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Add any fetched movies to the array
        state.movies = action.payload.items;
      })
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export const selectPopularMovies = (state: RootState) => state.popularmovies.movies;
export const selectPopularMoviesStatus = (state: RootState) => state.popularmovies.status;
export const selectPopularMoviesError = (state: RootState) => state.popularmovies.error;

export default searchSlice.reducer;
