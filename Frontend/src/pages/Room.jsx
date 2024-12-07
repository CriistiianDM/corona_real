import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Drawer,
  Select,
  MenuItem,
  TextField,
  Box,
  Fab,
  Stack,
  Autocomplete
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { getRooms, updateRoom } from "../tools/api/inventory/api";
import { getPersons } from "../tools/api/person/api";
import { createRoomReservation } from "../tools/api/transaction/api";
import { getData } from "../tools/utils/utils";

// Components
import BoxPrimary from "../components/Share/BoxPrimary.jsx"

// Styles
import styles from "../css/jscss/root"
import AlertService from "./utils/AlertService.js";

const Room = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);
  const [newRoom, setNewRoom] = useState({
    number_room: '',
    type_room: 'Sencilla',
    name: '',
    status: 'Libre',
    cliente: '',
    valor: ''
  });
  const [persons, setPersons] = useState([]);
  const [isEditSaleDrawerOpen, setIsEditSaleDrawerOpen] = useState(false);
  const [editSaleData, setEditSaleData] = useState(null);

  // Venta Habitación
  const [isSaleDrawerOpen, setIsSaleDrawerOpen] = useState(false);
  const [saleData, setSaleData] = useState({
    id_guest: "",
    clienteName: "",
    value: "",
    payment_type: 1, // Debe ser un id
    date: new Date().toISOString(), // Fecha de inicio
    date_finish: "", // Fecha de fin (puedes calcularla automáticamente)
    room_id: ""
  });

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

  // Función para manejar cambios en campos generales
  const handleFieldChange = (field, value, name = '') => {
    setSelectedRoom(prevRoom => ({
      ...prevRoom,
      [field]: value,
      [`${field}Name`]: name, // Opcional: almacenar el nombre si es necesario
    }));
  };

  // Funciones para los Drawers
  const openEditSaleDrawer = (room) => {
    console.log("Abrir Edit Sale Drawer para la habitación:", room);

    const saleToEdit = {
      id_guest: room.cliente || "", // Carga datos del cliente
      clienteName: "", // Será establecido por FreeSolo
      value: room.valor || "", // Carga el valor
      payment_type: 1, // Ajusta según tu lógica
      date: new Date().toISOString(),
      date_finish: "", // Ajusta según los datos reales
      room_id: room.id
    };

    // Obtener el nombre del cliente si el id está presente
    if (room.cliente) {
      const person = persons.find(p => p.id === room.cliente);
      if (person) {
        saleToEdit.clienteName = person.name;
      }
    }

    setEditSaleData(saleToEdit);
    setIsEditSaleDrawerOpen(true); // Cambia el estado para abrir el Drawer

    setTimeout(() => {
      console.log("Estado actualizado de isEditSaleDrawerOpen:", isEditSaleDrawerOpen);
    }, 100); // Verifica el estado después de la actualización
  };

  const closeEditSaleDrawer = () => {
    setIsEditSaleDrawerOpen(false);
    setEditSaleData(null);
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
      const errorMessage = error.response?.data?.message || error.message || "Error al guardar cambios";
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

  // Funciones para la Venta de Habitaciones
  const openSaleDrawer = (room) => {
    setSelectedRoom(room); // Configura la habitación seleccionada
    setSaleData((prev) => ({ ...prev, room_id: room.id })); // Asigna la habitación al registro de venta
    setIsSaleDrawerOpen(true); // Abre el Drawer de venta
  };

  const closeSaleDrawer = () => {
    setIsSaleDrawerOpen(false);
    setSaleData({
      id_guest: "",
      clienteName: "",
      value: "",
      payment_type: 1,
      date: new Date().toISOString(),
      date_finish: "",
      room_id: ""
    });
  };

  const handleSale = async () => {
    try {
      // Valida que los campos obligatorios estén completos
      if (!saleData.id_guest || !saleData.value || !saleData.date || !saleData.date_finish) {
        AlertService.warning("Por favor, completa todos los campos", "Advertencia", "top-start");
        return;
      }

      const dbClient = await getData() ?? {}
      const cash_register = Number(saleData.payment_type) === 2 ? 2 : 3;
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
        AlertService.success("Funciona", "Éxito", "top-start")
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
      // Valida que los campos obligatorios estén completos
      if (!editSaleData.id_guest || !editSaleData.value || !editSaleData.date || !editSaleData.date_finish) {
        AlertService.warning("Por favor, completa todos los campos", "Advertencia", "top-start");
        return;
      }

      const dbClient = await getData() ?? {}
      const cash_register = Number(editSaleData.payment_type) === 2 ? 2 : 3;
      const dataSend = {
        data_room: selectedRoom,
        data_transactions: {
          type_transaction: Number(editSaleData.payment_type),
          cash_register: cash_register,
          value: Number(editSaleData.value),
        },
        data_user: dbClient?.user_data,
        data_room_reservation: {
          count_accompany: 0, // Falta
          date: editSaleData.date,
          date_finish: editSaleData.date_finish,
          status: "RESERVACION", // Falta
        }
      }
      const response = await createRoomReservation({ data: dataSend }); // Usa la API para crear la reserva
      if (response?.id) {
        AlertService.success("Funciona", "Éxito", "top-start")
        const updatedRooms = await getRooms();
        setRooms(updatedRooms);
        closeEditSaleDrawer();
      }

    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Error al registrar la venta";
      AlertService.error(errorMessage, "Error", "top-start");
    }
  };

  // Componente FreeSolo
  const FreeSolo = ({ data, setDataPerson, initialValue }) => {
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
      if (initialValue) {
        const person = data.find(p => p.id === initialValue);
        if (person) {
          setInputValue(person.name);
        }
      }
    }, [initialValue, data]);

    const handleChange = (event, newValue) => {
      if (newValue === null || newValue === '') {
        setDataPerson({ id: '', name: '' });
        return;
      }

      const selectedPerson = data.find(person => person.name === newValue);
      if (selectedPerson) {
        setDataPerson({ id: selectedPerson.id, name: selectedPerson.name });
      } else {
        // Si es texto libre, solo establecer el nombre sin ID
        setDataPerson({ id: '', name: newValue });
      }
    };

    const handleInputChange = (event, newInputValue) => {
      setInputValue(newInputValue);
    };

    return (
      <Stack sx={{ width: '100%' }} spacing={2}>
        <Autocomplete
          freeSolo
          value={inputValue}
          onChange={handleChange}
          inputValue={inputValue}
          onInputChange={handleInputChange}
          options={data.map(option => option.name)}
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
            <Grid key={room.id}>
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
                        Cliente: {room.clienteName || "Sin asignar"}
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
      <Fab
        className="boton-flotante"
        color="primary"
        aria-label="add"
        style={{ position: 'fixed', zIndex: 99, bottom: 20, right: 20 }}
        onClick={openAddDrawer}
      >
        <AddIcon />
      </Fab>

      {/* Drawer para agregar nueva habitación */}
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
        <Box sx={{ width: 300, padding: 2, marginTop: 10, background: '#FFFEEE' }}>
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

      {/* Drawer para editar habitación */}
      <Drawer
        sx={{
          '& .MuiPaper-root': {
            background: '#FFFEEE'
          }
        }}
        anchor="right"
        open={isDrawerOpen}
        onClose={closeEditDrawer}
      >
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
              <MenuItem value="Sencilla">Sencilla</MenuItem>
              <MenuItem value="Doble">Doble</MenuItem>
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

      {/* Drawer para Registrar Venta */}
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
              <FreeSolo
                data={persons}
                setDataPerson={(data) => {
                  // data es { id, name }
                  setSaleData(prev => ({
                    ...prev,
                    id_guest: data.id,
                    clienteName: data.name
                  }));
                }}
                initialValue={saleData.id_guest}
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
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Fecha de Fin"
                type="datetime-local"
                value={saleData.date_finish}
                onChange={(e) => setSaleData({ ...saleData, date_finish: e.target.value })}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
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

      {/* Drawer para Editar Venta */}
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
                setDataPerson={(data) => {
                  // data es { id, name }
                  setEditSaleData(prev => ({
                    ...prev,
                    id_guest: data.id,
                    clienteName: data.name
                  }));
                }}
                initialValue={editSaleData.id_guest}
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
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Fecha de Fin"
                type="datetime-local"
                value={editSaleData.date_finish}
                onChange={(e) => setEditSaleData({ ...editSaleData, date_finish: e.target.value })}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
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
