import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchMovies, selectMovies, selectSearchStatus } from '../redux/searchSlice';
import MovieCard from './MovieCard';
import SearchBar from './SearchBar';

const SearchMovies: React.FC = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  // Извлекаем параметр запроса из URL
  const queryParam = searchParams.get('q') || '';
  const movies = useAppSelector(selectMovies);
  const searchStatus = useAppSelector(selectSearchStatus);

  useEffect(() => {
    // Запускаем поиск фильмов при монтировании компонента, если параметр запроса присутствует
    if (queryParam) {
      dispatch(fetchMovies(queryParam));
    }
  }, [queryParam, dispatch]);

  const handleSearch = (query: string) => {
    dispatch(fetchMovies(query));
  };

  return (
    <div>
      <h1>Поиск фильмов</h1>
      {/* Используем компонент SearchBar и передаем props */}
      <SearchBar initialQuery={queryParam} onSearch={handleSearch} />
      {searchStatus === 'loading' && <p>Загрузка...</p>}
      <div>
        {movies.length > 0 ? (
          movies.map((film) => (
            <MovieCard key={film.filmId} film={film} />
          ))
        ) : (
          <p>Фильмы не найдены</p>
        )}
      </div>
    </div>
  );
};

export default SearchMovies;
