import React, { useState } from "react";
import { Grid, Card, CardContent, Typography, Button, Drawer, Select, MenuItem, TextField, Box, Fab } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

const initialRooms = [
  { id: 1, number_room: 101, type_room: "Sencilla", name: "Royal", status: "Libre", isActive: true, cliente: "", valor: "" },
  { id: 2, number_room: 203, type_room: "Doble", name: "Supreme", status: "Ocupada", isActive: true, cliente: "Juan Pérez", valor: 100 },
  { id: 3, number_room: 104, type_room: "Sencilla", name: "General", status: "Libre", isActive: true, cliente: "", valor: "" },
  { id: 4, number_room: 403, type_room: "Doble", name: "General", status: "Ocupada", isActive: true, cliente: "María López", valor: 150 },
  { id: 5, number_room: 204, type_room: "Doble", name: "Deluxe", status: "Mantenimiento", isActive: true, cliente: "", valor: "" },
];

const clients = ["Juan Pérez", "María López", "Carlos Gómez", "Ana Ramírez"];

const Room = () => {
  const [rooms, setRooms] = useState(initialRooms);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);
  const [newRoom, setNewRoom] = useState({ number_room: '', type_room: 'Sencilla', name: '', status: 'Libre', cliente: '', valor: '' });

  const openEditDrawer = (room) => {
    setSelectedRoom(room);
    setIsDrawerOpen(true);
  };

  const closeEditDrawer = () => {
    setSelectedRoom(null);
    setIsDrawerOpen(false);
  };

  const handleFieldChange = (field, value) => {
    setSelectedRoom({ ...selectedRoom, [field]: value });
  };

  const saveChanges = () => {
    const updatedRooms = rooms.map(room =>
      room.id === selectedRoom.id ? selectedRoom : room
    );
    setRooms(updatedRooms);
    closeEditDrawer();
  };

  const handleDeleteRoom = () => {
    const updatedRooms = rooms.filter(room => room.id !== selectedRoom.id);
    setRooms(updatedRooms);
    closeEditDrawer();
  };

  const openAddDrawer = () => {
    setIsAddDrawerOpen(true);
  };

  const closeAddDrawer = () => {
    setNewRoom({ number_room: '', type_room: 'Sencilla', name: '', status: 'Libre', cliente: '', valor: '' });
    setIsAddDrawerOpen(false);
  };

  const handleNewRoomFieldChange = (field, value) => {
    setNewRoom({ ...newRoom, [field]: value });
  };

  const addNewRoom = () => {
    const newRoomWithId = { ...newRoom, id: rooms.length + 1, isActive: true };
    setRooms([...rooms, newRoomWithId]);
    closeAddDrawer();
  };

  return (
    <div style={{ display: "flex" }}>
      <Grid container spacing={3} style={{ flex: 1, transition: "all 0.3s", transform: isDrawerOpen ? "scale(0.9)" : "scale(1)" }}>
        {rooms.map((room) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={room.id}>
            <Card
              className="thumb-cards_room"
              style={{
                display: "flex",
                alignItems: "center",
                borderColor: room.status === "Ocupada" ? "red" : room.status === "Mantenimiento" ? "blue" : "green",
                borderWidth: 2,
                borderStyle: "solid",
                padding: "10px",
              }}
            >
              <div style={{ flexShrink: 0, marginRight: 10 }}>
                <img
                  src="/Room2.png"
                  alt={`Habitación ${room.number_room}`}
                  style={{ width: 60, height: 60, objectFit: "cover", borderRadius: "8px" }}
                />
              </div>
              <CardContent style={{ flex: 1, padding: 0 }}>
              <Typography variant="h6" style={{ fontSize: "1rem" }}>{room.number_room}</Typography>
                <Typography variant="h6" style={{ fontSize: "1rem" }}>{room.name}</Typography>
                <Typography variant="body2">Tipo: {room.type_room}</Typography>
                <Typography variant="body2">Estado: {room.status}</Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => openEditDrawer(room)}
                  style={{ marginTop: 10 }}
                >
                  Editar información
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Botón para agregar nueva habitación */}
      <Fab color="primary" aria-label="add" style={{ position: 'absolute', bottom: 20, right: 20 }} onClick={openAddDrawer}>
        <AddIcon />
      </Fab>

      <Drawer
        anchor="right"
        open={isAddDrawerOpen}
        onClose={closeAddDrawer}
      >
        <Box sx={{ width: 300, padding: 2, marginTop: 10 }}>
          <Typography variant="h5" gutterBottom>Agregar Nueva Habitación</Typography>
          <TextField
            label="Número de Habitación"
            value={newRoom.number_room}
            onChange={(e) => handleNewRoomFieldChange("number_room", e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Nombre de la Habitación"
            value={newRoom.name}
            onChange={(e) => handleNewRoomFieldChange("name", e.target.value)}
            fullWidth
            margin="normal"
          />
          <Typography variant="subtitle1" style={{ marginTop: 20 }}>Tipo de Habitación</Typography>
          <Select
            label="Tipo de Habitación"
            value={newRoom.type_room}
            onChange={(e) => handleNewRoomFieldChange("type_room", e.target.value)}
            fullWidth
            margin="normal"
          >
            <MenuItem value="Sencilla">Sencilla</MenuItem>
            <MenuItem value="Doble">Doble</MenuItem>
          </Select>
          <Typography variant="subtitle1" style={{ marginTop: 20 }}>Estado</Typography>
          <Select
            label="Estado"
            value={newRoom.status}
            onChange={(e) => handleNewRoomFieldChange("status", e.target.value)}
            fullWidth
            margin="normal"
          >
            <MenuItem value="Libre">Libre</MenuItem>
            <MenuItem value="Ocupada">Ocupada</MenuItem>
            <MenuItem value="Mantenimiento">Mantenimiento</MenuItem>
          </Select>
          <Button
            variant="contained"
            color="primary"
            onClick={addNewRoom}
            fullWidth
            style={{ marginTop: 20, borderColor: 'blue', color: 'blue', borderWidth: 2, borderStyle: 'solid' }} // Borde azul
          >
            Agregar
          </Button>
        </Box>
      </Drawer>

      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={closeEditDrawer}
      >
        {selectedRoom && (
          <Box sx={{ width: 300, padding: 2, marginTop: 10 }}>
            <Typography variant="h5" gutterBottom>Editar {selectedRoom.name}</Typography>
            <TextField
              label="Número de Habitación"
              value={selectedRoom.number_room}
              onChange={(e) => handleFieldChange("number_room", e.target.value)}
              fullWidth
              margin="normal"
              disabled
            />
            <TextField
              label="Nombre de la Habitación"
              value={selectedRoom.name}
              onChange={(e) => handleFieldChange("name", e.target.value)}
              fullWidth
              margin="normal"
            />
            <Typography variant="subtitle1" style={{ marginTop: 20 }}>Tipo de Habitación</Typography>
            <Select
              label="Tipo de Habitación"
              value={selectedRoom.type_room}
              onChange={(e) => handleFieldChange("type_room", e.target.value)}
              fullWidth
              margin="normal"
            >
              <MenuItem value="Sencilla">Sencilla</MenuItem>
              <MenuItem value="Doble">Doble</MenuItem>
            </Select>
            <Typography variant="subtitle1" style={{ marginTop: 20 }}>Estado</Typography>
            <Select
              label="Estado"
              value={selectedRoom.status}
              onChange={(e) => handleFieldChange("status", e.target.value)}
              fullWidth
              margin="normal"
            >
              <MenuItem value="Libre">Libre</MenuItem>
              <MenuItem value="Ocupada">Ocupada</MenuItem>
              <MenuItem value="Mantenimiento">Mantenimiento</MenuItem>
            </Select>
            {selectedRoom.status === "Ocupada" && (
              <Box sx={{ pl: 2, mt: 2 }}>
                <Select
                  label="Cliente"
                  value={selectedRoom.cliente}
                  onChange={(e) => handleFieldChange("cliente", e.target.value)}
                  fullWidth
                  margin="normal"
                >
                  {clients.map((client, idx) => (
                    <MenuItem key={idx} value={client}>
                      {client}
                    </MenuItem>
                  ))}
                </Select>
                <TextField
                  label="Valor de la Habitación"
                  type="number"
                  value={selectedRoom.valor}
                  onChange={(e) => handleFieldChange("valor", e.target.value)}
                  fullWidth
                  margin="normal"
                />
              </Box>
            )}
            <Button
              variant="contained"
              color="primary"
              onClick={saveChanges}
              fullWidth
              style={{ marginTop: 20 }}
            >
              Guardar Cambios
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={handleDeleteRoom}
              fullWidth
              style={{ marginTop: 10 }}
            >
              Eliminar Habitación
            </Button>
          </Box>
        )}
      </Drawer>
    </div>
  );
};

export default Room;
