"use client";

import { Box, Container } from "@mui/material";
import { useSession } from "next-auth/react";

import GuestHero from "@/app/home/components/GuestHero";
import UserHero from "@/app/home/components/UserHero";
import Features from "@/app/home/components/Features";
import TechStack from "@/app/home/components/TechStack";
import CTA from "@/app/home/components/CTA";

export default function HomePage() {
  const { data: session } = useSession();
  const username = session?.user?.name || "User";

  return (
    <Box sx={{ bgcolor: "#f5f7fa", minHeight: "100vh", pt: 8 }}>
      <Container maxWidth="lg">
        {session ? <UserHero username={username} /> : <GuestHero />}
      </Container>
      <Features />
      <TechStack />
      <CTA />
    </Box>
  );
}
