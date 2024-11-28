import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Room from "./pages/Room";
import Product from "./pages/Product";
import Person from "./pages/Person";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { isUserAuthenticated, removeUserData, initDB } from "./tools/indexedDB/indexedDB";
import Company from "./pages/Company";
import CashRegister from "./pages/CashRegister";
import { createDB } from "./tools/api/api"

// Components
import Header from "./components/Header/Header"
import CoronaReal from "./components/Header/CoronaReal"
import CashRegisterDetails from "./pages/CashRegisterDetails";

const AppContent = () => {
  const [user, setUser] = useState(null); // Estado para guardar la información del usuario
  const location = useLocation();
  const navigate = useNavigate();

  // Determina si se debe mostrar el Sidebar
  const showSidebar = location.pathname !== "/";

  // Carga inicial para verificar si hay un usuario autenticado
  useEffect(() => {
    initDB();
    isUserAuthenticated((data) => {
      if (data) setUser(data.username);
      if (data?.token == undefined) navigate("/login");
    });
  }, []);

  // Manejo del cierre de sesión
  const handleLogout = () => {
    removeUserData(); // Elimina la información del usuario almacenada
    setUser(null);    // Reinicia el estado del usuario
    navigate("/");    // Redirige a Login
  };

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      {/* Barra superior */}
      { showSidebar && <Header /> }
      { showSidebar && <CoronaReal />}

      {/* Contenido principal */}
       {/* Espacio para la barra superior */}
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/rooms" element={<Room />} />
          <Route path="/products" element={<Product />} />
          <Route path="/wallets" element={<Product />} />
          <Route path="/person" element={<Person />} />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/company" element={<Company />} />
          <Route path="/cash_register" element={<CashRegister />} />
          <Route path="/cash_register/:id" element={<CashRegisterDetails />} />
        </Routes>
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
