import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Room from "./pages/Room";
import Product from "./pages/Product";
import Person from "./pages/Person";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AppBar, Toolbar, Typography, Button, Box, CssBaseline } from "@mui/material";
import { isUserAuthenticated, removeUserData, initDB } from "./tools/indexedDB/indexedDB";
import Company from "./pages/Company";
import CashRegister from "./pages/CashRegister";
import { createDB, test } from "./tools/api/api"

const AppContent = () => {
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Determina si se debe mostrar el Sidebar
  const showSidebar = location.pathname !== "/login" && location.pathname !== "/register";

  // Carga inicial para comprobar autenticación
  useEffect(() => {
    initDB()
    test()
    isUserAuthenticated((data) => {
      if (data) setUser(data.username);
    });
  }, []);

  // Manejo de cierre de sesión
  const handleLogout = () => {
    removeUserData(); // Elimina datos de sesión
    setUser(null);    // Reinicia estado del usuario
    navigate("/");
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Encabezado con opciones de sesión */}
      <AppBar position="fixed" sx={{ backgroundColor: "#5f1414" }}>
  <Toolbar>
    <img src="/Logo.png" alt="Logo" style={{ height: "60px", marginRight: "20px" }} />
    <Typography variant="h6" sx={{ flexGrow: 1 }}>Corona Real</Typography>
    {/* Opciones de usuario */}
    {user ? (
      <>
        <Typography variant="h6">Bienvenido, {user}</Typography>
        <Button color="inherit" onClick={handleLogout}>Cerrar sesión</Button>
      </>
    ) : (
      <>
        <Button color="inherit" onClick={() => navigate("/login")}>Login</Button>
        <Button color="inherit" onClick={() => navigate("/register")}>Registro</Button>
      </>
    )}
  </Toolbar>
</AppBar>


      {/* Sidebar */}
      {showSidebar && <Sidebar />}

      {/* Contenido principal */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar /> {/* Espacio para el AppBar */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<Room />} />
          <Route path="/products" element={<Product />} />
          <Route path="/wallets" element={<Product />} />
          <Route path="/person" element={<Person />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/company" element={<Company />} />
          <Route path="/cash_register" element={<CashRegister />} />
        </Routes>
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
