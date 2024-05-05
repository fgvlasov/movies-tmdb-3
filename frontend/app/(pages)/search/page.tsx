'use client';
import React, { useState, useEffect } from 'react';
import MovieCard from '@/components/MovieCard';
import { useSearchParams } from 'next/navigation';

const SearchMovies = () => {
  const [state, setState] = useState([]); //store the fetched data
  const searchParams = useSearchParams();

  const query = searchParams.get('query');

  const fetchSearch = async () => {
    const data = await fetch(`
    https://api.themoviedb.org/3/search/movie?query=${query}&api_key=e81c223d31b00c7d1171c0b4e9de5c4d&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false`);
    const dataJ = await data.json();
    setState(dataJ.results);
  };

  useEffect(() => {
    if (query) {
      fetchSearch();
    }
  }, [query]);

  return (
    <div className="container">
      <div className="row py-5 my-5">
        <h1 className="text-lg font-semibold md:text-2xl">Search</h1>

        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {state.map((Val) => (
            <MovieCard data={Val} key={Val.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchMovies;
