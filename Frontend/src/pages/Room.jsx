import React, { useState, useEffect } from "react";
import { Grid, Card, CardContent, Typography, Button, Drawer, Select, MenuItem, TextField, Box, Fab } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { getRooms} from "../tools/api/inventory/api";
import { getPersons} from "../tools/api/person/api";

import { createRoomReservation } from "../tools/api/transaction/api";



const Room = () => {
  const [rooms, setRooms] = useState([])
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);
  const [newRoom, setNewRoom] = useState({ number_room: '', type_room: 'Sencilla', name: '', status: 'Libre', cliente: '', valor: '' });
  const [persons, setPersons] = useState([]);

useEffect(() => {
  const fetchPersons = async () => {
    try {
      const personsData = await getPersons();
      setPersons(personsData); // Almacena las personas en el estado
    } catch (error) {
      console.error("Error al obtener personas:", error);
    }
  };

  fetchPersons();
}, []);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const roomsData = await getRooms();
        setRooms(roomsData); // Actualiza el estado con los datos obtenidos
      } catch (error) {
        console.error("Error al obtener habitaciones:", error);
      }
    };


  
    fetchRooms();
  }, []);

  const openEditDrawer = (room) => {
    console.log("Habitación seleccionada:", room); 
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
// Venta habs
const [isSaleDrawerOpen, setIsSaleDrawerOpen] = useState(false);
const [saleData, setSaleData] = useState({
  id_guest: "",
  value: "",
  payment_type: "factura",
  date: new Date().toISOString(), // Fecha de inicio
  date_finish: "", // Fecha de fin (puedes calcularla automáticamente)
});

const openSaleDrawer = (room) => {
  setSelectedRoom(room); // Configura la habitación seleccionada
  setSaleData((prev) => ({ ...prev, room_id: room.id })); // Asigna la habitación al registro de venta
  setIsSaleDrawerOpen(true); // Abre el Drawer de venta
};

const closeSaleDrawer = () => {
  setIsSaleDrawerOpen(false);
};

const handleSale = async () => {
  try {
    // Valida que los campos obligatorios estén completos
    if (!saleData.id_guest || !saleData.value || !saleData.date || !saleData.date_finish) {
      alert("Por favor, completa todos los campos");
      return;
    }

    const response = await createRoomReservation(saleData); // Usa la API para crear la reserva
    if (response) {
      // Actualiza la lista de habitaciones y cierra el Drawer
      const updatedRooms = await getRooms();
      setRooms(updatedRooms);
      closeSaleDrawer();
    }
  } catch (error) {
    console.error("Error al registrar la venta:", error);
  }
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
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => openSaleDrawer(room)}
                  style={{ marginTop: 10 }}
                >
                  Registrar Venta
                </Button>

              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Botón para agregar nueva habitación */}
      <Fab className="boton-flotante" color="primary" aria-label="add" style={{ position: 'absolute', bottom: 20, right: 20 }} onClick={openAddDrawer}>
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

      <Drawer anchor="right" open={isDrawerOpen} onClose={closeEditDrawer}>
      {selectedRoom && (
        <Box sx={{ width: 300, padding: 2, marginTop: 10 }}>
          <Typography variant="h5" gutterBottom>
            Editar Habitación {selectedRoom.number_room}
          </Typography>

          {/* Campo: Número de Habitación */}
          <TextField
            label="Número de Habitación"
            value={selectedRoom.number_room}
            onChange={(e) => handleFieldChange("number_room", e.target.value)}
            fullWidth
            margin="normal"
            disabled
          />

          {/* Campo: Tipo de Habitación */}
          <Typography variant="subtitle1" style={{ marginTop: 20 }}>
            Tipo de Habitación
          </Typography>
          <Select
            label="Tipo de Habitación"
            value={selectedRoom.type_room}
            onChange={(e) => handleFieldChange("type_room", e.target.value)}
            fullWidth
            margin="normal"
            disabled 
          >
            <MenuItem value="sencilla">Sencilla</MenuItem>
            <MenuItem value="doble">Doble</MenuItem>
          </Select>

          {/* Campo: Estado */}
          <Typography variant="subtitle1" style={{ marginTop: 20 }}>
            Estado
          </Typography>
          <Select
            label="Estado"
            value={selectedRoom.status} 
            onChange={(e) => handleFieldChange("status", e.target.value)}
            fullWidth
            margin="normal"
          >
            <MenuItem value="disponible">Disponible</MenuItem>
            <MenuItem value="ocupada">Ocupada</MenuItem>
            <MenuItem value="mantenimiento">Mantenimiento</MenuItem>
          </Select>
          {/* {selectedRoom.status === "Ocupada" && (
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
            )} */}

          {/* Botón para guardar los cambios */}
          <Button
            variant="contained"
            color="primary"
            onClick={saveChanges}
            fullWidth
            style={{ marginTop: 20 }}
          >
            Guardar Cambios
          </Button>
        </Box>
      )}
    </Drawer>
    <Drawer anchor="right" open={isSaleDrawerOpen} onClose={closeSaleDrawer}>
      {selectedRoom && (
        <Box sx={{ width: 300, padding: 2, marginTop: 10 }}>
          <Typography variant="h5" gutterBottom>
            Registrar Venta - Habitación {selectedRoom.number_room}
          </Typography>

          {/* Selección de cliente */}
          <Select
            label="Cliente"
            value={saleData.id_guest}
            onChange={(e) => setSaleData({ ...saleData, id_guest: e.target.value })}
            fullWidth
            margin="normal"
          >
            {persons?.length > 0 ? (
              persons.map((person) => (
                <MenuItem key={person.id} value={person.id}>
                  {person.name}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>Cargando personas...</MenuItem>
            )}
          </Select>

          {/* Valor de la venta */}
          <TextField
            label="Valor"
            type="number"
            value={saleData.value}
            onChange={(e) => setSaleData({ ...saleData, value: e.target.value })}
            fullWidth
            margin="normal"
          />

          {/* Tipo de pago */}
          <Select
            label="Tipo de Pago"
            value={saleData.payment_type}
            onChange={(e) => setSaleData({ ...saleData, payment_type: e.target.value })}
            fullWidth
            margin="normal"
          >
            <MenuItem value="factura">Factura</MenuItem>
            <MenuItem value="sin factura">Sin Factura</MenuItem>
          </Select>

          {/* Fechas */}
          <TextField
            label="Fecha de Inicio"
            type="datetime-local"
            value={saleData.date}
            onChange={(e) => setSaleData({ ...saleData, date: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Fecha de Fin"
            type="datetime-local"
            value={saleData.date_finish}
            onChange={(e) => setSaleData({ ...saleData, date_finish: e.target.value })}
            fullWidth
            margin="normal"
          />

          {/* Botón para confirmar */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleSale}
            fullWidth
            style={{ marginTop: 20 }}
          >
            Confirmar Venta
          </Button>
        </Box>
      )}
    </Drawer>

    </div>
  );
};

export default Room;