import React, { useState, useEffect } from "react";
import { Grid, Card, CardContent, Typography, Button, Drawer, Select, MenuItem, TextField, Box, Fab } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { getRooms, updateRoom} from "../tools/api/inventory/api";
import { getPersons} from "../tools/api/person/api";
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';

import { createRoomReservation } from "../tools/api/transaction/api";
import { getData } from "../tools/utils/utils";

// Componets
import BoxPrimary from "../components/Share/BoxPrimary.jsx"

// Styles
import styles from "../css/jscss/root"
import AlertService from "./utils/AlertService.js";

const Room = () => {
  const [rooms, setRooms] = useState([])
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);
  const [newRoom, setNewRoom] = useState({ number_room: '', type_room: 'Sencilla', name: '', status: 'Libre', cliente: '', valor: '' });
  const [persons, setPersons] = useState([]);
  const [isEditSaleDrawerOpen, setIsEditSaleDrawerOpen] = useState(false);
  const [editSaleData, setEditSaleData] = useState(null);

useEffect(() => {
  const fetchPersons = async () => {
    try {
      const personsData = await getPersons();
      setPersons(personsData); // Almacena las personas en el estado
    } catch (error) {
      console.error("Error al obtener personas:", error);
      const errorMessage = error.response?.data?.message || error.message || "Error al obtener personas";
      AlertService.error(errorMessage, "Error", "top-start");
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
        const errorMessage = error.response?.data?.message || error.message || "Error al obtener habitaciones";
        AlertService.error(errorMessage, "Error", "top-start");
      }
    };


  
    fetchRooms();
  }, []);






  // const openEditSaleDrawer = (room) => {
  //   // Carga los datos de la venta correspondiente
  //   const saleToEdit = {
  //     //id_guest: room.cliente,
  //     id_guest: 2,
  //     value: room.valor,
  //     payment_type: 1, // Por defecto, ajusta según tus datos reales
  //     date: new Date().toISOString(),
  //     date_finish: "", // Ajusta con la lógica correspondiente
  //   };
  //   setEditSaleData(saleToEdit);
  //   setIsEditSaleDrawerOpen(true);
  // };

  const openEditSaleDrawer = (room) => {
    console.log("Abrir Edit Sale Drawer para la habitación:", room);
  
    const saleToEdit = {
      id_guest: room.cliente || "", // Carga datos del cliente
      value: room.valor || "", // Carga el valor
      payment_type: 1, // Ajusta según tu lógica
      date: new Date().toISOString(),
      date_finish: "", // Ajusta según los datos reales
    };
  
    setEditSaleData(saleToEdit);
    setIsEditSaleDrawerOpen(true); // Cambia el estado para abrir el Drawer
  
    setTimeout(() => {
      console.log("Estado actualizado de isEditSaleDrawerOpen:", isEditSaleDrawerOpen);
    }, 100); // Verifica el estado después de la actualización
  };
  
  const closeEditSaleDrawer = () => {
    setIsEditSaleDrawerOpen(false);
  };

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
        AlertService.warning("No se ha seleccionado ninguna habitación", "Advertencia", "top-start");
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
  
        AlertService.success("La habitación se ha actualizado correctamente", "Éxito", "top-start");
      } else {
        AlertService.error("No se pudo actualizar la habitación", "Error", "top-start");
      }
  
      closeEditDrawer(); // Cierra el drawer
    } catch (error) {
      console.error("Error al guardar cambios:", error);
      AlertService.error(errorMessage, "Error", "top-start");
    }
  };
  

  const handleDeleteRoom = () => {
    const updatedRooms = rooms.filter(room => room.id !== selectedRoom.id);
    setRooms(updatedRooms);
    closeEditDrawer();
    AlertService.success("Habitación eliminada con éxito", "Éxito", "top-start");
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
          AlertService.warning("Por favor, completa todos los campos", "Advertencia", "top-start");
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
          AlertService.success("Funciona","Éxito", "top-start")
          const updatedRooms = await getRooms();
          setRooms(updatedRooms);
          closeSaleDrawer();
        }

    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Error al registrar la venta";
      AlertService.error(errorMessage, "Error", "top-start");
    }
};


  const handleEditSale = async () => {
    try {
      //Valida que los campos obligatorios estén completos
      if (!saleData.id_guest || !saleData.value || !saleData.date || !saleData.date_finish) {
        AlertService.warning("Por favor, completa todos los campos", "Advertencia", "top-start");
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
        AlertService.success("Funciona","Éxito", "top-start")
        const updatedRooms = await getRooms();
        setRooms(updatedRooms);
        closeSaleDrawer();
      }

    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Error al registrar la venta";
      AlertService.error(errorMessage, "Error", "top-start");
    }
  };



