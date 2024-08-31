import { sql } from '@vercel/postgres';
import { compare } from 'bcrypt';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },

  pages: {
    signIn: '/login',
  },

  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {},
        password: {},
      },
      async authorize(credentials) {
        const response =
          await sql`SELECT * FROM USERS WHERE username = ${credentials?.username}`;

        const user = response.rows[0];

        if (!user) {
          throw new Error('User does not exist!');
        }

        const correctPassword = await compare(
          credentials?.password || '',
          user.password
        );

        if (!correctPassword) {
          throw new Error('Incorrect password.');
        }

        return {
          id: user.id,
          username: user.username,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as number;
        session.user.username = token.username as string;
      } else {
        session.user = {
          id: token.id as number,
          username: token.username as string,
        };
      }
      return session;
    },
  },
};
