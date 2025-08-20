"use client";

import { Box, Typography } from "@mui/material";

export default function CTA() {
  return (
    <Box sx={{ py: 12, textAlign: "center", bgcolor: "#1976d2", color: "white" }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
        Ready to Take Control of Your Money?
      </Typography>
    </Box>
  );
}