const FreeSolo = ({ data, dataComplete, setDataPerson }) => {
  const onHandlerChange = (e, value) => {
    if (data?.length <= 0) return;
    if (value === null) {
      setDataPerson(dataComplete); // Restaura la lista completa si no hay selección
    } else {
      const filter = data.filter((item) => item.name === value); // Filtra por nombre
      setDataPerson(filter ?? data);
    }
  };

  if (data?.length <= 0) return null;

  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Autocomplete
        freeSolo
        onChange={onHandlerChange}
        options={data.map((option) => option.name)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Buscar Cliente"
            placeholder="Nombre del cliente"
            fullWidth
            margin="normal"
          />
        )}
      />
    </Stack>
  );
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
            {room.status === "ocupado" && (
              <Button
                variant="outlined"
                color="primary"
                onClick={() => openEditSaleDrawer(room)}
                style={{ marginTop: 10 }}
              >
                Editar Venta
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

    <Drawer
        sx={{
          '& .MuiPaper-root': {
            background: '#FFFEEE',
          },
        }}
        anchor="right"
        open={isSaleDrawerOpen}
        onClose={closeSaleDrawer}
      >
        {selectedRoom && (
          <Grid container spacing={2} direction="column" sx={{ width: 300, padding: 2, marginTop: 10 }}>
            <Grid item>
              <Typography variant="h5" gutterBottom>
                Registrar Venta - Habitación {selectedRoom.number_room}
              </Typography>
            </Grid>
            <Grid item>
              {/* <Typography variant="subtitle1">Cliente</Typography> */}
              <FreeSolo
                data={persons}
                dataComplete={persons}
                setDataPerson={(filtered) => {
                  if (filtered.length > 0) {
                    handleFieldChange('cliente', filtered[0].id, e.target.value);
                  } else {
                    handleFieldChange('cliente', '', e.target.value);
                  }
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Valor"
                type="number"
                value={saleData.value}
                onChange={(e) => setSaleData({ ...saleData, value: e.target.value })}
                fullWidth
              />
            </Grid>
            <Grid item>
              <Select
                label="Tipo de Pago"
                value={saleData.payment_type}
                onChange={(e) => setSaleData({ ...saleData, payment_type: e.target.value })}
                fullWidth
              >
                <MenuItem value="2">Factura</MenuItem>
                <MenuItem value="1">Sin Factura</MenuItem>
              </Select>
            </Grid>
            <Grid item>
              <TextField
                label="Fecha de Inicio"
                type="datetime-local"
                value={saleData.date}
                onChange={(e) => setSaleData({ ...saleData, date: e.target.value })}
                fullWidth
              />
            </Grid>
            <Grid item>
              <TextField
                label="Fecha de Fin"
                type="datetime-local"
                value={saleData.date_finish}
                onChange={(e) => setSaleData({ ...saleData, date_finish: e.target.value })}
                fullWidth
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSale}
                fullWidth
                sx={{ color: '#fff', background: '#320001' }}
              >
                Confirmar Venta
              </Button>
            </Grid>
          </Grid>

        )}
      </Drawer>



      <Drawer
        sx={{
          '& .MuiPaper-root': {
            background: '#FFFEEE',
          },
        }}
        anchor="right"
        open={isEditSaleDrawerOpen}
        onClose={closeEditSaleDrawer}
      >
        {editSaleData && (
          <Grid container spacing={2} direction="column" sx={{ width: 300, padding: 2, marginTop: 10 }}>
            <Grid item>
              <Typography variant="h5" gutterBottom>
                Editar Venta - Habitación {selectedRoom?.number_room}
              </Typography>
            </Grid>
            <Grid item>
            <FreeSolo
                data={persons}
                dataComplete={persons}
                setDataPerson={(filtered) => {
                  if (filtered.length > 0) {
                    handleFieldChange('cliente', filtered[0].id, e.target.value);
                  } else {
                    handleFieldChange('cliente', '', e.target.value);
                  }
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Valor"
                type="number"
                value={editSaleData.value}
                onChange={(e) => setEditSaleData({ ...editSaleData, value: e.target.value })}
                fullWidth
              />
            </Grid>
            <Grid item>
              <Select
                label="Tipo de Pago"
                value={editSaleData.payment_type}
                onChange={(e) => setEditSaleData({ ...editSaleData, payment_type: e.target.value })}
                fullWidth
              >
                <MenuItem value="2">Factura</MenuItem>
                <MenuItem value="1">Sin Factura</MenuItem>
              </Select>
            </Grid>
            <Grid item>
              <TextField
                label="Fecha de Inicio"
                type="datetime-local"
                value={editSaleData.date}
                onChange={(e) => setEditSaleData({ ...editSaleData, date: e.target.value })}
                fullWidth
              />
            </Grid>
            <Grid item>
              <TextField
                label="Fecha de Fin"
                type="datetime-local"
                value={editSaleData.date_finish}
                onChange={(e) => setEditSaleData({ ...editSaleData, date_finish: e.target.value })}
                fullWidth
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={handleEditSale}
                fullWidth
                sx={{ color: '#fff', background: '#320001' }}
              >
                Guardar Cambios
              </Button>
            </Grid>
          </Grid>
        )}
      </Drawer>


    </BoxPrimary>
  );
  
};

export default Room;