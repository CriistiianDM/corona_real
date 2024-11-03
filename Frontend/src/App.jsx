import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Room from "./pages/Room";
import Product from "./pages/Product";
import Person from "./pages/Person";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Box, CssBaseline, AppBar, Toolbar, Typography } from "@mui/material";

const AppContent = () => {
  const location = useLocation();

  // Determinar si se muestra el sidebar
  const showSidebar = location.pathname !== "/Login" && location.pathname !== "/Register";

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* Renderiza Sidebar solo en rutas específicas */}
      {showSidebar && <Sidebar />}

      <Box component="main" sx={{ flexGrow: 1 }}>
        <AppBar
          position="fixed"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            backgroundColor: "#e38369",
          }}
        >
          <Toolbar>
            <img
              src="/Logo.png"
              alt="Logo"
              style={{ height: "60px", marginRight: "20px" }}
            />
            <Typography variant="h6" noWrap color="Black">
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
            <Route path="/wallets" element={<Product />} />
            <Route path="/person" element={<Person />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
