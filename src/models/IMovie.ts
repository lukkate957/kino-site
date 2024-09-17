export interface Country {
    country: string;
  }
  
  export interface Genre {
    genre: string;
  }
  
  export interface IMovie {
    filmId: number;
    nameRu?: string;
    nameEn?: string;
    year: string;
    description: string;
    filmLength: string;
    countries: Country[];
    genres: Genre[];
    rating: string;
    posterUrl: string;
    posterUrlPreview: string;
    ratingKinopoisk?: string;
    slogan?: string;
  }

  export interface IMovieDetails {
    kinopoiskId: number;
    nameRu?: string;
    nameEn?: string;
    year: string;
    description: string;
    filmLength: string;
    countries: Country[];
    genres: Genre[];
    rating: string;
    posterUrl: string;
    posterUrlPreview: string;
    ratingKinopoisk?: string;
    slogan?: string;
  }