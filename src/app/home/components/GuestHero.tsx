"use client";

import { Grid, Typography, Stack, Button, Box } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export default function GuestHero() {
  return (
    <Grid container spacing={4} alignItems="center">
      <Grid item xs={12} md={6}>
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 2, color: "primary.main" }}>
          Take Control of Your Finances
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          FinLog helps you track your income and expenses effortlessly. Stay on top of your money and plan your future with confidence.
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button component={Link} href="/signup" variant="contained" color="primary" size="large" sx={{ borderRadius: "50px", px: 4, py: 1.5 }}>
            Get Started
          </Button>
        </Stack>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box sx={{ width: "100%", maxWidth: 500, height: 400, overflow: "hidden", mx: "auto", position: "relative" }}>
          <Image src="/image/cover.jpg" alt="Finance illustration" fill style={{ objectFit: "cover" }} />
        </Box>
      </Grid>
    </Grid>
  );
}
