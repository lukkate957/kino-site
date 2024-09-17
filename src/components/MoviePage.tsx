import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchMovieDetails, selectMovieDetails, selectMovieStatus } from '../redux/movieSlice';
import { fetchReviewById, selectReview } from '../redux/reviewsSlice';
import {IMovie, Genre, Country, IMovieDetails} from "../models/IMovie";
import {IReview} from "../models/IReview";
import { submitReview as submitReviewThunk, updateReview as updateReviewThunk } from '../redux/reviewsSlice';
import SearchBar from './SearchBar';

const MoviePage: React.FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const movie: IMovieDetails = useAppSelector(selectMovieDetails);
  const userReview: IReview | null = useAppSelector(selectReview);
  const status = useAppSelector(selectMovieStatus);
  
  const [rating, setRating] = useState<number | null>(null);
  const [reviewText, setReviewText] = useState('');
  const [selectedReviews, setSelectedReviews] = useState<IReview[]>([]);

  useEffect(() => {
    if (id) {
      dispatch(fetchMovieDetails(parseInt(id)));
      let shuffledReviews = [...reviewsMock].sort(() => 0.5 - Math.random());
      setSelectedReviews(shuffledReviews.slice(0, 5));
      dispatch(fetchReviewById(parseInt(id)))
    }
  }, [id]);

  useEffect(() => {
    if (userReview) {
      let updatedReviews = [];
      const existingReviewIndex = selectedReviews.findIndex((r) => r.userId === userId);
      if (existingReviewIndex !== -1) {
        updatedReviews = [...selectedReviews];
        updatedReviews[existingReviewIndex] = userReview;
      } else {
        updatedReviews = [userReview, ...selectedReviews];
      }
      setSelectedReviews(updatedReviews.slice(0, 6));
    }
  }, [userReview]);

  const handleReviewChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReviewText(event.target.value);
  };

  const userId = 101;

  const submitReview = () => {
    const reviewRating  = userReview ? userReview.rating : rating;
    if (reviewRating && reviewText.trim() && movie) {
      const newReview = {
        userId: userId,
        rating: reviewRating,
        comment: reviewText,
        movieId: movie.kinopoiskId,
        id: movie.kinopoiskId,
        movieNameRu: movie.nameRu,
        movieNameEn: movie.nameEn,
        posterUrlPreview: movie.posterUrlPreview
      };

      setReviewText('');
      if (userReview) {
        dispatch(updateReviewThunk(newReview));
      } else {
        dispatch(submitReviewThunk(newReview));
      }
    } else {
      alert("Пожалуйста, оцените фильм перед отправкой отзыва.");
    }
  };

  const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRating(parseInt(event.target.value));
  };

  const submitRating = () => {
    if (rating !== null && movie) {
      const newReview = {
        userId: userId,
        rating: rating,
        comment: userReview ? userReview.comment : '',
        movieId: movie.kinopoiskId,
        id: movie.kinopoiskId,
        movieNameRu: movie.nameRu,
        movieNameEn: movie.nameEn,
        posterUrlPreview: movie.posterUrlPreview
      };

      setReviewText('');
      if (userReview) {
        dispatch(updateReviewThunk(newReview));
      } else {
        dispatch(submitReviewThunk(newReview));
      }
      console.log(`Отправка оценки ${rating} для фильма ${movie.nameRu || movie.nameEn}`);
      // Здесь можно добавить логику для отправки оценки на сервер
    }
  };
  const negativeReviews = [
    "Совсем не понравилось, актеры как будто не старались.",
    "Плохой сценарий и ужасные спецэффекты. Не рекомендую.",
    "Скучно и нудно, время потрачено впустую.",
    "Очень слабый фильм, не стоит тратить на него время.",
    "Актерская игра оставляет желать лучшего.",
    "Не смог досмотреть до конца, ужасно.",
    "Сюжет невероятно занудный и предсказуемый.",
    "Это было плохо, очень плохо.",
    "Ни смеха, ни слез. Скучно и грустно.",
    "Тратить время на этот фильм - большая ошибка.",
    "Не понимаю, как это можно назвать кинематографом.",
    "Ни драйва, ни интереса. Сплошное разочарование.",
    "Могло бы быть и хуже, но вряд ли.",
    "Сюжетная линия никуда не ведет.",
    "Отсутствие логики поражает. Не советую.",
    "Это было так скучно, что я заснул.",
    "Потеря времени и денег. Не рекомендую.",
    "Даже не знаю, что и сказать. Ужасно.",
    "Спецэффекты ужасны, актеры играют еще хуже.",
    "Актеры старались, но сценарий испортил все."
  ];
  
  const neutralReviews = [
    "Неплохо, но могло бы быть и лучше.",
    "Обычный фильм, ничего особенного.",
    "Средненько, без особых восторгов.",
    "Можно посмотреть, если больше нечего делать.",
    "Не плохо, но и не впечатляет.",
    "Фильм среднего качества, без изюминки.",
    "Обычное кино для разового просмотра.",
    "Ничего особенного, но и не разочаровывает.",
    "Для любителей жанра может быть интересно.",
    "Не впечатлил, но и не раздражает.",
    "Нормальный фильм, но есть и получше.",
    "Стоит посмотреть, если нравится такой жанр.",
    "Может понравиться, а может и нет.",
    "Не самый лучший фильм, но вполне смотрится.",
    "Подойдет для просмотра в компании друзей.",
    "Неплохая картинка для вечернего времяпрепровождения.",
    "Может заинтересовать, но не уверен.",
    "Стоит попробовать посмотреть.",
    "Неплохо, но мне казалось, будет лучше.",
    "Не поразил, но и не разочаровал."
  ];
  
  const positiveReviews = [
    "Отличный фильм, очень понравился!",
    "Замечательно, рекомендую к просмотру!",
    "Прекрасный сценарий и игра актеров!",
    "Один из лучших фильмов, что я видел!",
    "Отличное кино, полное смысла и эмоций.",
    "Великолепная режиссура и актерская игра.",
    "Это кинематографический шедевр.",
    "Захватывающий сюжет и невероятные персонажи.",
    "Этот фильм оставил глубокий след в душе.",
    "Невероятно трогательный и искренний фильм.",
    "Это было прекрасно, я в восторге.",
    "Фильм сильно впечатлил и заставил задуматься.",
    "Картина, полная глубокого смысла.",
    "Великолепная история, рекомендую всем.",
    "Замечательное кино, полное надежды и света.",
    "Прекрасное сочетание музыки, сюжета и актерской игры.",
    "Я в полном восторге от этого фильма!",
    "Это было восхитительно, рекомендую к просмотру.",
    "Великолепная драма, заставляющая задуматься о жизни.",
    "Отличный фильм, полный смысла и глубины.",
    "Прекрасное кино, которое оставит след в вашей душе.",
    "Это кино перевернуло мое представление о жанре.",
    "Впечатляющий сюжет и великолепная игра актеров!",
    "Очень мотивирующий и вдохновляющий фильм.",
    "Это кино заставило меня по-новому взглянуть на мир.",
    "Прекрасный фильм, полный жизни и энергии.",
    "Это кино подарило мне массу положительных эмоций.",
    "Потрясающий фильм, который оставил след в душе.",
    "Великолепное кино, способное изменить взгляды.",
    "Очень глубокий и трогательный фильм.",
    "Это был невероятный опыт, рекомендую всем.",
    "Это кино полно глубокого смысла и эмоций.",
    "Впечатляющая история с великолепной игрой актеров.",
    "Это кино заставляет задуматься о важном.",
    "Прекрасный фильм, который стоит посмотреть каждому.",
    "Очень мотивирующий и вдохновляющий фильм.",
    "Это кино заставляет верить в лучшее.",
    "Впечатляющий сюжет и глубокий смысл.",
    "Прекрасная история, полная надежды и света.",
    "Это было невероятно, рекомендую всем.",
    "Потрясающий фильм с великолепной актерской игрой.",
    "Это кино подарило мне массу вдохновения.",
    "Очень глубокий и значимый фильм.",
    "Великолепный сюжет и захватывающие сцены.",
    "Это кино оставило глубокий след в моей душе.",
    "Прекрасный фильм, полный глубокого смысла.",
    "Это было восхитительно, рекомендую к просмотру.",
    "Великолепный фильм, полный эмоций и чувств.",
    "Потрясающая картина, способная изменить взгляд на мир."
  ];
  
  const reviewsMock: IReview[] = [
    ...negativeReviews.map((review, index) => ({
      userId: index + 1,
      rating: Math.floor(Math.random() * 4) + 1,
      comment: review,
      movieId: movie.kinopoiskId
    })),
    ...neutralReviews.map((review, index) => ({
      userId: index + 21,
      rating: Math.floor(Math.random() * 2) + 5,
      comment: review,
      movieId: movie.kinopoiskId
    })),
    ...positiveReviews.map((review, index) => ({
      userId: index + 51,
      rating: Math.floor(Math.random() * 4) + 7,
      comment: review,
      movieId: movie.kinopoiskId
    }))
  ];
  
  return (
    <div>
      <SearchBar />
      {status === 'loading' && <p>Загрузка...</p>}
      {status === 'succeeded' && (
        <div>
          <h1>{movie.nameRu || movie.nameEn}</h1>
          <img src={movie.posterUrlPreview} alt={movie.nameRu || movie.nameEn} />
          <p>Рейтинг КиноПоиска: {movie.ratingKinopoisk}</p>
          <p>Год: {movie.year}</p>
          <p>Страна: {movie.countries.map((country: Country) => country.country).join(', ')}</p>
          <p>Жанры: {movie.genres.map((genre: Genre) => genre.genre).join(', ')}</p>
          <p>Слоган: {movie.slogan}</p>
          <p>Описание: {movie.description}</p>
          <div>
            <p>Оцените фильм:</p>
            <div>
              {Array.from({ length: 10 }, (_, i) => i + 1).map((number) => (
                <label key={number}>
                  {number}
                  <input
                    type="radio"
                    value={number}
                    checked={rating === number}
                    onChange={handleRatingChange}
                  />
                </label>
              ))}
            </div>
            <button onClick={submitRating}>Отправить оценку</button>
          </div>
          <div>
            <p>Оставьте отзыв:</p>
            <textarea value={reviewText} onChange={handleReviewChange} />
            <button onClick={submitReview}>Отправить отзыв</button>
          </div>
          <div>
            <h2>Ваш отзыв:</h2>
            {userReview ? (
              <div style={{ marginBottom: '20px', borderBottom: '1px solid grey' }}>
                <p>{userReview.comment}</p>
              </div>
            ) : (
              <p>Вы еще не оставили отзыв.</p>
            )}
          </div>
          <div>
      <h2>Отзывы:</h2>
      {selectedReviews.map((review, index) => (
        <div key={index} style={{ marginBottom: '20px', borderBottom: '1px solid grey' }}>
          <p>Оценка: {review.rating}</p>
          {review.comment && <p>Отзыв: {review.comment}</p>}
        </div>
      ))}
    </div>

        </div>
      )}
    </div>
  );
};

export default MoviePage;
