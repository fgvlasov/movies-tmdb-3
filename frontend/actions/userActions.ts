'use server';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { LoginFormSchema, FormState } from '@/lib/schemas';
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

export const signup = async (prevState: FormState, formData: FormData) => {
  const session = await getSession();

  // Validate form fields
  const validatedFields = LoginFormSchema.safeParse({
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
  });
  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 2. Prepare data for insertion into database
  const { username, email, password } = validatedFields.data;

  // 3. Insert the user into the database or call an Auth Library's API
  const userData = await fetch(`http://localhost:8080/signup`, {
    method: 'POST',
    body: JSON.stringify({ username, email, password }),
    headers: { 'Content-Type': 'application/json' },
  });

  const response = await userData.json();
  // console.log("userInfo response: ", authUser.authUser.user );
  // return

  // Create session with extracted data
  session.token = response.authUser.session.access_token;
  session.userId = response.authUser.user.id;
  session.email = response.dbUser.email;
  session.fav_movies = response.dbUser.fav_movies;
  session.username = response.dbUser.username;
  session.isAdmin = response.dbUser.is_admin;
  session.isLoggedIn = true;

  // 4. Create user session
  await session.save();

  // 5. Redirect user
  redirect('/profile');
};

export const login = async (prevState: FormState, formData: FormData) => {
  const session = await getSession();

  // Validate form fields
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });
  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 2. Prepare data for insertion into database
  const { email, password } = validatedFields.data;

  // 3. Insert the user into the database or call an Auth Library's API
  const userData = await fetch(`http://localhost:8080/login`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: { 'Content-Type': 'application/json' },
  });

  const authUser = await userData.json();

  // return
  // Create session with extracted data
  session.token = authUser.data.access_token;
  session.userId = authUser.data.user.id;
  session.fav_movies = authUser.user.fav_movies;
  session.email = authUser.data.user.email;
  session.username = authUser.user.username;
  session.isAdmin = authUser.user.is_admin;
  session.isLoggedIn = true;

  //console.log('movies: ', session.fav_movies);

  // 4. Create user session
  await session.save();

  // 5. Redirect user
  redirect('/profile');
};

export const logoutAction = async () => {
  const session = await getSession();
  session.destroy();
  redirect('/');
};

export const changeSelfAdmin = async () => {
  const session = await getSession();
  let token = session.token;

  await fetch('http://localhost:8080/auth/user', {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    method: 'PUT',
    body: JSON.stringify({ is_admin: !session.isAdmin }),
  });

  session.isAdmin = !session.isAdmin;

  await session.save();
  revalidatePath('/profile');
};

export const changeUserAdmin = async (formData: FormData) => {
  const session = await getSession();

  let token = session.token;

  let authId = formData.get('authId');
  let isAdmin = formData.get('isAdmin');

  // console.log("userId: ", authId);
  // console.log("isAdmin: ", isAdmin);

  let admin = JSON.parse(isAdmin);

  await fetch('http://localhost:8080/auth/user', {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    method: 'PUT',
    body: JSON.stringify({ auth_id: authId, is_admin: !admin }),
  });
  revalidatePath('/users');
};

export const deleteUser = async (formData: FormData) => {
  const session = await getSession();
  let token = session.token;
  let userId = formData.get('authId');

  if (!session.isAdmin) return console.log('You are not Admin User');
  try {
    await fetch('http://localhost:8080/auth/user', {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userId }),
    });
    //console.log(userId);
  } catch (error) {
    console.log('user not deleted: ', error);
  }

  revalidatePath('/users');
};

export const usersList = async (): Promise<string[]> => {
  const session = await getSession();
  let token = session.token;

  try {
    const response = await fetch('http://localhost:8080/users', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const users = await response.json();
    console.log(users); // Log the fetched users data
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error; // Rethrow the error so it can be caught by the caller
  }
};
