"use client";

import { Box, Container, Grid, Card, CardContent, Typography } from "@mui/material";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import SecurityIcon from "@mui/icons-material/Security";
import MemoryIcon from "@mui/icons-material/Memory";
import BarChartIcon from "@mui/icons-material/BarChart";

const features = [
  { title: "Smart Tracking", description: "Automatically categorize your income and expenses for easy insights.", icon: <SmartToyIcon sx={{ fontSize: 50, color: "primary.main" }} /> },
  { title: "Data Security", description: "Your financial data is stored securely in our encrypted MongoDB database.", icon: <SecurityIcon sx={{ fontSize: 50, color: "primary.main" }} /> },
  { title: "Modern Technology", description: "Built with Next.js, React, MUI and NextAuth for a fast, responsive experience.", icon: <MemoryIcon sx={{ fontSize: 50, color: "primary.main" }} /> },
  { title: "Reports & Analytics", description: "Generate detailed reports to understand your spending patterns and plan ahead.", icon: <BarChartIcon sx={{ fontSize: 50, color: "primary.main" }} /> },
];

export default function Features() {
  return (
    <Box sx={{ py: 12, bgcolor: "white" }}>
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 6, textAlign: "center" }}>
          Why Choose FinLog?
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card sx={{ display: "flex", alignItems: "center", p: 3, gap: 3, boxShadow: 3 }}>
                {feature.icon}
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>{feature.title}</Typography>
                  <Typography variant="body2" color="text.secondary">{feature.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
