'use client';
import React, { useState, useEffect } from 'react';
import Pagination from '@/components/Pagination';
import Genre from '@/components/Genre';
import useGenre from '@/hooks/useGenre';
import MovieCard from '@/components/MovieCard';
import useMovieStore from '@/stores/moviesStore';

const Movies = () => {
  const [state, setState] = useState([]); //store the fetched data
  const [page, setPage] = useState(1); //keep a track of the page numbers
  const [genre, setGenre] = useState([]); //used to store the original genre values
  const [value, setValue] = useState([]); //used to store the selected genre values
  const genreURL = useGenre(value);
  const { favMovies } = useMovieStore.getState();

  const fetchTrending = async () => {
    const data = await fetch(`
    https://api.themoviedb.org/3/discover/movie?api_key=e81c223d31b00c7d1171c0b4e9de5c4d&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreURL}`);
    const dataJ = await data.json();
    setState(dataJ.results);
  };

  useEffect(() => {
    fetchTrending();
  }, [page, genreURL]);

  useEffect(() => {
    console.log(favMovies);
  }, []);

  return (
    <>
      <h1 className="text-lg font-semibold md:text-2xl m-2">Movies</h1>
      <Genre
        genre={genre}
        setGenre={setGenre}
        setPage={setPage}
        type="movie"
        value={value}
        setValue={setValue}
      />
      <p>{favMovies}</p>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        {state.map((Val) => (
          <MovieCard data={Val} key={Val.id} />
        ))}
      </div>
      <Pagination page={page} setPage={setPage} />
    </>
  );
};

export default Movies;
