import React, { useState } from "react";
import { Grid, Card, CardContent, Typography, Button, Drawer, Select, MenuItem, TextField, Box, Fab, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home'; 

// Datos iniciales de personas
const initialPersons = [
  { id: 1, person_auth: null, type_person: 1, company_id: null, name: "Juan Pérez", tel: 123456789, identification: 1010101010, fecha_expedicion: "2024-07-25T00:00:00" },
  { id: 2, person_auth: null, type_person: 2, company_id: null, name: "María Gómez", tel: 987654321, identification: 2020202020, fecha_expedicion: "2021-05-20T00:00:00" },
  { id: 3, person_auth: null, type_person: 3, company_id: null, name: "Carlos Ramírez", tel: 555555555, identification: 3030303030, fecha_expedicion: "2023-03-15T00:00:00" },
  // Agrega más personas aquí si es necesario
];

// Tipos de personas
const typePersonNames = {
  1: "Cliente",
  2: "Proveedor",
  3: "Empleado",
};

const Person = () => {
  const [persons, setPersons] = useState(initialPersons);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isNewPersonDrawerOpen, setIsNewPersonDrawerOpen] = useState(false);
  const [newPerson, setNewPerson] = useState({ name: "", tel: "", identification: "", fecha_expedicion: "", type_person: 1 });

  const openEditDrawer = (person) => {
    setSelectedPerson(person);
    setIsDrawerOpen(true);
  };

  const closeEditDrawer = () => {
    setSelectedPerson(null);
    setIsDrawerOpen(false);
  };

  const openNewPersonDrawer = () => {
    setIsNewPersonDrawerOpen(true);
    setNewPerson({ name: "", tel: "", identification: "", fecha_expedicion: "", type_person: 1 });
  };

  const closeNewPersonDrawer = () => {
    setIsNewPersonDrawerOpen(false);
  };

  const handleFieldChange = (field, value) => {
    setSelectedPerson({ ...selectedPerson, [field]: value });
  };

  const handleNewPersonFieldChange = (field, value) => {
    setNewPerson({ ...newPerson, [field]: value });
  };

  const saveChanges = () => {
    const updatedPersons = persons.map(person =>
      person.id === selectedPerson.id ? selectedPerson : person
    );
    setPersons(updatedPersons);
    closeEditDrawer();
  };

  const addNewPerson = () => {
    const newPersonData = { ...newPerson, id: persons.length + 1 };
    setPersons([...persons, newPersonData]);
    closeNewPersonDrawer();
  };

  const deletePerson = (id) => {
    setPersons(persons.filter(person => person.id !== id));
  };

  return (
    <div style={{ display: "flex" }}>
      <Grid container spacing={3} style={{ flex: 1 }}>
        {persons.map((person) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={person.id}>
            <Card sx={{ display: "flex", flexDirection: "column", alignItems: "center", padding: 2, textAlign: "center", height: "100%", maxWidth: 250 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>{person.name}</Typography>
              <Box className="image-container" sx={{ width: "100%", maxHeight: 200, display: "flex", justifyContent: "center", marginTop: 1 }}>
                <img
                  src={`/public/usuario${person.type_person}.png`}
                  alt={person.name}
                  style={{ width: "100%", height: "100%", objectFit: "contain", maxHeight: 150 }}
                />
              </Box>
              <CardContent sx={{ width: "100%", padding: 1 }}>
                <Typography variant="body2" color="textSecondary">Cédula: {person.identification}</Typography>
                <Typography variant="body2" color="textSecondary">Tipo: {typePersonNames[person.type_person]}</Typography>
                <Typography variant="body2" color="textSecondary">Fecha de expedición: {new Date(person.fecha_expedicion).toLocaleDateString()}</Typography>
              </CardContent>
              <Box display="flex" justifyContent="space-around" width="100%" sx={{ padding: 1 }}>
                <IconButton color="primary" onClick={() => openEditDrawer(person)}>
                  <EditIcon />
                </IconButton>
                <IconButton color="secondary" onClick={() => deletePerson(person.id)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Drawer para editar persona */}
      <Drawer anchor="right" open={isDrawerOpen} onClose={closeEditDrawer}>
        {selectedPerson && (
          <Box sx={{ width: 300, padding: 3, marginTop: 10 }}>
            <Typography variant="h5" gutterBottom>Editar {selectedPerson.name}</Typography>
            <TextField
              label="Nombre"
              value={selectedPerson.name}
              onChange={(e) => handleFieldChange("name", e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Teléfono"
              type="number"
              value={selectedPerson.tel}
              onChange={(e) => handleFieldChange("tel", e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Cédula"
              type="number"
              value={selectedPerson.identification}
              onChange={(e) => handleFieldChange("identification", e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Fecha de expedición"
              type="date"
              value={selectedPerson.fecha_expedicion.slice(0, 10)}
              onChange={(e) => handleFieldChange("fecha_expedicion", e.target.value)}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Typography variant="subtitle1" style={{ marginTop: 20 }}>Tipo de Persona</Typography>
            <Select
              label="Tipo de Persona"
              value={selectedPerson.type_person}
              onChange={(e) => handleFieldChange("type_person", e.target.value)}
              fullWidth
              margin="normal"
            >
              <MenuItem value={1}>Recepcionista</MenuItem>
              <MenuItem value={2}>Administrador</MenuItem>
              <MenuItem value={3}>Acompañante</MenuItem>
              <MenuItem value={4}>Huésped</MenuItem>
            </Select>
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Button variant="outlined" onClick={closeEditDrawer}>Cancelar</Button>
              <Button variant="contained" color="primary" onClick={saveChanges}>Guardar</Button>
            </Box>
          </Box>
        )}
      </Drawer>

      {/* Drawer para agregar nueva persona */}
      <Drawer anchor="right" open={isNewPersonDrawerOpen} onClose={closeNewPersonDrawer}>
        <Box sx={{ width: 300, padding: 3, marginTop: 10 }}>
          <Typography variant="h5" gutterBottom>Agregar Nueva Persona</Typography>
          <TextField
            label="Nombre"
            value={newPerson.name}
            onChange={(e) => handleNewPersonFieldChange("name", e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Teléfono"
            type="number"
            value={newPerson.tel}
            onChange={(e) => handleNewPersonFieldChange("tel", e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Cédula"
            type="number"
            value={newPerson.identification}
            onChange={(e) => handleNewPersonFieldChange("identification", e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Fecha de expedición"
            type="date"
            value={newPerson.fecha_expedicion}
            onChange={(e) => handleNewPersonFieldChange("fecha_expedicion", e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Typography variant="subtitle1" style={{ marginTop: 20 }}>Tipo de Persona</Typography>
          <Select
            label="Tipo de Persona"
            value={newPerson.type_person}
            onChange={(e) => handleNewPersonFieldChange("type_person", e.target.value)}
            fullWidth
            margin="normal"
          >
            <MenuItem value={1}>Cliente</MenuItem>
            <MenuItem value={2}>Proveedor</MenuItem>
            <MenuItem value={3}>Empleado</MenuItem>
          </Select>
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button variant="outlined" onClick={closeNewPersonDrawer}>Cancelar</Button>
            <Button variant="contained" color="primary" onClick={addNewPerson}>Agregar</Button>
          </Box>
        </Box>
      </Drawer>

      {/* Botón flotante para agregar nueva persona */}
      <Fab color="primary" aria-label="add" onClick={openNewPersonDrawer} style={{ position: "fixed", bottom: 16, right: 16 }}>
        <AddIcon />
      </Fab>
    </div>
  );
};

export default Person;
