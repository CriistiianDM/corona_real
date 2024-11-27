import React, { useState } from "react";
import { Box, Button, TextField, Typography, Select, MenuItem } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { CreateUser } from "../tools/api/person/api"; // Importa la función CreateUser

const Register = () => {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    name: "",
    tel: "",
    identification: "",
    lugar_expedicion: "",
    type_person: 1,
    username: "",
    password: ""
  });

  const handleFieldChange = (field, value) => {
    setNewUser({ ...newUser, [field]: value });
  };

  const handleRegister = async () => {
    try {
      const response = await CreateUser(newUser);
      console.log(response)
      if (response?.username) {
        navigate('/'); // Redirige a Login si el registro es exitoso
      } else {
        console.error('Error en el registro');
      }
    } catch (error) {
      console.error('Error en el registro:', error);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: "auto", padding: 3, mt: 5 }}>
      <Typography variant="h4" gutterBottom>Registro</Typography>
      <TextField label="Nombre" value={newUser.name} onChange={(e) => handleFieldChange("name", e.target.value)} fullWidth margin="normal" />
      <TextField label="Teléfono" type="number" value={newUser.tel} onChange={(e) => handleFieldChange("tel", e.target.value)} fullWidth margin="normal" />
      <TextField label="Cédula" type="number" value={newUser.identification} onChange={(e) => handleFieldChange("identification", e.target.value)} fullWidth margin="normal" />
      <TextField label="Lugar de Expedición" type="text" value={newUser.fecha_expedicion} onChange={(e) => handleFieldChange("lugar_expedicion", e.target.value)} fullWidth margin="normal" InputLabelProps={{ shrink: true }} />
      <Typography variant="subtitle1" sx={{ mt: 2 }}>Tipo de Persona</Typography>
      <Select value={newUser.type_person} onChange={(e) => handleFieldChange("type_person", e.target.value)} fullWidth margin="normal">
        <MenuItem value={1}>Cliente</MenuItem>
        <MenuItem value={2}>Empleado</MenuItem>
      </Select>
      <TextField label="Username" value={newUser.username} onChange={(e) => handleFieldChange("username", e.target.value)} fullWidth margin="normal" />
      <TextField label="Contraseña" type="password" value={newUser.password} onChange={(e) => handleFieldChange("password", e.target.value)} fullWidth margin="normal" />
      <Button variant="contained" color="primary" fullWidth sx={{ mt: 3 }} onClick={handleRegister}>Registrarse</Button>
      <Button component={Link} to="/home" variant="outlined" color="secondary" fullWidth sx={{ mt: 2 }}>Atrás</Button>
    </Box>
  );
};

export default Register;
