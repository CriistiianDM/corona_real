import React, { useState } from "react";
import { Grid, Card, CardContent, Typography, Button } from "@mui/material";

const initialRooms = [
  { number: 101, status: "Libre" },
  { number: 203, status: "Ocupada" },
  { number: 104, status: "Libre" },
  { number: 403, status: "Ocupada" },
  // Agrega más habitaciones aquí
];

const Room = () => {
  const [rooms, setRooms] = useState(initialRooms);

  const toggleStatus = (index) => {
    const updatedRooms = rooms.map((room, i) =>
      i === index ? { ...room, status: room.status === "Libre" ? "Ocupada" : "Libre" } : room
    );
    setRooms(updatedRooms);
  };

  return (
    <Grid container spacing={3}>
      {rooms.map((room, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={room.number}>
          <Card>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <img
                src="/Room.png"
                alt={`Habitación ${room.number}`}
                style={{ width: 100, height: 100 }}
              />
              <Typography variant="h6" sx={{ mt: 2 }}>Habitación {room.number}</Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>Estado: {room.status}</Typography>
              <Button variant="contained" onClick={() => toggleStatus(index)}>
                {room.status === "Libre" ? "Marcar Ocupada" : "Marcar Libre"}
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Room;
