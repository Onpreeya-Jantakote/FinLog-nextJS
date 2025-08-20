"use client";

import { Box, Typography, Button } from "@mui/material";
import Link from "next/link";

export default function CTA() {
  return (
    <Box sx={{ py: 12, textAlign: "center", bgcolor: "#1976d2", color: "white" }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
        Ready to Take Control of Your Money?
      </Typography>
    </Box>
  );
}
