import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchMovies from './components/SearchMoviesPage';
import MoviePage from './components/MoviePage';
import Profile from './components/Profile';
import PopularMoviesPage from './components/PopularMoviesPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PopularMoviesPage />} />
        <Route path="/search/" element={<SearchMovies />} />
        <Route path="/movie/:id" element={<MoviePage />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
