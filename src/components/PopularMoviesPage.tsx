import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchMovies, selectMovies, selectSearchStatus } from '../redux/searchSlice';
import MovieCard from './MovieCard';
import SearchBar from './SearchBar';
import { fetchPopularMovies, selectPopularMovies, selectPopularMoviesStatus } from '../redux/popularMoviesSlice';

const PopularMoviesPage: React.FC = () => {

  const dispatch = useAppDispatch();

  // Извлекаем параметр запроса из URL
  
  const popularMovies = useAppSelector(selectPopularMovies);
  const PopularMoviesStatus = useAppSelector(selectPopularMoviesStatus);

  // Добавьте состояние для текущей страницы
const [currentPage, setCurrentPage] = useState(1);
const totalPages = 35; // Общее количество страниц (700 фильмов / 20 фильмов на страницу)

// Функции для навигации по страницам
const goToFirstPage = () => setCurrentPage(1);
const goToLastPage = () => setCurrentPage(totalPages);
const goToNextPage = () => setCurrentPage(prev => (prev < totalPages ? prev + 1 : prev));
const goToPreviousPage = () => setCurrentPage(prev => (prev > 1 ? prev - 1 : prev));

  useEffect(() => {
    
      dispatch(fetchPopularMovies(currentPage));
    
  }, [currentPage, dispatch]);

  return (
    <div>
      {/* Используем компонент SearchBar и передаем props */}
      <SearchBar />
      {PopularMoviesStatus === 'loading' && <p>Загрузка...</p>}
      <div>
        {popularMovies.length > 0 ? (
          popularMovies.map((film) => (
            <MovieCard key={film.filmId} film={film} />
          ))
        ) : (
          <p>Фильмы не найдены</p>
        )}
      </div>
      <div>
      <button onClick={goToFirstPage}>Первая страница</button>
      <button onClick={goToPreviousPage}>Предыдущая страница</button>
      <span>Страница {currentPage} из {totalPages}</span>
      <button onClick={goToNextPage}>Следующая страница</button>
      <button onClick={goToLastPage}>Последняя страница</button>
    </div>
  </div>
    
  );
};

export default PopularMoviesPage;
