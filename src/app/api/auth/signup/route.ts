import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const uri = "mongodb+srv://onpreeyaja:BgsexfJp7Vja0cAJ@cluster0.ypt6z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const dbName = "Auth"; 

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

export async function POST(req: Request) {
  let client;
  try {
    const { email, password } = await req.json();

    const { db, client: connectedClient } = await connectToDatabase();
    client = connectedClient;

    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return NextResponse.json({
        status: false,
        message: "User already exists",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = {
      email,
      password: hashPassword,
    };

    await db.collection("users").insertOne(newUser);

    return NextResponse.json({
      status: true,
      message: "User registered successfully",
      redirect: "/home" 
    });
  } catch (e) {
    console.error("Error during signup:", e);
    return NextResponse.json({
      status: false,
      message: "Signup failed",
    });
  } finally {
    if (client) {
      await client.close();
    }
  }
}
