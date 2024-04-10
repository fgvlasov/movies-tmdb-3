import { useState, useEffect } from 'react';

const useGenreFetch = (type) => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGenre = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/genre/${type}/list?api_key=e81c223d31b00c7d1171c0b4e9de5c4d&language=en-US`
        );
        const { genres } = await response.json();
        setGenres(genres);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching genres:', error);
        setLoading(false);
      }
    };

    fetchGenre();

    return () => {
      // Clean up any ongoing fetch request if component unmounts
    };
  }, [type]);

  return { genres, loading };
};

export default useGenreFetch;
