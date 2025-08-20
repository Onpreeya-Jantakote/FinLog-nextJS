import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { connectToDatabase } from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ status: false, message: "Unauthorized" }, { status: 401 });
    }

    const { db, client } = await connectToDatabase();
    const result = await db.collection("expenses").deleteOne({
      _id: new ObjectId(params.id),
      userId: session.user.id,
    });
    await client.close();

    if (result.deletedCount === 0) {
      return NextResponse.json({ status: false, message: "Expense not found" }, { status: 404 });
    }

    return NextResponse.json({ status: true, message: "Expense deleted successfully" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ status: false, message: "Failed to delete expense" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ status: false, message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, amount, category, date } = body;

    const { db, client } = await connectToDatabase();
    const result = await db.collection("expenses").updateOne(
      { _id: new ObjectId(params.id), userId: session.user.id },
      { $set: { name, amount: Number(amount), category, date } }
    );
    await client.close();

    if (result.matchedCount === 0) {
      return NextResponse.json({ status: false, message: "Expense not found" }, { status: 404 });
    }

    return NextResponse.json({ status: true, message: "Expense updated successfully" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ status: false, message: "Failed to update expense" }, { status: 500 });
  }
}
