import React, { useState } from 'react';
import useGenreFetch from '@/hooks/useGenreFetch';
import { Button } from './ui/button';

interface GenreProps {
  genre: any[]; // Assuming genre is an array of objects with id and name properties
  setGenre: React.Dispatch<React.SetStateAction<any[]>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  type: string;
  value: any[];
  setValue: React.Dispatch<React.SetStateAction<any[]>>;
}

const Genre: React.FC<GenreProps> = ({
  genre,
  setGenre,
  setPage,
  type,
  value,
  setValue,
}) => {
  const { genres, loading } = useGenreFetch(type);

  const categoryAdd = (selectedGenre: any) => {
    setValue([...value, selectedGenre]);
    setGenre(genre.filter((g) => g.id !== selectedGenre.id));
    setPage(1);
  };

  const categoryRemove = (selectedGenre: any) => {
    setValue(value.filter((g) => g.id !== selectedGenre.id));
    setGenre([...genre, selectedGenre]);
    setPage(1);
  };
  //console.log(genres);
  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex gap-1 flex-wrap">
          {value &&
            value.map((selectedGenre) => (
              <div className="m-2" key={selectedGenre.id}>
                <Button
                  className=" px-4 py-2 text-center"
                  variant="secondary"
                  onClick={() => categoryRemove(selectedGenre)}
                >
                  {selectedGenre.name}
                </Button>
              </div>
            ))}
          {genre &&
            genres.map((genre) => (
              <div className="m-2" key={genre.id}>
                <Button
                  className="px-4 py-2 text-center"
                  onClick={() => categoryAdd(genre)}
                >
                  {genre.name}
                </Button>
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default Genre;
