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
import { isUserAuthenticated, removeUserData, saveUserData } from "./tools/indexedDB/indexedDB";

const AppContent = () => {
  const [user, setUser] = useState(null); // Estado para guardar la información del usuario
  const location = useLocation();
  const navigate = useNavigate();

  // Determina si se debe mostrar el Sidebar
  const showSidebar = location.pathname !== "/login" && location.pathname !== "/register";

  // Carga inicial para verificar si hay un usuario autenticado
  useEffect(() => {
    isUserAuthenticated((data) => {
      if (data) setUser(data); // Guarda los datos del usuario en el estado
    });
  }, []);

  // Manejo del cierre de sesión
  const handleLogout = () => {
    removeUserData(); // Elimina la información del usuario almacenada
    setUser(null);    // Reinicia el estado del usuario
    navigate("/");    // Redirige a Home
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Barra superior */}
      <AppBar position="fixed" sx={{ backgroundColor: "#5f1414" }}>
        <Toolbar>
          <img src="/Logo.png" alt="Logo" style={{ height: "60px", marginRight: "20px" }} />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Corona Real</Typography>
          {/* Botones del toolbar */}
          {user ? (
            <>
              <Typography variant="h6">Bienvenido, {user.name}</Typography>
              <Button color="inherit" onClick={() => navigate("/register")}>Registro</Button>
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

      {/* Sidebar (si aplica) */}
      {showSidebar && <Sidebar />}

      {/* Contenido principal */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar /> {/* Espacio para la barra superior */}
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
