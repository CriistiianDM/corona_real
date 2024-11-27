import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography, Box, Drawer, TextField, Button, Select, MenuItem } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { Fab } from "@mui/material";
import { createPerson, getPersons , updatePerson} from '../tools/api/person/api'; // Ajusta la ruta de importación

import './estilos/Person.css';

// Componets
import BoxPrimary from "../components/Share/BoxPrimary.jsx"

const Person = () => {
  const [persons, setPersons] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isNewPersonDrawerOpen, setIsNewPersonDrawerOpen] = useState(false);
  const [newPerson, setNewPerson] = useState({
    name: "",
    identification: "",
    lugar_expedicion: "",
    type_person: 1,
    company: null,
    is_active: true,
  });

  useEffect(() => {
    fetchPersons();
  }, []);

  const saveChanges = async () => {
    try {
      const response = await updatePerson(selectedPerson.id, selectedPerson);
      if (response && response.id) {
        setPersons((prevPersons) =>
          prevPersons.map((person) =>
            person.id === response.id ? response : person
          )
        );
      }
      closeEditDrawer();
    } catch (error) {
      console.error("Error al guardar cambios:", error);
    }
  };

  const fetchPersons = async () => {
    try {
      const data = await getPersons();
      setPersons(data);
    } catch (error) {
      console.error("Error al obtener personas:", error);
    }
  };

  const handleNewPersonFieldChange = (field, value) => {
    setNewPerson((prev) => ({ ...prev, [field]: value }));
  };

  const handleFieldChange = (field, value) => {
    setSelectedPerson((prev) => ({ ...prev, [field]: value }));
  };

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
    setNewPerson({
      name: "",
      identification: "",
      lugar_expedicion: "",
      type_person: 1,
      company: null,
      is_active: true,
    });
  };

  const closeNewPersonDrawer = () => {
    setIsNewPersonDrawerOpen(false);
  };

  const addNewPerson = async () => {
    try {
      const response = await createPerson(newPerson);
      if (response && response.id) {
        fetchPersons(); // Refresca la lista de personas
        closeNewPersonDrawer();
      }
    } catch (error) {
      console.error("Error al agregar nueva persona:", error);
    }
  };

  const deletePerson = (id) => {
    setPersons(persons.filter(person => person.id !== id));
  };

  return (
    <BoxPrimary>
    <Box className="contenedor">
      <Typography variant="h4" className="title">Personas</Typography>
      <TableContainer component={Paper} className="tabla">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Identificación</TableCell>
              <TableCell>Lugar de Expedición</TableCell>
              <TableCell>Tipo de Persona</TableCell>
              <TableCell>Empresa</TableCell>
              <TableCell>Activo</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {persons?.length>0 && persons.map((person) => (
              <TableRow key={person.id}>
                <TableCell>{person.name}</TableCell>
                <TableCell>{person.identification}</TableCell>
                <TableCell>{person.lugar_expedicion}</TableCell>
                <TableCell>{person.type_person}</TableCell>
                <TableCell>{person.company || "N/A"}</TableCell>
                <TableCell>{person.is_active ? "Sí" : "No"}</TableCell>
                <TableCell>
                  <IconButton onClick={() => openEditDrawer(person)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => deletePerson(person.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Crear Persona */}
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
            label="Identificación"
            type="number"
            value={newPerson.identification}
            onChange={(e) => handleNewPersonFieldChange("identification", e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Lugar de Expedición"
            value={newPerson.lugar_expedicion}
            onChange={(e) => handleNewPersonFieldChange("lugar_expedicion", e.target.value)}
            fullWidth
            margin="normal"
          />
          <Typography variant="subtitle1" style={{ marginTop: 20 }}>Tipo de Persona</Typography>
          <Select
            value={newPerson.type_person}
            onChange={(e) => handleNewPersonFieldChange("type_person", e.target.value)}
            fullWidth
            margin="normal"
          >
            <MenuItem value={1}>Cliente</MenuItem>
            <MenuItem value={2}>Proveedor</MenuItem>
            <MenuItem value={3}>Empleado</MenuItem>
          </Select>
          <Typography variant="subtitle1" style={{ marginTop: 20 }}>Empresa</Typography>
          <Select
            value={newPerson.company}
            onChange={(e) => handleNewPersonFieldChange("company", e.target.value)}
            fullWidth
            margin="normal"
          >
            <MenuItem value={null}>N/A</MenuItem>
            <MenuItem value={1}>Empresa A</MenuItem>
            <MenuItem value={2}>Empresa B</MenuItem>
          </Select>
          <Typography variant="subtitle1" style={{ marginTop: 20 }}>Estado</Typography>
          <Select
            value={newPerson.is_active ? "Activo" : "Inactivo"}
            onChange={(e) => handleNewPersonFieldChange("is_active", e.target.value === "Activo")}
            fullWidth
            margin="normal"
          >
            <MenuItem value="Activo">Activo</MenuItem>
            <MenuItem value="Inactivo">Inactivo</MenuItem>
          </Select>
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button variant="outlined" onClick={closeNewPersonDrawer}>Cancelar</Button>
            <Button variant="contained" color="primary" onClick={addNewPerson}>Agregar</Button>
          </Box>
        </Box>
      </Drawer>

      <Drawer anchor="right" open={isDrawerOpen} onClose={closeEditDrawer}>
        {selectedPerson && (
          <Box sx={{ width: 300, padding: 3, marginTop: 10 }}>
            <Typography variant="h5" gutterBottom>Editar {selectedPerson.name}</Typography>
            
            {/* Nombre */}
            <TextField
              label="Nombre"
              value={selectedPerson.name}
              onChange={(e) => handleFieldChange("name", e.target.value)}
              fullWidth
              margin="normal"
            />
            
            {/* Identificación */}
            <TextField
              label="Identificación"
              type="number"
              value={selectedPerson.identification}
              onChange={(e) => handleFieldChange("identification", e.target.value)}
              fullWidth
              margin="normal"
            />
            
            {/* Lugar de Expedición */}
            <TextField
              label="Lugar de Expedición"
              value={selectedPerson.lugar_expedicion}
              onChange={(e) => handleFieldChange("lugar_expedicion", e.target.value)}
              fullWidth
              margin="normal"
            />

            {/* Tipo de Persona */}
            <Typography variant="subtitle1" style={{ marginTop: 20 }}>Tipo de Persona</Typography>
            <Select
              label="Tipo de Persona"
              value={selectedPerson.type_person}
              onChange={(e) => handleFieldChange("type_person", e.target.value)}
              fullWidth
              margin="normal"
            >
              <MenuItem value={1}>Cliente</MenuItem>
              <MenuItem value={2}>Proveedor</MenuItem>
              <MenuItem value={3}>Empleado</MenuItem>
            </Select>

            {/* Empresa */}
            <Typography variant="subtitle1" style={{ marginTop: 20 }}>Empresa</Typography>
            <Select
              label="Empresa"
              value={selectedPerson.company}
              onChange={(e) => handleFieldChange("company", e.target.value)}
              fullWidth
              margin="normal"
            >
              <MenuItem value={null}>N/A</MenuItem>
              <MenuItem value={1}>Empresa A</MenuItem>
              <MenuItem value={2}>Empresa B</MenuItem>
            </Select>

            {/* Botones de Acción */}
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Button variant="outlined" onClick={closeEditDrawer}>Cancelar</Button>
              <Button variant="contained" color="primary" onClick={saveChanges}>Guardar</Button>
            </Box>
          </Box>
        )}
      </Drawer>


      <Fab color="primary" aria-label="add" onClick={openNewPersonDrawer} className="boton-flotante">
        <AddIcon />
      </Fab>
    </Box>
    </BoxPrimary>
  );
};

export default Person;
