import NextAuth, {AuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import {db} from "@/lib/prismadb";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "email",
          type: "text",
          placeholder: "Enter your email",
        },
        password: {
          label: "password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const user = await db.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        if (!user) {
          return null;
        }
        const isMatch = await bcrypt.compare(
          credentials.password,
          user.password!
        );
        if (!isMatch) {
          return null;
        }
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({token}: {token: any}) {
      const user = await getUserByEmail({email: token.email});
      token.user = user;
      return token;
    },
    async session({session, token}: {session: any; token: any}) {
      session.user = token.user;
      return session;
    },
  },
};

function exclude(user: any, keys: any) {
  return Object.fromEntries(
    Object.entries(user).filter(([key]) => !keys.includes(key))
  );
}

async function getUserByEmail({email}: {email: any}) {
  const user = await db.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!user) throw new Error("Email does not exists.");
  const userWithoutPassword = exclude(user, ["password"]);
  return userWithoutPassword;
}

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};
