import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Login as LoginUser} from "../tools/api/person/api"; 
import { saveUserData } from "../tools/indexedDB/indexedDB";

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleFieldChange = (field, value) => {
    setCredentials({ ...credentials, [field]: value });
  };

  const handleLogin = async () => {
    try {
      const response = await LoginUser(credentials);
      console.log(response)
      if (response.token) {
        saveUserData(response); // Guarda el token en IndexedDB
        navigate('/'); // Redirige a Home si el login es exitoso
      } else {
        setError("Credenciales incorrectas");
      }
    } catch (error) {
      console.error('Error en el login:', error);
      setError("Ocurrió un error durante el login");
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: "auto", padding: 3, mt: 5 }}>
      <Typography variant="h4" gutterBottom>Login</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <TextField label="Username" value={credentials.username} onChange={(e) => handleFieldChange("username", e.target.value)} fullWidth margin="normal" />
      <TextField label="Contraseña" type="password" value={credentials.password} onChange={(e) => handleFieldChange("password", e.target.value)} fullWidth margin="normal" />
      <Button variant="contained" color="primary" fullWidth sx={{ mt: 3 }} onClick={handleLogin}>Iniciar Sesión</Button>
      <Button component={Link} to="/" variant="outlined" color="secondary" fullWidth sx={{ mt: 2 }}>Atrás</Button>
    </Box>
  );
};

export default Login;
