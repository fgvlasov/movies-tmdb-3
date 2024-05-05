'use client';
import React, { useState, useEffect } from 'react';
import Pagination from '@/components/Pagination';
import MovieCard from '@/components/MovieCard';

const TrendingMovies = () => {
  const [state, setState] = useState([]); //store the fetched data
  const [page, setPage] = useState(1); //keep a track of the page numbers

  const fetchTrending = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=e81c223d31b00c7d1171c0b4e9de5c4d&page=${page}`
    );
    const dataJ = await data.json();

    setState(dataJ.results);
  };

  useEffect(() => {
    fetchTrending();
  }, [page]);

  const handleFavoriteChanged = () => {};

  return (
    <div className="py-5 my-5">
      <h1 className="text-lg font-semibold md:text-2xl">Trending Movies</h1>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        {state.map((Val) => (
          <MovieCard
            data={Val}
            key={Val.id}
            onFavoriteChanged={() => handleFavoriteChanged()}
          />
        ))}
      </div>
      <Pagination page={page} setPage={setPage} />
    </div>
  );
};

export default TrendingMovies;
