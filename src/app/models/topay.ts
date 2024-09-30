import mongoose, { Document, Model } from "mongoose";

interface ITransaction extends Document {
  amount: number;
  date: string; // หรือ Date หากคุณต้องการใช้ Date object
  type: "income" | "expense";
  notes?: string;
}

const transactionSchema = new mongoose.Schema<ITransaction>({
  amount: { type: Number, required: true },
  date: { type: String, required: true }, // หรือ Date
  type: { type: String, enum: ["income", "expense"], required: true },
  notes: { type: String },
});

const Transaction: Model<ITransaction> = mongoose.models.Transaction || mongoose.model("Transaction", transactionSchema);

export default Transaction;
