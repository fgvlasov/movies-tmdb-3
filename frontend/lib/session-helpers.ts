import { SessionOptions } from 'iron-session';

export interface SessionData {
  token: string; // user access_token
  userId?: string; // user auth_id
  username?: string; // user username
  email?: string; // user email
  fav_movies?: string[]; // user favorite movies
  avatar?: string;
  isAdmin?: boolean; // user is-admin
  isLoggedIn: boolean;
}

export const defaultSession: SessionData = {
  token: '',
  isLoggedIn: false,
  isAdmin: false,
};

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET!,
  cookieName: 'tmdb-session',
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  },
};
