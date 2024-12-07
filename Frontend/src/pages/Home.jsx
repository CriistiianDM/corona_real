// React
import React from 'react';
import { useNavigate, Link } from "react-router-dom";

// Material IU
import { Button, Menu , MenuItem , Grid2, Box, Avatar  } from "@mui/material"
import ListItemIcon from '@mui/material/ListItemIcon'

// Icons Material
import WeekendIcon from '@mui/icons-material/Weekend';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import BusinessIcon from '@mui/icons-material/Business';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

// Components
import For from "../components/For/For"
import BoxPrimary from "../components/Share/BoxPrimary.jsx"

// Styles
import styles from "../css/jscss/root"
import { BookOnline } from '@mui/icons-material';

const routes = [
  { to: "/rooms", name: "Habitaciones", icon: <WeekendIcon /> },
  { to: "/products", name: "Productos", icon: <ProductionQuantityLimitsIcon /> },
  { to: "/person", name: "Personas", icon: <PeopleAltIcon /> },
  // { to: "/company", name: "Company", icon: <BusinessIcon /> },
  { to: "/cash_register", name: "Billeteras", icon: <MonetizationOnIcon /> },
  { to: "/register", name: "Usuarios", icon: <PersonAddIcon /> },
  { to: "/notes", name: "Notes", icon: <BookOnline /> }
]

export default function () {
  return (
      <React.Fragment>
          <ContainerPrimary />
      </React.Fragment>
  )
}

/** BODY */
const ContainerPrimary = () => {
  return (
    <BoxPrimary title={"Panel de Control"}>
      <Box sx={styles.containerFixedHome}>
        <For func={listOptions} list={routes} />
      </Box>
    </BoxPrimary>
  )
}

const listOptions = (element, index) => {
  const navigate = useNavigate()

  const onHandlerCLick = (route) => {
      navigate(element.to)
  }

  return (
    <Box onClick={onHandlerCLick} sx={styles.containerBoxHome} key={index}>
        <ListItemIcon>
            {element.icon}
        </ListItemIcon>
        <span>{element.name}</span>
    </Box>
  )
}