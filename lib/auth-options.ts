import NextAuth, { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { Bind } from "./ldap-auth";

const ldap = require("ldapjs");
const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "TU LDAP",
      credentials: {
        username: { label: "Nutzerkennung", type: "text", placeholder: "" },
        password: { label: "Passwort", type: "password" },
      },

      async authorize(credentials, req) {
        if (process.env.LDAP == "FALSE") {
          if (credentials?.password == "admin") {
            return { id: "admin" };
          } else {
            return null;
          }
        }

        if (credentials == null) return null;

        let user = (await Bind(credentials)) as User;

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      const isSignIn = user ? true : false;

      if (isSignIn) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = { id: token.id } as User;

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
export { authOptions };
