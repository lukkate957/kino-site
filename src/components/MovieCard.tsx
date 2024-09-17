import React from 'react';
import { Link } from 'react-router-dom';

interface Genre {
  genre: string;
}

interface Film {
  filmId: number;
  kinopoiskId: number;
  nameRu?: string;
  nameEn?: string;
  rating?: string | null;
  ratingKinopoisk?: string | null;
  genres: Genre[];
  posterUrlPreview: string;
}

interface MovieCardProps {
  film: Film;
}

const MovieCard: React.FC<MovieCardProps> = ({ film }) => {
    return (
      <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
        <img src={film.posterUrlPreview} alt={film.nameRu || film.nameEn} style={{ width: '100px' }} />
        <Link to={`/movie/${film.filmId || film.kinopoiskId}`}>
        <h3>{film.nameRu || film.nameEn}</h3>
        </Link>
        <p>Рейтинг: {film.rating || film.ratingKinopoisk || 'Нет рейтинга'}</p>
        
        <p>Жанры: {film.genres.map((genre) => genre.genre).join(', ')}</p>
      </div>
    );
  };

export default MovieCard;