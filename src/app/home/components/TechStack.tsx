"use client";

import { Box, Container, Grid, Typography } from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";
import DeveloperModeIcon from "@mui/icons-material/DeveloperMode";
import StorageIcon from "@mui/icons-material/Storage";
import AnalyticsIcon from "@mui/icons-material/Analytics";

const techStack = [
  { name: "Next.js", icon: <CodeIcon sx={{ fontSize: 60, color: "primary.main" }} /> },
  { name: "React", icon: <DeveloperModeIcon sx={{ fontSize: 60, color: "primary.main" }} /> },
  { name: "MUI", icon: <CodeIcon sx={{ fontSize: 60, color: "primary.main" }} /> },
  { name: "MongoDB", icon: <StorageIcon sx={{ fontSize: 60, color: "primary.main" }} /> },
  { name: "NextAuth.js", icon: <AnalyticsIcon sx={{ fontSize: 60, color: "primary.main" }} /> },
];

export default function TechStack() {
  return (
    <Box sx={{ py: 12 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 6, textAlign: "center" }}>
          Modern Technology Stack
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {techStack.map((tech, index) => (
            <Grid item xs={6} sm={4} md={2} key={index} sx={{ textAlign: "center" }}>
              {tech.icon}
              <Typography variant="subtitle1" sx={{ mt: 1, fontWeight: 600 }}>{tech.name}</Typography>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
