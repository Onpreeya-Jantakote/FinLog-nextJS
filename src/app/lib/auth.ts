import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "./mongodb";
import bcrypt from "bcrypt";
import type { JWT } from "next-auth/jwt";
import type { Session, User } from "next-auth";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { db, client } = await connectToDatabase();
        const user = await db.collection("users").findOne({ email: credentials?.email });
        await client.close();

        if (user && credentials?.password && (await bcrypt.compare(credentials.password, user.password))) {
          return { id: user._id.toString(), name: user.fullname, email: user.email };
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt" as const,
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) session.user.id = token.id as string;
      return session;
    },
  },
};
