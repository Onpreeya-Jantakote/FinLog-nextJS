"use client";
import React, { FormEvent, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Stack,
  Link,
} from "@mui/material";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");

    if (form.password !== form.confirmPassword) {
      setMessage("Passwords do not match.");
      setIsError(true);
      return;
    }

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullname: form.fullname,
          email: form.email,
          password: form.password,
          confirmPassword: form.confirmPassword,
        }),
      });
      const data = await res.json();

      setMessage(data.message);
      setIsError(!data.status);

      if (data.status) {
        setForm({ fullname: "", email: "", password: "", confirmPassword: "" });
        router.push("/signin");
      }
    } catch (err) {
      console.error(err);
      setMessage("An error occurred during signup.");
      setIsError(true);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f0f2f5",
        px: 2,
      }}
    >
      <Card
        sx={{ maxWidth: 400, width: "100%", borderRadius: 4, boxShadow: 6 }}
      >
        <CardContent>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            align="center"
            sx={{ fontWeight: 600 }}
          >
            Sign Up
          </Typography>

          {message && (
            <Typography
              variant="body2"
              color={isError ? "error.main" : "success.main"}
              align="center"
              sx={{ mb: 2 }}
            >
              {message}
            </Typography>
          )}

          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                label="Full Name"
                variant="outlined"
                value={form.fullname}
                onChange={(e) => setForm({ ...form, fullname: e.target.value })}
                required
                fullWidth
              />
              <TextField
                label="Email"
                type="email"
                variant="outlined"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                fullWidth
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                fullWidth
              />
              <TextField
                label="Confirm Password"
                type="password"
                variant="outlined"
                value={form.confirmPassword}
                onChange={(e) =>
                  setForm({ ...form, confirmPassword: e.target.value })
                }
                required
                fullWidth
              />

              <Button
                type="submit"
                variant="contained"
                sx={{
                  py: 1.5,
                  fontWeight: 600,
                  bgcolor: "primary.main",
                  "&:hover": { bgcolor: "primary.dark" },
                  borderRadius: 3,
                  textTransform: "none",
                }}
                fullWidth
              >
                Sign Up
              </Button>

              <Typography variant="body2" align="center">
                Already have an account?{" "}
                <Link href="/signin" underline="hover">
                  Sign In
                </Link>
              </Typography>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
