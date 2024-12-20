import React from "react";
import { Drawer, List, ListItem, ListItemText, Toolbar, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar>
        <Box sx={{ display: "flex", alignItems: "center", padding: 1 }}>
          <img src="/Logo.png" alt="Logo" style={{ height: "40px", marginRight: "10px" }} />
          <h3>Corona Real</h3>
        </Box>
      </Toolbar>
      <List>
        <ListItem button component={Link} to="/home">
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/rooms">
          <ListItemText primary="Habitaciones" />
        </ListItem>
        <ListItem button component={Link} to="/products">
          <ListItemText primary="Productos" />
        </ListItem>
        <ListItem button component={Link} to="/person">
          <ListItemText primary="Personas" />
        </ListItem>
        {/* <ListItem button component={Link} to="/company">
          <ListItemText primary="Company" />
        </ListItem> */}
        <ListItem button component={Link} to="/cash_register">
          <ListItemText primary="Billeteras" />
        </ListItem>
        <ListItem button component={Link} to="/register">
          <ListItemText primary="Usuarios" />
        </ListItem>
        <ListItem button component={Link} to="/notes">
          <ListItemText primary="Notes" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
