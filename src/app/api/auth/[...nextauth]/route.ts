import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import LineProvider from "next-auth/providers/line";
import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const uri: string = process.env.MONGODB_URI!;
const dbName: string = "financial-app";

async function connectToDatabase() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    return { db: client.db(dbName), client };
  } catch (error) {
    console.error("Database connection error:", error);
    throw new Error("Database connection failed");
  }
}

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },
  providers: [
    LineProvider({
      clientId: process.env.LINE_CLIENT_ID!,
      clientSecret: process.env.LINE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: { email: {}, password: {} },
      async authorize(credentials, req) {
        if (!credentials) {
          throw new Error("Credentials are required");
        }
        const { email, password }: { email: string; password: string } = credentials;
        
        const { db, client } = await connectToDatabase();
        
        const user = await db.collection("users").findOne({ email });
        if (!user) {
          return null;
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
          return null;
        }

        return { id: user._id.toString(), email: user.email, name: user.name };
      },
    }),
  ],
});

export { handler as GET, handler as POST };
