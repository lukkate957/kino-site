import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { selectMovieDetails } from '../redux/movieSlice';
import { fetchReviews, selectReview, selectReviews } from '../redux/reviewsSlice';
import { IMovieDetails} from "../models/IMovie";
import {IReview} from "../models/IReview";
import SearchBar from './SearchBar';

const Profile: React.FC = () => {
  const dispatch = useAppDispatch();
  const movie: IMovieDetails = useAppSelector(selectMovieDetails);
  const userReviews: IReview[] | null = useAppSelector(selectReviews);

  useEffect(() => {
    dispatch(fetchReviews());
  }, [dispatch]);

  
    return (
      <div>
      <SearchBar />
        <h1>Мой Профиль</h1>
        <h2>Catherine957</h2>
        <img src="https://seasons-project.ru/wp-content/uploads/2021/06/fb939113eab54cab8a255906c123.jpg.jpg" alt="Profile" />
        <div>
      <h2>Отзывы:</h2>
      {userReviews.map((review, index) => (
        <div key={index} style={{ marginBottom: '20px', borderBottom: '1px solid grey' }}>
          <img src={review.posterUrlPreview} alt={movie.nameRu || movie.nameEn} />
          <p>{review.movieNameRu}</p>
          <p>Оценка: {review.rating}</p>
          {review.comment && <p>Отзыв: {review.comment}</p>}
        </div>
      ))}
    </div>
      </div>
    );
  };
  
  export default Profile;