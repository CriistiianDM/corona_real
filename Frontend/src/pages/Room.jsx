import React, { useState, useEffect } from "react";
import { Grid, Card, CardContent, Typography, Button, Drawer, Select, MenuItem, TextField, Box, Fab } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { getRooms, updateRoom} from "../tools/api/inventory/api";
import { getPersons} from "../tools/api/person/api";

import { createRoomReservation } from "../tools/api/transaction/api";
import { getData } from "../tools/utils/utils";

// Componets
import BoxPrimary from "../components/Share/BoxPrimary.jsx"

// Styles
import styles from "../css/jscss/root"

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

  const saveChanges = async () => {
    try {
      if (!selectedRoom) {
        alert("No se ha seleccionado ninguna habitación.");
        return;
      }
  
      // Prepara los datos para la actualización
      const updatedRoomData = {
        ...selectedRoom,
        cliente: selectedRoom.status === "disponible" ? null : selectedRoom.cliente, // Elimina cliente si es "disponible"
      };
  
      // Realiza la solicitud PUT al backend
      const response = await updateRoom(selectedRoom.id, updatedRoomData);
  
      if (response?.id) {
        // Actualiza el estado local con la respuesta del backend
        const updatedRooms = rooms.map((room) =>
          room.id === response.id ? response : room
        );
        setRooms(updatedRooms);
  
        alert("La habitación se ha actualizado correctamente.");
      } else {
        alert("No se pudo actualizar la habitación.");
      }
  
      closeEditDrawer(); // Cierra el drawer
    } catch (error) {
      console.error("Error al guardar cambios:", error);
      alert("Error al guardar los cambios.");
    }
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
  payment_type: 1, // Debe ser un id
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
        //Valida que los campos obligatorios estén completos
        if (!saleData.id_guest || !saleData.value || !saleData.date || !saleData.date_finish) {
          alert("Por favor, completa todos los campos");
          return;
        }

        const dbClient = await getData() ?? {}
        const cash_register = Number(saleData.payment_type) === 2? 2 : 3;
        const dataSend = {
            data_room: selectedRoom,
            data_transactions: {
            type_transaction: Number(saleData.payment_type),
            cash_register: cash_register,
            value: Number(saleData.value),
            },
            data_user: dbClient?.user_data,
            data_room_reservation: {
              count_accompany: 0, // Falta
              date: saleData.date,
              date_finish: saleData.date_finish,
              status: "RESERVACION", // Falta
            }
        }
        const response = await createRoomReservation({ data: dataSend }); // Usa la API para crear la reserva
        if (response?.id) {
          alert("Funciona Mi papacho")
          const updatedRooms = await getRooms();
          setRooms(updatedRooms);
          closeSaleDrawer();
        }

    } catch (error) {
        console.error("Error al registrar la venta:", error);
    }
};




  return (
    <BoxPrimary title={"Habitaciones"}>
      <Grid sx={styles.containerRooms}>
      {rooms.map((room) => {
    // Función para determinar el color del borde
    const borderColor = (() => {
      switch (room.status) {
        case "ocupado":
          return "#6a0203";
        case "disponible":
          return "#589958";
        case "sucio":
          return "orange";
        case "averiada":
          return "#328ecd";
        default:
          return "black"; // Color por defecto
      }
    })();

    return (
      <Grid  key={room.id}>
        <Card
          className="thumb-cards_room"
          style={{
            display: "flex",
            alignItems: "center",
            borderColor: borderColor, // Aplica el color basado en el estado
            borderWidth: 7,
            borderStyle: "solid",
          }}
        >
          <div>
            <img
              src="/Room2.png"
              alt={`Habitación ${room.number_room}`}
              style={{ width: 245, height: 300, objectFit: "cover", borderRadius: "8px" }}
            />
          </div>
          <CardContent>
          <Grid>
            <Typography variant="h6" style={{ fontSize: "1rem" }}>{room.number_room}</Typography>
            <Typography variant="h6" style={{ fontSize: "1rem" }}>{room.name}</Typography>
            <Typography variant="body2"><b>Tipo:</b> {room.type_room}</Typography>
            <Typography variant="body2" style={{ color: borderColor }}>
              <b>Estado: </b>{room.status}
            </Typography>
            {room.status === "ocupada" && (
              <Typography variant="body2" style={{ fontWeight: "bold", marginTop: 5 }}>
                Cliente: {room.cliente || "Sin asignar"}
              </Typography>
            )}
            </Grid>
            <Grid>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => openEditDrawer(room)}
              style={{ marginTop: 10 }}
            >
              Editar información
            </Button>
            {room.status === "disponible" && (
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => openSaleDrawer(room)}
                style={{ marginTop: 10 }}
              >
                Registrar Venta
              </Button>
            )}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    );
  })}
</Grid>


      {/* Botón para agregar nueva habitación */}
      <Fab className="boton-flotante" color="primary" aria-label="add" style={{ position: 'fixed', zIndex: 99, bottom: 20, right: 20 }} onClick={openAddDrawer}>
        <AddIcon />
      </Fab>

      <Drawer
        anchor="right"
        open={isAddDrawerOpen}
        onClose={closeAddDrawer}
        sx={{
          '& .MuiPaper-root': {
            background: '#FFFEEE'
          }
        }}
      >
        <Box sx={{ width: 300, padding: 2, marginTop: 10, background: '#FFFEEE'}}>
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
            style={{ marginTop: 20, color: '#fff', background: '#320001' }} // Borde azul
          >
            Agregar
          </Button>
        </Box>
      </Drawer>

      <Drawer sx={{
          '& .MuiPaper-root': {
            background: '#FFFEEE'
          }
        }} anchor="right" open={isDrawerOpen} onClose={closeEditDrawer}>
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
            <MenuItem value="sucio">Sucia</MenuItem>
            <MenuItem value="averiada">Averiada</MenuItem>
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
            style={{ marginTop: 20, color: '#fff', background: '#320001' }}
          >
            Guardar Cambios
          </Button>
        </Box>
      )}
    </Drawer>
    <Drawer         sx={{
          '& .MuiPaper-root': {
            background: '#FFFEEE'
          }
        }} anchor="right" open={isSaleDrawerOpen} onClose={closeSaleDrawer}>
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
            <MenuItem value="2">Factura</MenuItem>
            <MenuItem value="1">Sin Factura</MenuItem>
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
            style={{ marginTop: 20, color: '#fff', background: '#320001' }}
          >
            Confirmar Venta
          </Button>
        </Box>
      )}
    </Drawer>
    </BoxPrimary>
  );
};

export default Room;