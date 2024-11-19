import React, { useState } from "react";
import { Grid, Card, CardContent, Typography, Button, Drawer, TextField, Box, Fab, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

const initialCompanies = [
  { id: 1, name: "Servimos S.A.S", nit: 1122, date: "2024-07-25T00:00:00" },
  { id: 2, name: "Todo Limpio Ltda", nit: 2233, date: "2021-05-20T00:00:00" },
  { id: 3, name: "Arturo S.A", nit: 4455, date: "2023-03-15T00:00:00" },
];

const Company = () => {
  const [companies, setCompanies] = useState(initialCompanies);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isNewCompanyDrawerOpen, setIsNewCompanyDrawerOpen] = useState(false);
  const [newCompany, setNewCompany] = useState({
    name: "",
    nit: "",
    date: "",
  });

  const openEditDrawer = (company) => {
    setSelectedCompany(company);
    setIsDrawerOpen(true);
  };

  const closeEditDrawer = () => {
    setSelectedCompany(null);
    setIsDrawerOpen(false);
  };

  const openNewCompanyDrawer = () => {
    setIsNewCompanyDrawerOpen(true);
    setNewCompany({ name: "", nit: "", date: "" });
  };

  const closeNewCompanyDrawer = () => {
    setIsNewCompanyDrawerOpen(false);
  };

  const handleFieldChange = (field, value) => {
    setSelectedCompany({ ...selectedCompany, [field]: value });
  };

  const handleNewCompanyFieldChange = (field, value) => {
    setNewCompany({ ...newCompany, [field]: value });
  };

  const saveChanges = () => {
    const updatedCompanies = companies.map((company) =>
      company.id === selectedCompany.id ? selectedCompany : company
    );
    setCompanies(updatedCompanies);
    closeEditDrawer();
  };

  const addNewCompany = () => {
    const newCompanyData = { ...newCompany, id: companies.length + 1 };
    setCompanies([...companies, newCompanyData]);
    closeNewCompanyDrawer();
  };

  const deleteCompany = (id) => {
    setCompanies(companies.filter((company) => company.id !== id));
  };

  return (
    <div style={{ display: "flex" }}>
      <Grid container spacing={3} style={{ flex: 1 }}>
        {companies.map((company) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={company.id}>
            <Card sx={{ padding: 2, textAlign: "center", height: "100%" }}>
              <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>{company.name}</Typography>
              <CardContent>
                <Typography variant="body2" color="textSecondary">NIT: {company.nit}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Fecha de creación: {new Date(company.date).toLocaleDateString()}
                </Typography>
                <Box className="image-container" sx={{ width: "100%", maxHeight: 200, display: "flex", justifyContent: "center", marginTop: 1 }}>
                <img
                  src={`/public/company4.png`}
                  alt={company.name}
                  style={{ width: "100%", height: "100%", objectFit: "contain", maxHeight: 150 }}
                />
              </Box>
              </CardContent>
              <Box display="flex" justifyContent="space-around" width="100%" sx={{ padding: 1 }}>
                <IconButton color="primary" onClick={() => openEditDrawer(company)}>
                  <EditIcon />
                </IconButton>
                <IconButton color="secondary" onClick={() => deleteCompany(company.id)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Drawer para editar */}
      <Drawer anchor="right" open={isDrawerOpen} onClose={closeEditDrawer}>
        {selectedCompany && (
          <Box sx={{ width: 300, padding: 3, marginTop: 10 }}>
            <Typography variant="h5" gutterBottom>Editar {selectedCompany.name}</Typography>
            <TextField
              label="Nombre"
              value={selectedCompany.name}
              onChange={(e) => handleFieldChange("name", e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="NIT"
              type="number"
              value={selectedCompany.nit}
              onChange={(e) => handleFieldChange("nit", e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Fecha de creación"
              type="date"
              value={selectedCompany.date.slice(0, 10)}
              onChange={(e) => handleFieldChange("date", e.target.value)}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Button variant="outlined" onClick={closeEditDrawer}>Cancelar</Button>
              <Button variant="contained" color="primary" onClick={saveChanges}>Guardar</Button>
            </Box>
          </Box>
        )}
      </Drawer>

      {/* Drawer para agregar nueva empresa */}
      <Drawer anchor="right" open={isNewCompanyDrawerOpen} onClose={closeNewCompanyDrawer}>
        <Box sx={{ width: 300, padding: 3, marginTop: 10 }}>
          <Typography variant="h5" gutterBottom>Agregar Nueva Empresa</Typography>
          <TextField
            label="Nombre"
            value={newCompany.name}
            onChange={(e) => handleNewCompanyFieldChange("name", e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="NIT"
            type="number"
            value={newCompany.nit}
            onChange={(e) => handleNewCompanyFieldChange("nit", e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Fecha de creación"
            type="date"
            value={newCompany.date}
            onChange={(e) => handleNewCompanyFieldChange("date", e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button variant="outlined" onClick={closeNewCompanyDrawer}>Cancelar</Button>
            <Button variant="contained" color="primary" onClick={addNewCompany}>Agregar</Button>
          </Box>
        </Box>
      </Drawer>

      {/* Botón flotante para agregar empresa */}
      <Fab color="primary" aria-label="add" onClick={openNewCompanyDrawer} style={{ position: "fixed", bottom: 16, right: 16 }}>
        <AddIcon />
      </Fab>
    </div>
  );
};

export default Company;
