import { create } from 'zustand';
import { getSession, addFavouriteToDB } from '@/actions/auth';

// Define the store
const useMovieStore = create((set, get) => ({
  favMovies: [],

  // Function to add a movie to favorites
  addFavorite: async (movie) => {
    // const session = await getSession(); // Fetch session data
    // let fav_movies = session.fav_movies;
    // if (!fav_movies.includes(movie)) {
    //   fav_movies.push(String(movie)); // Update session data
    //   session.fav_movies = fav_movies;
    //   await session.save(); // Save session
    // }

    const movieId = String(movie);

    // Get current state
    const { favMovies } = get();

    // Check if movieId already exists in favMovies array
    if (!favMovies.includes(movieId)) {
      // Update Zustand store
      set((state) => ({ favMovies: [...state.favMovies, movieId] }));
      // Update database
      //addFavouriteToDB(movie); // Assuming addFavouriteToDB takes movie as an argument
    } else {
      console.log('Movie already exists in favorites.');
    }
  },

  // Function to remove a movie from favorites
  removeFavorite: (movieId) =>
    set((state) => ({
      favMovies: state.favMovies.filter((movie) => movie.id !== movieId),
    })),
}));

// Load state from session on store creation
const loadStateFromSession = async () => {
  const session = await getSession();
  if (session.fav_movies) {
    useMovieStore.setState({ favMovies: session.fav_movies });
  }
};

// Call the function to load state from session when the store is created
loadStateFromSession();

export default useMovieStore;
