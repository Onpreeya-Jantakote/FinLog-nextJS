import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import LineProvider from "next-auth/providers/line";
import { MongoClient, ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const uri: string = process.env.MONGODB_URI!;
const dbName: string = "financial-app";

async function connectToDatabase() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);

    // Ensure the users collection exists
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(col => col.name);
    
    if (!collectionNames.includes("users")) {
      await db.createCollection("users");
      console.log("Created 'users' collection");
    }

    return { db, client };
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
      credentials: { email: { type: "text" }, password: { type: "password" } },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        
        const email = credentials.email;
        const password = credentials.password;
        
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

export async function registerUser(email: string, password: string, name: string) {
  const { db, client } = await connectToDatabase();
  try {
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return { status: false, message: "User already exists" };
    }

    if (!email || !password || !name) {
      return { status: false, message: "All fields are required" };
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = {
      email,
      password: hashPassword,
      name,
      createdAt: new Date(),
    };

    await db.collection("users").insertOne(newUser);
    return { status: true, message: "User registered successfully" };
  } catch (error) {
    console.error("Error during registration:", error);
    return { status: false, message: "Registration failed. Please try again later." };
  } finally {
    await client.close();
  }
}