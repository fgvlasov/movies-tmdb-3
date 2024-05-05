'use client';
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { FolderCheck, FolderHeart } from 'lucide-react';
import {
  favouritesAddMovie,
  favouritesDeleteMovie,
  favouritesCheckMovie,
} from '@/actions/favouritesActions';

interface MovieCardProps {
  data: {
    id: number;
    name?: string;
    title?: string;
    poster_path?: string;
    first_air_date?: string;
    release_date?: string;
    media_type?: string;
  };
}

const MovieCard: React.FC<MovieCardProps> = ({ data }) => {
  const {
    id,
    name,
    title,
    poster_path,
    first_air_date,
    release_date,
    media_type,
  } = data;

  const year = new Date(release_date).getFullYear();

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchFavorites = async () => {
      const inFavorites = await favouritesCheckMovie(id);
      setIsFavorite(inFavorites);
    };

    fetchFavorites();
  }, [id]);

  const handleFavoritesAction = async () => {
    if (!isFavorite) {
      await favouritesAddMovie(id); // Add the movie to favorites
    } else {
      await favouritesDeleteMovie(id);
    }
    setIsFavorite(!isFavorite); // Toggle the favorite status
  };

  return (
    <Card key={id}>
      <div className="card bg-dark" key={id}>
        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w300/${poster_path}`
              : 'unavailable.jpg'
          }
          className="card-img-top pt-3 pb-0 px-3"
          alt={title || name}
          width="100%"
        />
        <CardTitle className="text-md  text-center font-medium p-2">
          {title || name}
        </CardTitle>
        <CardContent>
          <div className="flex items-center justify-between">
            {media_type && (
              <div>{media_type === 'tv' ? 'TV Series' : 'Movie'}</div>
            )}
            {release_date && <div>{year} year</div>}
            <Button variant="ghost" onClick={handleFavoritesAction}>
              {isFavorite ? <FolderCheck /> : <FolderHeart />}
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default MovieCard;
