"use client";
import { useState } from "react";
import { Box, ToggleButton, ToggleButtonGroup, Paper, Typography } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { Expense } from "./ExpenseForm";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA336A", "#FF3366", "#3366FF"];

interface ExpenseChartProps {
  expenses: Expense[];
}

export default function ExpenseChart({ expenses }: ExpenseChartProps) {
  const [chartType, setChartType] = useState<"pie" | "bar">("bar");

  const data = Object.values(expenses.reduce((acc: Record<string, { name: string, value: number }>, e) => {
    if (!acc[e.category]) acc[e.category] = { name: e.category, value: 0 };
    acc[e.category].value += e.amount;
    return acc;
  }, {}));

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom fontWeight="bold">
        Expense Overview
      </Typography>

      <ToggleButtonGroup
        value={chartType}
        exclusive
        onChange={(_, value) => value && setChartType(value)}
        sx={{ mb: 2 }}
      >
        <ToggleButton value="pie">Pie</ToggleButton>
        <ToggleButton value="bar">Bar</ToggleButton>
      </ToggleButtonGroup>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {chartType === "pie" ? (
          <PieChart width={400} height={300}>
            <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
              {data.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        ) : (
          <BarChart width={500} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8">
              {data.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
            </Bar>
          </BarChart>
        )}
      </Box>
    </Paper>
  );
}
