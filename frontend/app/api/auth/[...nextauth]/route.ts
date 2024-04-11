import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { signIn } from 'next-auth/react'; // Import signIn function

export default NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials: Record<string, string>) {
        try {
          const response = await fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
          });

          if (response.ok) {
            const { access_token } = await response.json();
            // Store the token in the session
            await signIn('credentials', { token: access_token });
            // Resolve with user data
            return Promise.resolve({
              /* user data */
            });
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
});
