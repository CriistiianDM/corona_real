import React from "react";
import { Drawer, List, ListItem, ListItemText, Toolbar } from "@mui/material";
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
      <Toolbar />
      <List>
        <ListItem button component={Link} to="/">
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/rooms">
          <ListItemText primary="Habitaciones" />
        </ListItem>
        <ListItem button component={Link} to="/products">
          <ListItemText primary="Productos" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
