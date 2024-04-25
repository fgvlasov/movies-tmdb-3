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
import useUserStore from '@/lib/userStore';

export const getSession = async () => {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
  }

  return session;
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
  // console.log("userInfo response: ", authUser );
  // return
  // Create session with extracted data
  session.token = authUser.data.access_token;
  session.userId = authUser.data.user.id;
  session.email = authUser.data.user.email;
  session.username = authUser.user.username;
  session.isAdmin = authUser.user.is_admin;
  session.isLoggedIn = true;

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

export const changeAdmin = async () => {
  const session = await getSession();

  let authId = session.token;

  // const changeIdDb = await fetch("http://localhost:8080/auth/user", {
  //   credentials: "include",
  //   headers: {
  //     "Content-Type": "application/json",
  //     "Authorization": `Bearer ${authId}`
  //   },
  //   method: "PUT",
  //   body: JSON.stringify({is_admin: !session.isAdmin})
  // })

  console.log('authId: ', authId);
  return;
  // session.isAdmin = true

  // await session.save()
  // revalidatePath("/profile")
};

export const deleteUser = async (authId: any) => {
  const session = await getSession();

  let user_token = session.token;

  const deleteUserSupabase = await fetch('http://localhost:8080/auth/user', {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user_token}`,
    },
    method: 'DELETE',
    body: JSON.stringify({ authId }),
  });

  return;
};
