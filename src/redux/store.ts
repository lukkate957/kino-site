import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import searchReducer from './searchSlice';
import movieReducer from './movieSlice';
import reviewsReducer from './reviewsSlice';
import popularMoviesReducer from './popularMoviesSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    movie: movieReducer,
    reviews: reviewsReducer,
    popularmovies: popularMoviesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
