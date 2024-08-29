import { sql } from '@vercel/postgres';
import { compare } from 'bcrypt';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  session: {
    strategy: 'jwt',
  },

  pages: {
    signIn: '/login',
  },

  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: {},
        password: {},
      },
      async authorize(credentials, req) {
        const response =
          await sql`SELECT * FROM USERS WHERE username = ${credentials?.username}`;

        const user = response.rows[0];

        const correctPassword = await compare(
          credentials?.password || '',
          user.password
        );

        if (correctPassword) {
          return {
            id: user.id,
            username: user.username,
          };
        }

        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
