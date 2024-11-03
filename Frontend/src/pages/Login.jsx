import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom"; // Importa Link para navegación

const Login = () => {
  const [credentials, setCredentials] = useState({
    identification: "",
    password: "",
  });

  const handleFieldChange = (field, value) => {
    setCredentials({ ...credentials, [field]: value });
  };

  const handleLogin = () => {
    // Lógica de autenticación
    console.log("Credenciales de Login:", credentials);
    setCredentials({
      identification: "",
      password: "",
    });
  };

  return (
    <Box sx={{ maxWidth: 400, margin: "auto", padding: 3, mt: 5 }}>
      <Typography variant="h4" gutterBottom>Login</Typography>
      <TextField
        label="Cédula"
        type="number"
        value={credentials.identification}
        onChange={(e) => handleFieldChange("identification", e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Contraseña"
        type="password"
        value={credentials.password}
        onChange={(e) => handleFieldChange("password", e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 3 }}
        onClick={handleLogin}
      >
        Iniciar Sesión
      </Button>

      {/* Botón de "Atrás" que redirige a Home */}
      <Button
        component={Link}
        to="/"
        variant="outlined"
        color="secondary"
        fullWidth
        sx={{ mt: 2 }}
      >
        Atrás
      </Button>
    </Box>
  );
};

export default Login;
