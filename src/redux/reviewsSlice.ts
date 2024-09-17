import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from './store';
import {IReview} from "../models/IReview";

interface ReviewsState {
  reviews: IReview[];
  review: IReview | null,
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ReviewsState = {
  reviews: [],
  review: null,
  status: 'idle',
  error: null,
};

// Асинхронные thunk-функции
export const fetchReviews = createAsyncThunk('reviews/fetchReviews', async () => {
  const response = await fetch('http://localhost:5000/reviews');
  if (!response.ok) {
    throw new Error('Не удалось загрузить отзывы');
  }
  return response.json();
});

export const fetchReviewById = createAsyncThunk(
  'reviews/fetchReviewById',
  async (movieId: number) => {
    const response = await fetch(`http://localhost:5000/reviews/${movieId}`);
    if (!response.ok) {
      throw new Error('Не удалось получить отзыв');
    }
    return response.json();
  }
);

export const submitReview = createAsyncThunk(
  'reviews/submitReview',
  async (review: IReview) => {
    const response = await fetch('http://localhost:5000/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(review),
    });
    if (!response.ok) {
      throw new Error('Не удалось отправить отзыв');
    }
    return response.json();
  }
);

export const updateReview = createAsyncThunk(
  'reviews/updateReview',
  async (review: IReview) => {
    const response = await fetch(`http://localhost:5000/reviews/${review.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(review),
    });
    if (!response.ok) {
      throw new Error('Не удалось обновить отзыв');
    }
    return response.json();
  }
);

// Создание слайса
const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.reviews = action.payload;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Неизвестная ошибка';
      })
      .addCase(fetchReviewById.fulfilled, (state, action) => {
        state.review = action.payload;
        // const index = state.reviews.findIndex(review => review.movieId === action.payload.movieId);
        // if (index !== -1) {
          // state.reviews[index] = action.payload;
        // } else {
          // state.reviews.push(action.payload);
        // }
      })
      .addCase(fetchReviewById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchReviewById.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(submitReview.fulfilled, (state, action) => {
        state.review = action.payload;
        // state.reviews.push(action.payload);
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        state.review = action.payload;
        // const index = state.reviews.findIndex(review => review.movieId === action.payload.movieId);
        // if (index !== -1) {
        //   state.reviews[index] = action.payload;
        // } else {
        //   // Если отзыв не найден, добавить его
        //   state.reviews.push(action.payload);
        // }
      });
  },
});

export const selectReviews = (state: RootState) => state.reviews.reviews;
export const selectReview = (state: RootState) => state.reviews.review;
export const selectReviewsStatus = (state: RootState) => state.reviews.status;
export const selectReviewsError = (state: RootState) => state.reviews.error;

export default reviewsSlice.reducer;
