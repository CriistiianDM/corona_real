import React, { useState } from "react";
import { 
  Grid, Card, CardContent, Typography, Button, Drawer, Select, MenuItem, 
  TextField, Box, Fab, IconButton 
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

const initialCashRegisters = [
  { 
    id: 1, 
    typeCashRegister: 1, 
    cash_balance: 1500.50, 
    note: "Caja principal del lobby", 
  },
  { 
    id: 2, 
    typeCashRegister: 2, 
    cash_balance: 500.00, 
    note: "Caja secundaria para eventos", 
  },
  { 
    id: 3, 
    typeCashRegister: 3, 
    cash_balance: 0.00, 
    note: "Caja de mantenimiento, fuera de servicio", 
  }
];

const typeCashRegister = {
  1: "Caja Facturados",
  2: "Caja Secundaria",
  3: "Cajas Productos",
};

const CashRegister = () => {
  const [cashRegisters, setCashRegisters] = useState(initialCashRegisters);
  const [selectedCashRegister, setSelectedCashRegister] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isNewDrawerOpen, setIsNewDrawerOpen] = useState(false);
  const [newCashRegister, setNewCashRegister] = useState({
    typeCashRegister: 1,
    cash_balance: "",
    note: "",
  });

  const openEditDrawer = (cashRegister) => {
    setSelectedCashRegister(cashRegister);
    setIsDrawerOpen(true);
  };

  const closeEditDrawer = () => {
    setSelectedCashRegister(null);
    setIsDrawerOpen(false);
  };

  const openNewDrawer = () => {
    setIsNewDrawerOpen(true);
    setNewCashRegister({
      typeCashRegister: 1,
      cash_balance: "",
      note: "",
    });
  };

  const closeNewDrawer = () => {
    setIsNewDrawerOpen(false);
  };

  const handleFieldChange = (field, value) => {
    setSelectedCashRegister({ ...selectedCashRegister, [field]: value });
  };

  const handleNewFieldChange = (field, value) => {
    setNewCashRegister({ ...newCashRegister, [field]: value });
  };

  const saveChanges = () => {
    setCashRegisters((prev) => 
      prev.map((c) => (c.id === selectedCashRegister.id ? selectedCashRegister : c))
    );
    closeEditDrawer();
  };

  const addNewCashRegister = () => {
    setCashRegisters((prev) => [...prev, { ...newCashRegister, id: prev.length + 1 }]);
    closeNewDrawer();
  };

  const deleteCashRegister = (id) => {
    setCashRegisters((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div style={{ display: "flex" }}>
      <Grid container spacing={3} style={{ flex: 1 }}>
        {cashRegisters.map((cashRegister) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={cashRegister.id}>
            <Card sx={{ padding: 2, textAlign: "center", height: "100%" }}>
              <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                {typeCashRegister[cashRegister.typeCashRegister]}
              </Typography>
              <CardContent>
                <Box 
                  className="image-container" 
                  sx={{ width: "100%", maxHeight: 200, display: "flex", justifyContent: "center", marginTop: 1 }}
                >
                  <img
                    src={`/cash_register.png`}
                    alt={cashRegister.note}
                    style={{ width: "100%", height: "100%", objectFit: "contain", maxHeight: 150 }}
                  />
                </Box>
              </CardContent>
              <Box display="flex" justifyContent="space-around" width="100%" sx={{ padding: 1 }}>
                <IconButton color="primary" onClick={() => handleOpenDrawer(cashRegister)}>
                  <EditIcon />
                </IconButton>
                <IconButton color="secondary" onClick={() => deleteCashRegister(cashRegister.id)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>


      {/* Drawer for Editing */}
      <Drawer anchor="right" open={isDrawerOpen} onClose={closeEditDrawer}>
        {selectedCashRegister && (
          <Box sx={{ width: 300, padding: 3, marginTop: 10 }}>
            <Typography variant="h5" gutterBottom>
              Editar Caja
            </Typography>
            <Box 
              className="image-container" 
              sx={{ width: "100%", maxHeight: 200, display: "flex", justifyContent: "center", marginBottom: 2 }}
            >
              <img
                src={`/cash_register.png`}
                alt={selectedCashRegister.note}
                style={{ width: "100%", height: "100%", objectFit: "contain", maxHeight: 150 }}
              />
            </Box>
            <Select
              label="Tipo de Caja"
              value={selectedCashRegister.typeCashRegister}
              onChange={(e) => handleFieldChange("typeCashRegister", e.target.value)}
              fullWidth
              margin="normal"
            >
              {Object.entries(typeCashRegister).map(([key, value]) => (
                <MenuItem key={key} value={parseInt(key)}>
                  {value}
                </MenuItem>
              ))}
            </Select>
            <TextField
              label="Saldo"
              type="number"
              value={selectedCashRegister.cash_balance}
              onChange={(e) => handleFieldChange("cash_balance", e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Nota"
              value={selectedCashRegister.note}
              onChange={(e) => handleFieldChange("note", e.target.value)}
              fullWidth
              margin="normal"
            />
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Button variant="outlined" onClick={closeEditDrawer}>
                Cancelar
              </Button>
              <Button variant="contained" color="primary" onClick={saveChanges}>
                Guardar
              </Button>
            </Box>
          </Box>
        )}
      </Drawer>

      {/* Drawer for Adding New */}
      <Drawer anchor="right" open={isNewDrawerOpen} onClose={closeNewDrawer}>
        <Box sx={{ width: 300, padding: 3, marginTop: 10 }}>
          <Typography variant="h5" gutterBottom>
            Nueva Caja
          </Typography>
          <Box 
            className="image-container" 
            sx={{ width: "100%", maxHeight: 200, display: "flex", justifyContent: "center", marginBottom: 2 }}
          >
            <img
              src={`/cash_register.png`}
              alt="Nueva Caja"
              style={{ width: "100%", height: "100%", objectFit: "contain", maxHeight: 150 }}
            />
          </Box>
          <Select
            label="Tipo de Caja"
            value={newCashRegister.typeCashRegister}
            onChange={(e) => handleNewFieldChange("typeCashRegister", e.target.value)}
            fullWidth
            margin="normal"
          >
            {Object.entries(typeCashRegister).map(([key, value]) => (
              <MenuItem key={key} value={parseInt(key)}>
                {value}
              </MenuItem>
            ))}
          </Select>
          <TextField
            label="Saldo"
            type="number"
            value={newCashRegister.cash_balance}
            onChange={(e) => handleNewFieldChange("cash_balance", e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Nota"
            value={newCashRegister.note}
            onChange={(e) => handleNewFieldChange("note", e.target.value)}
            fullWidth
            margin="normal"
          />
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button variant="outlined" onClick={closeNewDrawer}>
              Cancelar
            </Button>
            <Button variant="contained" color="primary" onClick={addNewCashRegister}>
              Agregar
            </Button>
          </Box>
        </Box>
      </Drawer>

      <Fab
        color="primary"
        aria-label="add"
        onClick={openNewDrawer}
        style={{ position: "fixed", bottom: 16, right: 16 }}
      >
        <AddIcon />
      </Fab>
    </div>
  );
};

export default CashRegister;
