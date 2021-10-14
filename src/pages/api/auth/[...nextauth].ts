import NextAuth, { Account, Profile, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import Providers from 'next-auth/providers';

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    jwt: async (token, user, account, profile, isNewUser) => {
      if (account?.id) {
        token.uid = account.id;
      }
      return token;
    },

    session: async (session, token: JWT) => {
      session.uid = token.uid;
      return session;
    },
  },
});
//4tLcoz81FvV1UVkEMlyzsJe1bH12
