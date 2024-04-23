'use server';
import { LoginFormSchema, FormState } from '@/lib/schemas';
import { createSession, deleteSession } from '@/lib/sessions';
import { redirect } from 'next/navigation';
import useUserStore from '@/lib/userStore';

export async function login(state: FormState, formData: FormData) {
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
  // e.g. Hash the user's password before storing it
  // const hashedPassword = await bcrypt.hash(password, 10)

  // 3. Insert the user into the database or call an Auth Library's API
  const data = await fetch(`http://localhost:8080/login`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: { 'Content-Type': 'application/json' },
  });
  //console.log(data);

  const userData = await data.json();
  //console.log('ResData from backend: ', userData);

  if (userData.status === '400') {
    console.error('Error getting user from server');
    return {
      message: 'An error occurred while login into your account.',
    };
  }
  if (!userData?.user) {
    console.error('Error getting user from server');
    return {
      message: 'Error getting user from server',
    };
  }

  const { id, role } = userData.user;

  // Create user object with extracted data
  const userData2 = { id, role };
  await console.log(userData2);

  // 4. Create user session
  await createSession(userData.user.id);

  // 5. Redirect user
  redirect('/users');
}

export async function logout() {
  await deleteSession();

  // Utilize the useUser hook to clear the user from the store

  redirect('/login');
}
