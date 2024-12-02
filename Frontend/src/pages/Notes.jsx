import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Button,
  Drawer,
  TextField,
  Box,
  Fab,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import {
  getNotes,
  createNote,
  updateNote,
  deleteNote
} from "../tools/api/inventory/api";

// Componentes
import BoxPrimary from "../components/Share/BoxPrimary.jsx";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isNewNoteDrawerOpen, setIsNewNoteDrawerOpen] = useState(false);
  const [newNote, setNewNote] = useState({
    name: "",
    contenido: "",
    date: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Obtener notas de la base de datos al montar el componente
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const data = await getNotes();
      setNotes(data);
    } catch (err) {
      console.error("Error fetching notes:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const openEditDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeEditDrawer = () => {
    setIsDrawerOpen(false);
  };

  const openNewNoteDrawer = () => {
    setIsNewNoteDrawerOpen(true);
    setNewNote({ name: "", contenido: "", date: "" });
  };

  const closeNewNoteDrawer = () => {
    setIsNewNoteDrawerOpen(false);
  };

  const handleFieldChange = (field, value) => {
    setSelectedNote({ ...selectedNote, [field]: value });
  };

  const handleNewNoteFieldChange = (field, value) => {
    setNewNote({ ...newNote, [field]: value });
  };

  const saveChanges = async () => {
    try {
      await updateNote(selectedNote.id, selectedNote);
      // Actualizar la nota localmente
      const updatedNotes = notes.map((note) =>
        note.id === selectedNote.id ? selectedNote : note
      );
      setNotes(updatedNotes);
      closeEditDrawer();
    } catch (err) {
      console.error("Error updating note:", err);
    }
  };

  const addNewNote = async () => {
    try {
      console.log("Enviando datos:", newNote);
      const response = await createNote({
        name: newNote.name.trim(),
        contenido: newNote.contenido.trim(),
        date: new Date().toISOString(), // Asegúrate de enviar el formato correcto
      });
      const newNoteData = {
        id: response.id,
        name: response.name,
        contenido: response.contenido,
        date: new Date().toISOString(),
      };
      setNotes([...notes, newNoteData]);
      closeNewNoteDrawer();
    } catch (error) {
      console.error("Error al agregar la nota:", error);
    }
  };
  

  const deleteNoteById = async (id) => {
    try {
        await deleteNote(id); // Llama al método deleteNote del API
        setNotes(notes.filter((note) => note.id !== id)); // Actualiza el estado local eliminando la nota
        if (selectedNote && selectedNote.id === id) {
            setSelectedNote(null); // Limpia la nota seleccionada si fue eliminada
        }
    } catch (err) {
        console.error("Error deleting note:", err);
    }
};


  const selectNote = (note) => {
    setSelectedNote(note);
  };

  return (
    <BoxPrimary title={"Notas entre Recepcionistas"}>
      <Box display="flex" width="100%" height="calc(100vh - 64px)">
        {/* Barra lateral izquierda */}
        <Box
          sx={{
            width: "250px",
            borderRight: "1px solid #ddd",
            overflowY: "auto",
            backgroundColor: "#f5f5f5",
          }}
        >
          {loading ? (
            <Typography variant="h6" align="center" mt={2}>
              Cargando notas...
            </Typography>
          ) : error ? (
            <Typography variant="h6" align="center" mt={2} color="error">
              Error al cargar las notas.
            </Typography>
          ) : (
          <List>
            {notes.map((note) => (
              <React.Fragment key={note.id}>
                <ListItem
                  key={`list-item-${note.id}`}
                  button
                  selected={selectedNote && selectedNote.id === note.id}
                  onClick={() => selectNote(note)}
                >
                  <ListItemText
                    primary={note.name}
                    secondary={new Date(note.date).toLocaleDateString()}
                  />
                </ListItem>
                <Divider key={`divider-${note.id}`} />
              </React.Fragment>
            ))}
          </List>

          )}
        </Box>

        {/* Área de contenido derecha */}
        <Box flex={1} sx={{ padding: 2, backgroundColor: "#FFFEEE" }}>
        {selectedNote ? (
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <Typography variant="h4" gutterBottom>
              {selectedNote.name}
            </Typography>
            {/* Divider debajo del título */}
            <Divider sx={{ width: "80%", marginY: 2 }} />
            <Typography variant="body1" gutterBottom>
              {selectedNote.contenido}
            </Typography>
            {/* Divider debajo del contenido */}
            <Divider sx={{ width: "80%", marginY: 2 }} />
            <Typography variant="body2" color="textSecondary">
              Fecha de creación:{" "}
              {new Date(selectedNote.date).toLocaleDateString()}
            </Typography>
            {/* Divider debajo de la fecha */}
            <Divider sx={{ width: "80%", marginY: 2 }} />
            <Box display="flex" mt={2}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<EditIcon />}
                onClick={openEditDrawer}
                sx={{ marginRight: 1 }}
              >
                Editar
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<DeleteIcon />}
                onClick={() => deleteNoteById(selectedNote.id)}
              >
                Eliminar
              </Button>
            </Box>
          </Box>
        ): (
            <Box
            display="flex"
            flexDirection="column" // Para alinear elementos verticalmente
            justifyContent="center"
            alignItems="center"
            height="100%"
            sx={{ backgroundColor: "#FFFEEE" }}
          >
            <Typography
              variant="h5"
              color="textSecondary"
              sx={{ marginBottom: 4 }} // Incrementar margen para mayor separación
            >
              Crea tus notas
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<AddIcon />}
              onClick={openNewNoteDrawer}
              sx={{ padding: "10px 20px" }} // Botón más espacioso
            >
              Agregar Nota
            </Button>
          </Box>
        )}
      </Box>
    </Box>


      {/* Drawer para editar nota */}
      <Drawer anchor="right" open={isDrawerOpen} onClose={closeEditDrawer}>
        {selectedNote && (
          <Box sx={{ width: 300, padding: 3, marginTop: 10 }}>
            <Typography variant="h5" gutterBottom>
              Editar Nota
            </Typography>
            <TextField
              label="Título"
              value={selectedNote.name}
              onChange={(e) => handleFieldChange("name", e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Contenido"
              value={selectedNote.contenido}
              onChange={(e) =>
                handleFieldChange("contenido", e.target.value)
              }
              fullWidth
              margin="normal"
              multiline
              rows={4}
            />
            <TextField
              label="Fecha de creación"
              type="date"
              value={selectedNote.date.slice(0, 10)}
              onChange={(e) => handleFieldChange("date", e.target.value)}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Button
                sx={{
                  color: "#320001",
                  background: "#dad0d0",
                  border: "1px solid #320001",
                }}
                variant="outlined"
                onClick={closeEditDrawer}
              >
                Cancelar
              </Button>
              <Button
                sx={{ color: "#fff", background: "#320001" }}
                variant="contained"
                color="primary"
                onClick={saveChanges}
              >
                Guardar
              </Button>
            </Box>
          </Box>
        )}
      </Drawer>

      {/* Drawer para agregar nueva nota */}
      <Drawer
        anchor="right"
        open={isNewNoteDrawerOpen}
        onClose={closeNewNoteDrawer}
        sx={{
          "& .MuiPaper-root": {
            background: "#FFFEEE",
          },
        }}
      >
        <Box sx={{ width: 300, padding: 3, marginTop: 10 }}>
          <Typography variant="h5" gutterBottom>
            Agregar Nueva Nota
          </Typography>
          <TextField
            label="Título"
            value={newNote.name}
            onChange={(e) => handleNewNoteFieldChange("name", e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Contenido"
            value={newNote.contenido}
            onChange={(e) =>
              handleNewNoteFieldChange("contenido", e.target.value)
            }
            fullWidth
            margin="normal"
            multiline
            rows={4}
          />
          <TextField
            label="Fecha de creación"
            type="date"
            value={newNote.date}
            onChange={(e) => handleNewNoteFieldChange("date", e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button
              sx={{
                color: "#320001",
                background: "#dad0d0",
                border: "1px solid #320001",
              }}
              variant="outlined"
              onClick={closeNewNoteDrawer}
            >
              Cancelar
            </Button>
            <Button
              sx={{ color: "#fff", background: "#320001" }}
              variant="contained"
              color="primary"
              onClick={addNewNote}
            >
              Agregar
            </Button>
          </Box>
        </Box>
      </Drawer>

      {/* Botón flotante para agregar nota */}
      <Fab
        className="boton-flotante"
        color="primary"
        aria-label="add"
        onClick={openNewNoteDrawer}
        style={{ position: "fixed", bottom: 16, right: 16 }}
      >
        <AddIcon />
      </Fab>
    </BoxPrimary>
  );
};

export default Notes;
