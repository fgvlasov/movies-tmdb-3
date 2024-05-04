'use server';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

import {
  SessionData,
  defaultSession,
  sessionOptions,
} from '@/lib/session-helpers';

export const getSession = async () => {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
  }

  return session;
};

export const favouritesAddMovie = async (movie: any) => {
  const session = await getSession();

  let auth_id = session.userId;
  let user_token = session.token;
  //let fav_movies: string[] | undefined = session.fav_movies;
  let is_admin = true;
  let fav_movies = session.fav_movies as string[];

  if (!fav_movies.includes(movie)) {
    fav_movies.push(String(movie));
    session.fav_movies = fav_movies;
    console.dir(fav_movies);
    await session.save();

    await fetch('http://localhost:8080/auth/user', {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user_token}`,
      },
      method: 'PUT',
      body: JSON.stringify({ auth_id, is_admin, fav_movies }),
    });
  }
};

export const favouritesDeleteMovie = async (movie: any) => {
  const session = await getSession();

  let auth_id = session.userId;
  let user_token = session.token;
  //let fav_movies: string[] | undefined = session.fav_movies;
  let is_admin = true;
  let fav_movies = session.fav_movies as string[];
  //console.dir(fav_movies);

  if (fav_movies.includes(String(movie))) {
    fav_movies = fav_movies.filter((movieId) => movieId !== String(movie));
    if (fav_movies.length > 0) {
      session.fav_movies = fav_movies;
      console.dir('After deleting:' + fav_movies);
      await session.save();

      await fetch('http://localhost:8080/auth/user', {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user_token}`,
        },
        method: 'PUT',
        body: JSON.stringify({ auth_id, is_admin, fav_movies }),
      });
    }
  }
};

export const favouritesCheckMovie = async (movieId: any): Promise<boolean> => {
  const session = await getSession();
  let favorites = session.fav_movies as string[];
  const stringMovieId = String(movieId);
  return favorites.includes(stringMovieId);
};

export const favouritesList = async (): Promise<string[]> => {
  const session = await getSession();
  const favorites = session.fav_movies || []; // Assuming fav_movies is an array of string movie IDs
  return favorites;
};
