// components/Navbar.js
"use client";
import React from 'react';
import Link from 'next/link';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          รายรับและรายจ่าย
        </Typography>
        <Link href="/" passHref>
          <Button color="inherit">หน้าแรก</Button>
        </Link>
        <Link href="/report" passHref>
          <Button color="inherit">รายงาน</Button>
        </Link>
        <Link href="/settings" passHref>
          <Button color="inherit">การตั้งค่า</Button>
        </Link>
        <Link href="/signin" passHref>
          <Button color="inherit">เข้าสู่ระบบ</Button>
        </Link>
        <Link href="/signup" passHref>
          <Button color="inherit">สมัครสมาชิก</Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
