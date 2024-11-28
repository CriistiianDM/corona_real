import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, Grid2, TableContainer, TableHead, TableRow, Paper, IconButton, Typography, Box, Drawer, TextField, Button, Select, MenuItem } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { Fab } from "@mui/material";
import { createPerson, getPersons, updatePerson } from '../tools/api/person/api'; // Ajusta la ruta de importación
import AlertService from "./utils/AlertService"; // Importa el servicio de alertas
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import BoxPrimary from "../components/Share/BoxPrimary.jsx";
import styles from "../css/jscss/root";
import './estilos/Person.css';

const Person = () => {
  const [persons, setPersons] = useState([]);
  const [personsFilter, setPersonsFilter] = useState([]);
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
        AlertService.success("Persona actualizada con éxito", "Éxito", "top-start");
      }
      closeEditDrawer();
    } catch (error) {
      AlertService.error("Error al guardar cambios", "Error", "top-start");
      console.error("Error al guardar cambios:", error);
    }
  };

  const fetchPersons = async () => {
    try {
      const data = await getPersons();
      setPersons(data);
      setPersonsFilter(data);
    } catch (error) {
      AlertService.error("Error al obtener la lista de personas");
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
        fetchPersons();
        closeNewPersonDrawer();
        AlertService.success("Nueva persona creada con éxito", "Éxito", "top-start");
      }
    } catch (error) {
      AlertService.error("Error al agregar nueva persona", "Error", "top-start");
      console.error("Error al agregar nueva persona:", error);
    }
  };

  const deletePerson = async (id) => {
    try {
      // Buscar la persona seleccionada
      const personToUpdate = persons.find((person) => person.id === id);
      if (!personToUpdate) {
        AlertService.warning("No se pudo encontrar la persona", "Advertencia", "top-start");
        return;
      }
  
      // Cambiar is_active a false
      const updatedPerson = { ...personToUpdate, is_active: false };
  
      // Actualizar en el servidor
      const response = await updatePerson(id, updatedPerson);
  
      if (response?.id) {
        AlertService.success("Persona marcada como inactiva con éxito", "Éxito", "top-start");
  
        // Actualizar la lista de personas
        setPersons((prevPersons) =>
          prevPersons.map((person) =>
            person.id === response.id ? response : person
          )
        );
      } else {
        AlertService.error("Error al marcar la persona como inactiva", "Error", "top-start");
      }
    } catch (error) {
      console.error("Error al marcar la persona como inactiva:", error);
      AlertService.error("Error al marcar la persona como inactiva", "Error", "top-start");
    }
  };
  

  return (
    <BoxPrimary title={"Personas"}>
      <Box sx={styles.containerPerson}>
        <Grid2>
          <FreeSolo data={persons} dataComplete={personsFilter} setDataPerson={setPersons} />
        </Grid2>
        <Box className="contenedor">
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
  {persons.map((person) => (
    <TableRow
      key={person.id}
      style={{
        backgroundColor: person.is_active ? "#FFFFFF" : "rgb(195, 176, 165)", // Blanco si es activo, rojo si es inactivo
        color: person.is_active ? "#000000" : "#FFFFFF", // Texto negro si activo, blanco si inactivo
      }}
    >
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
          <Drawer
            anchor="right"
            open={isNewPersonDrawerOpen}
            onClose={closeNewPersonDrawer}
            sx={{
              '& .MuiPaper-root': {
                background: '#FFFEEE'
              }
            }}>
            <Box sx={{ width: 300, padding: 3 }}>
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
              <Typography variant="subtitle1">Tipo de Persona</Typography>
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
              <Typography variant="subtitle1">Empresa</Typography>
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
              <Typography variant="subtitle1">Estado</Typography>
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
                <Button sx={{ color: '#320001', background: '#dad0d0', border: '1px solid #320001' }} variant="outlined" onClick={closeNewPersonDrawer}>Cancelar</Button>
                <Button sx={{ color: '#fff', background: '#320001' }} variant="contained" color="primary" onClick={addNewPerson}>Agregar</Button>
              </Box>
            </Box>
          </Drawer>

          {/* Editar Persona */}
          <Drawer
            sx={{
              '& .MuiPaper-root': {
                background: '#FFFEEE'
              }
            }}
            anchor="right"
            open={isDrawerOpen}
            onClose={closeEditDrawer}>
            {selectedPerson && (
              <Box sx={{ width: 300, padding: 3 }}>
                <Typography variant="h5" gutterBottom>Editar {selectedPerson.name}</Typography>
                <TextField
                  label="Nombre"
                  value={selectedPerson.name}
                  onChange={(e) => handleFieldChange("name", e.target.value)}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Identificación"
                  type="number"
                  value={selectedPerson.identification}
                  onChange={(e) => handleFieldChange("identification", e.target.value)}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Lugar de Expedición"
                  value={selectedPerson.lugar_expedicion}
                  onChange={(e) => handleFieldChange("lugar_expedicion", e.target.value)}
                  fullWidth
                  margin="normal"
                />
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
                <Typography variant="subtitle1" style={{ marginTop: 20 }}>
                  Estado
                </Typography>
                <Select
                  value={selectedPerson.is_active ? "Activo" : "Inactivo"}
                  onChange={(e) => handleFieldChange("is_active", e.target.value === "Activo")}
                  fullWidth
                  margin="normal"
                >
                  <MenuItem value="Activo">Activo</MenuItem>
                  <MenuItem value="Inactivo">Inactivo</MenuItem>
                </Select>
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
                <Box display="flex" justifyContent="space-between" mt={2}>
                  <Button sx={{ color: '#320001', background: '#dad0d0', border: '1px solid #320001' }} variant="outlined" onClick={closeEditDrawer}>Cancelar</Button>
                  <Button sx={{ color: '#fff', background: '#320001' }} variant="contained" color="primary" onClick={saveChanges}>Guardar</Button>
                </Box>
              </Box>
            )}
          </Drawer>

          <Fab color="primary" aria-label="add" onClick={openNewPersonDrawer} className="boton-flotante">
            <AddIcon />
          </Fab>
        </Box>
      </Box>
    </BoxPrimary>
  );
};

const FreeSolo = ({ data, dataComplete, setDataPerson }) => {
  const onHandlerChange = (e, value) => {
    if (data?.length <= 0) return;
    if (value === null) {
      setDataPerson(dataComplete);
    } else {
      const filter = data.filter(item => item.name === value);
      setDataPerson(filter ?? data);
    }
  };

  if (data?.length <= 0) return null;

  return (
    <Stack sx={styles.containerSearch} spacing={2}>
      <Autocomplete
        freeSolo
        onChange={onHandlerChange}
        options={data.map((option) => option.name)}
        renderInput={(params) => <TextField {...params} label="Buscar Personas" />}
      />
    </Stack>
  );
};

export default Person;
