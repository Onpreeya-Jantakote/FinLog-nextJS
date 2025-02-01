"use client";
import { Button, Stack, TextField, Typography, Box, Link } from "@mui/material";
import React from "react";
import { FormEvent } from "react";

export default function Page() {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = React.useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    try {
      const response = await fetch("../api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (result.status) {
        setMessage("สมัครสมาชิกสำเร็จ!");
      } else {
        setMessage(result.message || "สมัครสมาชิกล้มเหลว");
      }
    } catch (e) {
      console.error(e);
      setMessage("เกิดข้อผิดพลาดในการสมัครสมาชิก");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        bgcolor: "#f5f5f5", // พื้นหลังของหน้า
        p: 3,
      }}
    >
      <Box
        sx={{
          border: "1px solid #ccc", // กรอบสีเทา
          borderRadius: 2,
          p: 3,
          boxShadow: 3,
          bgcolor: "white", // พื้นหลังของกรอบ
          width: 400, // กำหนดความกว้างให้กรอบ
        }}
      >
        <form onSubmit={handleSubmit}>
          <Typography variant="h4" component="h1" gutterBottom>
            สมัครสมาชิก
          </Typography>
          <Stack spacing={2}>
            {message && (
              <Typography variant="body2" color="error">
                {message}
              </Typography>
            )}
            <TextField
              name="email"
              label="Email"
              variant="outlined" // เปลี่ยนให้เป็น outlined
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required // เพิ่มการตรวจสอบการกรอก
            />
            <TextField
              type="password"
              name="password"
              label="Password"
              variant="outlined" // เปลี่ยนให้เป็น outlined
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required // เพิ่มการตรวจสอบการกรอก
            />
            <Button type="submit" variant="contained" color="primary">
              สมัคร
            </Button>
            <Link href="/signin" variant="body2" sx={{ mb: 2 }}>
              มีบัญชีอยู่แล้ว? เข้าสู่ระบบ
            </Link>
          </Stack>
        </form>
      </Box>
    </Box>
  );
}
