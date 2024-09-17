// SearchBar.tsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

type SearchBarProps = {
  initialQuery?: string;
  onSearch?: (query: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({initialQuery = '', onSearch}) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(initialQuery); // Добавлено состояние для управления поисковым запросом

  if (!onSearch) {
    // по дефолту редиректим на страницу поиска
    onSearch = (query) => {
      const trimmedQuery = query.trim();
      if (trimmedQuery) {
        navigate(`/search/?q=${encodeURIComponent(trimmedQuery)}`);
      }
    };
  }

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter' && onSearch) onSearch(searchQuery); }}
      />
      <button onClick={() => onSearch && onSearch(searchQuery)}>Искать</button>
      <Link to={`/profile`}>
        <button>Профиль</button>
        </Link>
        <Link to={`/`}>
        <button>Главная</button>
        </Link>
    </div>
  );
};


export default SearchBar;
