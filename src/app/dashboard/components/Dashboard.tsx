"use client";
import { useState, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import ExpenseForm, { Expense } from "./ExpenseForm";
import ExpenseChart from "./ExpenseChart";
import ExpenseList from "./ExpenseList";

const Dashboard = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await fetch("/api/expenses");
        const data = await res.json();
        if (data.status) {
          setExpenses(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch expenses:", err);
      }
    };

    fetchExpenses();
  }, []);

  const handleAdd = (exp: Expense) => setExpenses(prev => [exp, ...prev]);

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/expenses/${id}`, { method: "DELETE" });
      setExpenses(prev => prev.filter(e => e.id !== id));
    } catch (err) {
      console.error("Failed to delete expense:", err);
    }
  };

  const handleEdit = async (updated: Expense) => {
    try {
      await fetch(`/api/expenses/${updated.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      setExpenses(prev =>
        prev.map(e => (e.id === updated.id ? updated : e))
      );
    } catch (err) {
      console.error("Failed to update expense:", err);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Expense Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <ExpenseForm onAdd={handleAdd} />
        </Grid>

        <Grid item xs={12} md={8}>
          <ExpenseChart expenses={expenses} />
        </Grid>

        <Grid item xs={12}>
          <ExpenseList
            expenses={expenses}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
