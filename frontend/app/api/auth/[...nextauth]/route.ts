// pages/api/auth/[...nextauth].ts
import NextAuth, { Credentials } from 'next-auth';
import { NextApiRequest, NextApiResponse } from 'next';

export default NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: Record<string, string>) {
        try {
          const response = await fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
          });

          if (response.ok) {
            const user = await response.json();
            return Promise.resolve(user);
          } else {
            return Promise.resolve(null);
          }
        } catch (error) {
          console.error('Authentication error:', error);
          return Promise.resolve(null);
        }
      },
    }),
  ],
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt(token, user) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session(session, token) {
      session.user = token.user;
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error', // Error code received and cannot be processed.
    verifyRequest: '/auth/verify-request', // Used for check email action verification requests
    newUser: null, // If set, new users will be directed here on first sign in
  },
  events: {
    signIn: async (message) => {
      // Add custom signIn event handling
    },
    signOut: async (message) => {
      // Add custom signOut event handling
    },
    createUser: async (message) => {
      // Add custom createUser event handling
    },
    linkAccount: async (message) => {
      // Add custom linkAccount event handling
    },
    session: async (message) => {
      // Add custom session event handling
    },
  },
});
