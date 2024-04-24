'use client';
import { useEffect, useState } from 'react';
import MovieCard from '@/components/MovieCard';

const FavoritesPage = () => {
  const [state, setState] = useState(null);
  const fetchFavourites = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/1011985?api_key=e81c223d31b00c7d1171c0b4e9de5c4d`
      );
      const data = await response.json();
      return data; // Return the data to be added to the array
    } catch (error) {
      console.error('Error fetching favourites:', error);
      return null; // Return null in case of an error
    }
  };

  // Example of how to use fetchFavourites and add data to an array
  const favouritesArray: any[] = []; // Initialize an empty array to store favourites

  // Call fetchFavourites and add the data to the favouritesArray
  fetchFavourites()
    .then((data) => {
      if (data) {
        favouritesArray.push(data); // Add the fetched data to the array
        console.log('Favourites array:', favouritesArray);
      } else {
        console.log('Error fetching favourites. Data is null.');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });

  console.log(favouritesArray);

  return (
    <div className="container">
      <h2 className="font-bold mb-8">Favourite movies:</h2>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        {favouritesArray.map((Val) => (
          <MovieCard data={Val} key={Val.id} />
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
