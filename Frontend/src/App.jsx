import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Room from "./pages/Room";
import Product from "./pages/Product";
import Person from "./pages/Person";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Company from "./pages/Company";
import { Box, CssBaseline, AppBar, Toolbar, Typography, Button } from "@mui/material";
import { createDB, test } from "./tools/api/api"

const AppContent = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Determinar si se muestra el sidebar
  const showSidebar = location.pathname !== "/login" && location.pathname !== "/register";

  React.useEffect(() => {
    createDB()
    test()
  },[])

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
            <Typography variant="h4" noWrap color="White">
              Corona Real
            </Typography>
            
            {/* Espacio entre el título y los botones */}
            <Box sx={{ flexGrow: 1 }} />

            {/* Botones para Login y Registro */}
            <Button color="inherit" onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button color="inherit" onClick={() => navigate("/register")}>
              Registro
            </Button>
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
            <Route path="/company" element={<Company />} />
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
