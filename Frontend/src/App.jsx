import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Room from "./pages/Room";
import Product from "./pages/Product";
import { Box, CssBaseline, AppBar, Toolbar, Typography } from "@mui/material";

function App() {

  return (
    <Router>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        <Sidebar />

        <Box component="main" sx={{ flexGrow: 1 }}>
          <AppBar
            position="fixed"
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor:"#FEFEFE" }}
          >
            <Toolbar>
              <img
                src="/Logo.png"
                alt="Logo"
                style={{ height: "60px", marginRight: "20px" }}
              />
              <Typography variant="h6" noWrap color= "Black">
                Corona Real
              </Typography>
            </Toolbar>
          </AppBar>

          <Toolbar />

          <Box sx={{ p: 3 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/rooms" element={<Room />} />
              <Route path="/products" element={<Product />} />
            </Routes>
          </Box>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
