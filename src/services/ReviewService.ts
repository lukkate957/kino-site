// ReviewService.ts
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IReview} from "../models/IReview";

export const reviewAPI = createApi({
    reducerPath: 'reviewAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000'}),
    endpoints: (build) => ({
        fetchAllReviews: build.query<IReview[], number>({
            query: (limit: number = 5) => ({
                url: `/reviews`,
                params: {
                    _limit: limit
                }
            }),
        }),
        addReview: build.mutation<IReview, Partial<IReview>>({
            query: (review) => ({
                url: '/reviews',
                method: 'POST',
                body: review
            }),
        }),
    }),
});

export const { useFetchAllReviewsQuery, useAddReviewMutation } = reviewAPI;
