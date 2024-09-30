"use client";
import { useState, useEffect } from "react";
import { Button, TextField, MenuItem } from "@mui/material";
import styles from "./page.module.css";
import axios from "axios";

export default function Home() {
  const [formData, setFormData] = useState({
    amount: "",
    date: "",
    type: "income",
    notes: "",
  });
  const [transactions, setTransactions] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await axios.get("/api/transactions");
      const data = res.data;
      setTransactions(data);

      // คำนวณยอดรวมรายรับและรายจ่าย
      const income = data
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);
      const expense = data
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);

      setTotalIncome(income);
      setTotalExpense(expense);
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการดึงรายการ:", error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/transactions", formData);
      setTransactions([...transactions, res.data]);
      setFormData({
        amount: "",
        date: "",
        type: "income",
        notes: "",
      });

      // อัปเดตยอดรวม
      fetchTransactions();
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการบันทึกรายการ:", error);
    }
  };

  return (
    <div className={styles.page}>
      <h1>รายรับและรายจ่าย</h1>

      {/* ฟอร์มกรอกข้อมูลรายรับและรายจ่าย */}
      <form onSubmit={handleSubmit}>
        <TextField
          label="จำนวนเงิน"
          name="amount"
          type="number"
          value={formData.amount}
          onChange={handleInputChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label=""
          name="date"
          type="date"
          value={formData.date}
          onChange={handleInputChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="ประเภท"
          name="type"
          select
          value={formData.type}
          onChange={handleInputChange}
          fullWidth
          sx={{ mb: 2 }}
        >
          <MenuItem value="income">รายรับ</MenuItem>
          <MenuItem value="expense">รายจ่าย</MenuItem>
        </TextField>
        <TextField
          label="โน้ต"
          name="notes"
          value={formData.notes}
          onChange={handleInputChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" color="primary">
          เพิ่มรายการ
        </Button>
      </form>

      {/* แสดงรายการที่บันทึก */}
      <h2>รายการ</h2>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction._id}>
            {transaction.date} - {transaction.type.toUpperCase()}: ${transaction.amount} - {transaction.notes}
          </li>
        ))}
      </ul>

      {/* แสดงยอดรวม */}
      <h3>ยอดรวมรายรับ : {totalIncome} บาท</h3>
      <h3>ยอดรวมรายจ่าย : {totalExpense} บาท</h3>
    </div>
  );
}
