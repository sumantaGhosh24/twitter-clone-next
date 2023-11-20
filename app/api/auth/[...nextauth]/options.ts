import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const options = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
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
      async authorize(credentials: {email: string; password: string}) {
        try {
          // ! find user using email
          const foundUser = {
            email: "abc@abc.com",
            password: "something",
            role: "",
          };
          if (foundUser) {
            const match = await bcrypt.compare(
              credentials.password,
              foundUser.password
            );
            if (match) {
              foundUser["password"] = "";
              foundUser["role"] = "Unverified email";
              return foundUser;
            }
          }
        } catch (error) {
          console.log(error);
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({token, user}: {token: any; user: any}) {
      if (user) token.role = user.role;
      return token;
    },
    async session({session, token}: {session: any; token: any}) {
      if (session?.user) session.user.role = token.role;
      return session;
    },
  },
};
