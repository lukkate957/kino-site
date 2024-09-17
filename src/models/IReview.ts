export interface IReview {
  id?: number;
  userId: number;
  rating: number;
  comment: string;
  movieId: number;
  movieNameRu?: string;
  movieNameEn?: string;
  posterUrlPreview?: string;
}