import React, { useState } from "react";
import { Box, Button, TextField, Typography, Select, MenuItem } from "@mui/material";
import { Link } from "react-router-dom"; // Importa Link para navegación

const Register = () => {
  const [newUser, setNewUser] = useState({
    name: "",
    tel: "",
    identification: "",
    fecha_expedicion: "",
    type_person: 1,
    password: "",
  });

  const handleFieldChange = (field, value) => {
    setNewUser({ ...newUser, [field]: value });
  };

  const handleRegister = () => {
    // Lógica de registro
    console.log("Usuario Registrado:", newUser);
    setNewUser({
      name: "",
      tel: "",
      identification: "",
      fecha_expedicion: "",
      type_person: 1,
      password: "",
    });
  };

  return (
    <Box sx={{ maxWidth: 400, margin: "auto", padding: 3, mt: 5 }}>
      <Typography variant="h4" gutterBottom>Registro</Typography>
      <TextField
        label="Nombre"
        value={newUser.name}
        onChange={(e) => handleFieldChange("name", e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Teléfono"
        type="number"
        value={newUser.tel}
        onChange={(e) => handleFieldChange("tel", e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Cédula"
        type="number"
        value={newUser.identification}
        onChange={(e) => handleFieldChange("identification", e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Fecha de Expedición"
        type="date"
        value={newUser.fecha_expedicion}
        onChange={(e) => handleFieldChange("fecha_expedicion", e.target.value)}
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Typography variant="subtitle1" sx={{ mt: 2 }}>Tipo de Persona</Typography>
      <Select
        value={newUser.type_person}
        onChange={(e) => handleFieldChange("type_person", e.target.value)}
        fullWidth
        margin="normal"
      >
        <MenuItem value={1}>Cliente</MenuItem>
        <MenuItem value={2}>Proveedor</MenuItem>
        <MenuItem value={3}>Empleado</MenuItem>
      </Select>
      <TextField
        label="Contraseña"
        type="password"
        value={newUser.password}
        onChange={(e) => handleFieldChange("password", e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 3 }}
        onClick={handleRegister}
      >
        Registrarse
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

export default Register;
