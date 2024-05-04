'use client';
import { favoritesArray, isInFavorites } from '@/actions/auth';
import MovieCard from '@/components/MovieCard';
import { useEffect, useState } from 'react';

const FavoritesPage = () => {
  const [favoriteMovies, setFavoriteMovies] = useState([]); // Store the fetched movie details

  useEffect(() => {
    const fetchFavoriteMovies = async () => {
      try {
        // Get the array of favorite movie IDs
        const favoriteIds = await favoritesArray();

        // Fetch movie details for each favorite movie ID
        const movieDetailsPromises = favoriteIds.map(async (movieId) => {
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}?api_key=e81c223d31b00c7d1171c0b4e9de5c4d`
          );
          const data = await response.json();
          // Check if the movie is in favorites
          const isFavorite = await isInFavorites(movieId);
          // Add the isFavorite property to the movie object
          return { ...data, isFavorite };
        });

        // Wait for all promises to resolve and set the fetched movie details
        const movies = await Promise.all(movieDetailsPromises);
        setFavoriteMovies(movies);
      } catch (error) {
        console.error('Error fetching favorite movies:', error);
      }
    };

    fetchFavoriteMovies();
  }, [favoriteMovies]);

  return (
    <div className="container">
      <h1 className="text-lg font-semibold md:text-2xl">
        My favourites movies:
      </h1>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        {favoriteMovies.map((Val) => (
          <MovieCard data={Val} key={Val.id} />
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
