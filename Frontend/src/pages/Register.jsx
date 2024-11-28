import React, { useState } from "react";
import { Box, Button, TextField, Typography, Select, MenuItem } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { CreateUser } from "../tools/api/person/api"; // Importa la función CreateUser

// Componets
import BoxPrimary from "../components/Share/BoxPrimary.jsx"

// Styles
import styles from "../css/jscss/root"

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
    <BoxPrimary title={"Registro"}>
    <Box sx={styles.containerRegister}>
      <TextField label="Nombre" value={newUser.name} onChange={(e) => handleFieldChange("name", e.target.value)} fullWidth margin="normal" />
      <TextField label="Teléfono" type="number" value={newUser.tel} onChange={(e) => handleFieldChange("tel", e.target.value)} fullWidth margin="normal" />
      <TextField label="Cédula" type="number" value={newUser.identification} onChange={(e) => handleFieldChange("identification", e.target.value)} fullWidth margin="normal" />
      <TextField label="Lugar de Expedición" type="text" value={newUser.fecha_expedicion} onChange={(e) => handleFieldChange("lugar_expedicion", e.target.value)} fullWidth margin="normal" InputLabelProps={{ shrink: true }} />
      <TextField label="Username" value={newUser.username} onChange={(e) => handleFieldChange("username", e.target.value)} fullWidth margin="normal" />
      <TextField label="Contraseña" type="password" value={newUser.password} onChange={(e) => handleFieldChange("password", e.target.value)} fullWidth margin="normal" />
      <Typography variant="subtitle1" sx={{ mt: 2 }}>Tipo de Persona</Typography>
      <Select sx={{ marginBottom: '40px'}} value={newUser.type_person} onChange={(e) => handleFieldChange("type_person", e.target.value)} fullWidth margin="normal">
        <MenuItem value={1}>Cliente</MenuItem>
        <MenuItem value={2}>Empleado</MenuItem>
      </Select>
      <Button sx={{ color: '#fff', background: '#320001'}} variant="contained" color="primary" fullWidth onClick={handleRegister}>Registrarse</Button>
    </Box>
    </BoxPrimary>
  );
};

export default Register;
