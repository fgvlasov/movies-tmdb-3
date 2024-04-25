import { create } from 'zustand';

// Define the store
const useMovieStore = create((set) => ({
  favMovies: [],

  // Function to add a movie to favorites
  addFavorite: (movie) =>
    set((state) => ({ favMovies: [...state.favMovies, movie] })),

  // Function to remove a movie from favorites
  removeFavorite: (movieId) =>
    set((state) => ({
      favMovies: state.favMovies.filter((movie) => movie.id !== movieId),
    })),
}));

export default useMovieStore;
