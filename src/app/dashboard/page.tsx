"use client";

import { Box, Typography, Button } from "@mui/material";
import { useSession, signIn } from "next-auth/react";
import Dashboard from "./components/Dashboard";

const UserDashboard = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Typography>Loading...</Typography>;
  }

  if (!session) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h6" gutterBottom>
          You are not logged in!!
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Dashboard />
    </Box>
  );
};

export default UserDashboard;
