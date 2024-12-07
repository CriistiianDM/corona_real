import React from "react"
import { useNavigate, useLocation } from "react-router-dom";

// Styles
import styles from "../../css/jscss/root"

// Material IU
import { Button, Menu , MenuItem , Grid2, Box, Avatar  } from "@mui/material"
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import PersonAddIcon from '@mui/icons-material/PersonAdd';

// Client Data
import { getData } from "../../tools/utils/utils"
import { removeUserData } from "../../tools/indexedDB/indexedDB";

// Icons Material
import HomeIcon from '@mui/icons-material/Home';
import WeekendIcon from '@mui/icons-material/Weekend';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import BusinessIcon from '@mui/icons-material/Business';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { BookOnline } from "@mui/icons-material";

export default function () {
    return (
        <React.Fragment>
            <ContainerPrimary />
        </React.Fragment>
    )
}

/** BODY */
const ContainerPrimary = () => {
    const [open, setOpen] = React.useState()
    const [user, setUser] = React.useState(null)
    const handler = handlersFunc({...{setOpen, setUser, user}})
    const propsGeneral = {setOpen,open,user,...handler}

    React.useEffect(() => handler.useEffect, [])

    return (
      <Box sx={styles.containerHeader}>
        <Button variant="contained" onClick={handler.openHamburger}>
            <img src="/icons/menu.png"/>
        </Button>
        <TemporaryDrawer {...propsGeneral} />
        <MenuUser {...propsGeneral} />
     </Box>
    )
}

const handlersFunc = (props) => {
    const {
        setOpen,
        setUser,
        user
    } = props

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen)
    }

    const openHamburger = () => setOpen(true)

    const useEffect = async () => {
        if (user !== null) return
        const dataUser = await getData()
        setUser(dataUser?.user_data)
    }

    return {
        toggleDrawer: toggleDrawer,
        openHamburger: openHamburger,
        useEffect: useEffect
    }
}

const MenuUser = ({ user }) => {
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl)
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCloseSession = () => {
        removeUserData()
        navigate("/")
    }
  
    return (
      <div>
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
         <Avatar>{(user?.name ?? "").charAt(0)}</Avatar>
        </Button>
        <Menu
          id="basic-menu"
          sx={styles.toogleMenuUser}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <h2 styles="text-aling: center;">{user?.name}</h2>
          <MenuItem onClick={handleCloseSession}>Cerrar Sesión</MenuItem>
        </Menu>
      </div>
    )
}

const TemporaryDrawer = ({ open, setOpen, toggleDrawer }) =>  {
    const navigate = useNavigate()
    const location = useLocation();
    const [activeRoute, setActiveRoute] = React.useState(location.pathname);
    const routes = [
        { to: "/home", name: "Home", icon: <HomeIcon /> },
        { to: "/rooms", name: "Habitaciones", icon: <WeekendIcon /> },
        { to: "/products", name: "Productos", icon: <ProductionQuantityLimitsIcon /> },
        { to: "/person", name: "Personas", icon: <PeopleAltIcon /> },
        //{ to: "/company", name: "Company", icon: <BusinessIcon /> },
        { to: "/cash_register", name: "Billeteras", icon: <MonetizationOnIcon /> },
        { to: "/register", name: "Usuarios", icon: < PersonAddIcon/> },
        { to: "/notes", name: "Notas", icon: <BookOnline/> },
    ];

    const goToPage = (route: string) => {
        setActiveRoute(route);
        navigate(route)
    }

    const DrawerList = (
      <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
        <List>
          {routes.map((text, index) => (
            <ListItem key={index} disablePadding selected={activeRoute === text.to}>
              <ListItemButton onClick={() => goToPage(text.to)}>
                <ListItemIcon>
                    {text.icon}
                </ListItemIcon>
                <ListItemText primary={text.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    )
  
    return (
      <div>
        <Drawer 
          open={open} 
          onClose={toggleDrawer(false)}
          sx={{
            '& .MuiPaper-root': {
              background: '#FFFEEE'
            }
          }}>
          {DrawerList}
        </Drawer>
      </div>
    )
}