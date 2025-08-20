import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/mongodb";
import bcrypt from "bcrypt";

interface SignUpBody {
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: SignUpBody = await req.json();

    const { fullname, email, password, confirmPassword } = body;

    if (!fullname || !email || !password || !confirmPassword) {
      return NextResponse.json({ status: false, message: "All fields are required" }, { status: 400 });
    }

    if (password !== confirmPassword) {
      return NextResponse.json({ status: false, message: "Passwords do not match" }, { status: 400 });
    }

    const { db, client } = await connectToDatabase();

    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      await client.close();
      return NextResponse.json({ status: false, message: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.collection("users").insertOne({
      fullname,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    });

    await client.close();

    return NextResponse.json({ status: true, message: "User registered successfully" }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ status: false, message: "Registration failed" }, { status: 500 });
  }
}
