"use client";
import { useState } from "react";
import EditExpenseForm from "./EditExpenseForm";
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Chip,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Expense } from "./ExpenseForm";
import ConfirmDelete from "./ConfirmDelete";

interface ExpenseListProps {
  expenses: Expense[];
  onDelete: (id: string) => void;
  onEdit: (expense: Expense) => void;
}

export default function ExpenseList({
  expenses,
  onDelete,
  onEdit,
}: ExpenseListProps) {
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Expense | null>(null);
  const [open, setOpen] = useState(false);

  const handleEditClick = (expense: Expense) => {
    setSelectedExpense(expense);
    setOpen(true);
  };

  const handleSave = (updated: Expense) => {
    onEdit(updated);
  };

  const handleDeleteClick = (expense: Expense) => setDeleteTarget(expense);

  const handleConfirmDelete = () => {
    if (deleteTarget) {
      onDelete(deleteTarget.id);
      setDeleteTarget(null);
    }
  };

  return (
    <>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom fontWeight="bold">
          Recent Expenses
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Amount ($)</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses.map((exp) => (
              <TableRow key={exp.id}>
                <TableCell>{new Date(exp.date).toLocaleDateString()}</TableCell>
                <TableCell>{exp.name}</TableCell>
                <TableCell>
                  <Chip label={exp.category} color="primary" />
                </TableCell>
                <TableCell>{exp.amount.toFixed(2)}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditClick(exp)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteClick(exp)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <EditExpenseForm
        open={open}
        expense={selectedExpense}
        onClose={() => setOpen(false)}
        onSave={handleSave}
      />

      <ConfirmDelete
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
        itemName={deleteTarget?.name || ""}
      />
    </>
  );
}
