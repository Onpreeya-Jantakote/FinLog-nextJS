"use client";
import React from "react";
import Link from "next/link";
import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import { useSession, signOut } from "next-auth/react";

const Navbar: React.FC = () => {
  const { data: session } = useSession();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h5"
          sx={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            fontWeight: 700,
            fontFamily: "'Poppins', sans-serif",
            color: "white",
            letterSpacing: 1,
            cursor: "pointer",
            textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
          }}
        >
          <Box
            sx={{
              width: 24,
              height: 24,
              bgcolor: "secondary.main",
              borderRadius: "50%",
              mr: 1,
            }}
          />
          <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
            FinLog
          </Link>
        </Typography>

        {session ? (
          <>
            <Typography variant="body1" sx={{ mx: 2 }}>
              Hi, {session.user?.name || session.user?.email}
            </Typography>

            <Button
              onClick={() => signOut({ callbackUrl: "/signin" })}
              sx={{
                bgcolor: "error.main",
                color: "white",
                textTransform: "none",
                fontWeight: 600,
                borderRadius: 2,
                padding: "6px 16px",
                "&:hover": {
                  bgcolor: "error.dark", 
                  color: "white",
                },
                boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
              }}
            >
              Sign Out
            </Button>
          </>
        ) : (
          <>
            <Link href="/signin" passHref>
              <Button
                sx={{
                  bgcolor: "primary.main",
                  color: "white",
                  textTransform: "none",
                  marginRight: 2,
                }}
              >
                Sign In
              </Button>
            </Link>

            <Button
              component={Link}
              href="/signup"
              sx={{
                bgcolor: "white",
                color: "primary.main",
                textTransform: "none",
                fontWeight: 600,
                borderRadius: 10,
                padding: "8px 16px",
                "&:hover": {
                  bgcolor: "primary.dark",
                  color: "white",
                },
                border: "1px solid",
                borderColor: "primary.main",
              }}
            >
              Sign Up
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
