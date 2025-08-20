"use client";
import { useState } from "react";
import { Box, TextField, Button, MenuItem, Paper, Typography } from "@mui/material";

export interface Expense {
  id: string;
  name: string;
  amount: number;
  category: string;
  date: string;
}

interface ExpenseFormProps {
  onAdd: (expense: Expense) => void;
}

const categories = ["Food", "Transport", "Entertainment", "Shopping", "Utilities", "Healthcare", "Other"];

export default function ExpenseForm({ onAdd }: ExpenseFormProps) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !amount || !category) return;

    setLoading(true);

    try {
      const res = await fetch("/api/expenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, amount: Number(amount), category, date }),
      });
      const result = await res.json();

      if (result.status) {
        onAdd({ ...{ name, amount: Number(amount), category, date }, id: result.data.insertedId.toString() });
        setName("");
        setAmount("");
        setCategory("");
      } else {
        alert(result.message);
      }
    } catch (err) {
      console.error(err);
      alert("Error adding expense");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom fontWeight="bold">
        + Add New Expense
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField label="Description" value={name} onChange={e => setName(e.target.value)} fullWidth />
        <TextField label="Amount ($)" type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} fullWidth />
        <TextField type="date" value={date} onChange={e => setDate(e.target.value)} fullWidth />
        <TextField select label="Category" value={category} onChange={e => setCategory(e.target.value)} fullWidth>
          {categories.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
        </TextField>
        <Button type="submit" variant="contained" color="primary" disabled={loading}>
          {loading ? "Adding..." : "Add Expense"}
        </Button>
      </Box>
    </Paper>
  );
}
