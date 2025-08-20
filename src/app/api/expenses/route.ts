import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { connectToDatabase } from "@/app/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json({ status: false, message: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { name, amount, category, date } = body;

    if (!name || !amount || !category || !date) {
      return NextResponse.json({ status: false, message: "All fields are required" }, { status: 400 });
    }

    const { db, client } = await connectToDatabase();
    const result = await db.collection("expenses").insertOne({
      userId: session.user.id,
      name,
      amount: Number(amount),
      category,
      date,
      createdAt: new Date(),
    });

    const newExpense = {
      id: result.insertedId.toString(),
      userId: session.user.id,
      name,
      amount: Number(amount),
      category,
      date,
      createdAt: new Date(),
    };

    await client.close();

    return NextResponse.json({ status: true, message: "Expense added successfully", data: newExpense });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ status: false, message: "Failed to add expense" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json({ status: false, message: "Unauthorized" }, { status: 401 });

    const { db, client } = await connectToDatabase();
    const expenses = await db.collection("expenses")
      .find({ userId: session.user.id })
      .sort({ createdAt: -1 })
      .toArray();

    const formatted = expenses.map(exp => ({
      id: exp._id.toString(),
      userId: exp.userId,
      name: exp.name,
      amount: exp.amount,
      category: exp.category,
      date: exp.date,
      createdAt: exp.createdAt,
    }));

    await client.close();

    return NextResponse.json({ status: true, data: formatted });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ status: false, message: "Failed to fetch expenses" }, { status: 500 });
  }
}