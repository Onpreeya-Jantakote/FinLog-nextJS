"use client";

import { Box, Typography, Button } from "@mui/material";
import Link from "next/link";

export default function UserHero({ username }: { username: string }) {
  return (
    <Box textAlign="center">
      <Typography variant="h3" sx={{ fontWeight: 700, mb: 2, color: "primary.main" }}>
        Welcome, {username}!
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
        Check your latest transactions and manage your finances efficiently.
      </Typography>
      <Button component={Link} href="/dashboard" variant="contained" color="primary" size="large" sx={{ borderRadius: "50px", px: 4, py: 1.5 }}>
        Go to Dashboard
      </Button>
    </Box>
  );
}
