import React, { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography, Box, Drawer, TextField, Button, Select, MenuItem } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { Fab } from "@mui/material";

import './estilos/Person.css';

const initialPersons = [
  { id: 1, person_auth: null, type_person: 1, company_id: null, name: "Juan Pérez", tel: 123456789, identification: 1010101010, fecha_expedicion: "2024-07-25", metodo_pago: "Tarjeta", acompañantes: ["Luis"] },
  { id: 2, person_auth: null, type_person: 2, company_id: null, name: "María Gómez", tel: 987654321, identification: 2020202020, fecha_expedicion: "2021-05-20", metodo_pago: "Efectivo", acompañantes: ["Carlos", "Ana"] },
  { id: 3, person_auth: null, type_person: 3, company_id: null, name: "Carlos Ramírez", tel: 555555555, identification: 3030303030, fecha_expedicion: "2023-03-15", metodo_pago: "Transferencia", acompañantes: [] },
];

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
  const [newPerson, setNewPerson] = useState({
    name: "",
    tel: "",
    identification: "",
    fecha_expedicion: "",
    type_person: 1,
    metodo_pago: "",
    acompañantes: [],
  });

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
      tel: "",
      identification: "",
      fecha_expedicion: "",
      type_person: 1,
      metodo_pago: "",
      acompañantes: [],
    });
  };

  const closeNewPersonDrawer = () => {
    setIsNewPersonDrawerOpen(false);
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
    <Box className="contenedor">
      <Typography variant="h4" className="title">
        Personas
      </Typography>
      <TableContainer component={Paper} className="tabla">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Identificación</TableCell>
              <TableCell>Fecha de Expedición</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Método de Pago</TableCell>
              <TableCell>Acompañantes</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {persons.map((person) => (
              <TableRow key={person.id}>
                <TableCell>{person.name}</TableCell>
                <TableCell>{person.tel}</TableCell>
                <TableCell>{person.identification}</TableCell>
                <TableCell>{person.fecha_expedicion}</TableCell>
                <TableCell>{typePersonNames[person.type_person]}</TableCell>
                <TableCell>{person.metodo_pago}</TableCell>
                <TableCell>{person.acompañantes.join(", ")}</TableCell>
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
            {/* Método de Pago */}
            <TextField
              label="Método de Pago"
              value={selectedPerson.metodo_pago || ""}
              onChange={(e) => handleFieldChange("metodo_pago", e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Cantidad de Acompañantes"
              type="number"
              value={selectedPerson.acompañantes.length || 0}
              onChange={(e) => handleFieldChange("acompañantes", Array(Number(e.target.value)).fill(""))}
              fullWidth
              margin="normal"
            />
            {selectedPerson.acompañantes.map((acompanante, index) => (
              <TextField
                key={index}
                label={`Acompañante ${index + 1}`}
                value={acompanante}
                onChange={(e) => handleAcompananteChange(index, e.target.value)}
                fullWidth
                margin="normal"
              />
            ))}

            <Box display="flex" justifyContent="space-between" mt={2}>
              <Button variant="outlined" onClick={closeEditDrawer}>Cancelar</Button>
              <Button variant="contained" color="primary" onClick={saveChanges}>Guardar</Button>
            </Box>
          </Box>
        )}
      </Drawer>
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
          <TextField
            label="Método de Pago"
            value={newPerson.metodo_pago}
            onChange={(e) => handleNewPersonFieldChange("metodo_pago", e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Cantidad de Acompañantes"
            type="number"
            value={newPerson.acompañantes.length || 0}
            onChange={(e) => handleNewPersonFieldChange("acompañantes", Array(Number(e.target.value)).fill(""))}
            fullWidth
            margin="normal"
          />
          {newPerson.acompañantes.map((acompanante, index) => (
            <TextField
              key={index}
              label={`Acompañante ${index + 1}`}
              value={acompanante}
              onChange={(e) => handleNewAcompananteChange(index, e.target.value)}
              fullWidth
              margin="normal"
            />
          ))}
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button variant="outlined" onClick={closeNewPersonDrawer}>Cancelar</Button>
            <Button variant="contained" color="primary" onClick={addNewPerson}>Agregar</Button>
          </Box>
        </Box>
      </Drawer>

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
          <TextField
            label="Método de Pago"
            value={newPerson.metodo_pago}
            onChange={(e) => handleNewPersonFieldChange("metodo_pago", e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Cantidad de Acompañantes"
            type="number"
            value={newPerson.acompañantes.length || 0}
            onChange={(e) => handleNewPersonFieldChange("acompañantes", Array(Number(e.target.value)).fill(""))}
            fullWidth
            margin="normal"
          />
          {newPerson.acompañantes.map((acompanante, index) => (
            <TextField
              key={index}
              label={`Acompañante ${index + 1}`}
              value={acompanante}
              onChange={(e) => handleNewAcompananteChange(index, e.target.value)}
              fullWidth
              margin="normal"
            />
          ))}
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button variant="outlined" onClick={closeNewPersonDrawer}>Cancelar</Button>
            <Button variant="contained" color="primary" onClick={addNewPerson}>Agregar</Button>
          </Box>
        </Box>
      </Drawer>
      <Fab 
        color="primary" 
        aria-label="add" 
        onClick={openNewPersonDrawer} 
        className="boton-flotante"
      >
        <AddIcon />
      </Fab>

    </Box>
  );
};

export default Person;
