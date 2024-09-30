"use client";
import { Typography, Stack, TextField, Button, Link, Box } from "@mui/material";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { FormEvent } from "react";

export default function Page() {
  const router = useRouter();
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res: any = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });
      if (!res?.error) {
        // redirect
        router.push("/");
      }
    } catch (e) {
      console.error(e);
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
        เข้าสู่ระบบ
        </Typography>
          <Stack spacing={2}>
            <TextField
              name="email"
              label="อีเมล"
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
              label="รหัสผ่าน"
              variant="outlined" // เปลี่ยนให้เป็น outlined
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required // เพิ่มการตรวจสอบการกรอก
            />
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
              ลงชื่อเข้าใช้
            </Button>
            <Link href="/signup" variant="body2" sx={{ mb: 2 }}>
              ไม่มีบัญชี? ลงทะเบียน
            </Link>
          </Stack>
        </form>
      </Box>
    </Box>
  );
}
