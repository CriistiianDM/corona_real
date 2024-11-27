// React
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AlertService from "./utils/AlertService";

// Material - IU
import { Box, Button, TextField, Typography, Grid2 } from "@mui/material";
import Alert from '@mui/material/Alert';

// Componets
import { Login as LoginUser } from "../tools/api/person/api";

// Fecths
import { saveUserData } from "../tools/indexedDB/indexedDB";

// Styles
import styles from "../css/jscss/root"

export default function (params) {
  return (
    <React.Fragment>
        <ContainerPrimary />
    </React.Fragment>
  )
}

/** BODY */
const ContainerPrimary = () => {
  const navigate = useNavigate()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handlers = handlersFunc({...{navigate, setError, setLoading, setSuccess}})
  
  return (
    <Box sx={styles.containerLogin}>
      <section> <FormLogin {...{...handlers, loading, error, success}} /> </section>
      <section>
        <PanelInfo />
      </section>
    </Box>
  )
}

/** Handlers Func */
const handlersFunc = (props) => {
  const {
    navigate,
    setError,
    setLoading,
    setSuccess
  } = props

  const handleLogin = async (event) => {
      event.preventDefault();

      setLoading(true)
      const formData = new FormData(event.target);
      const credentials = {
        username: formData.get("username"),
        password: formData.get("password"),
      };

      const response = await LoginUser(credentials)
      if (response.token) {
        saveUserData(response)
        AlertService.success("Credenciales válidas");
        navigate('/home')
      } else {
        setSuccess(true)
        // setError("Credenciales incorrectas")
        AlertService.error("Credenciales incorrectas");
      }

      setTimeout(() => {
        setLoading(false)
        setSuccess(false)
      }, 2000);
  }

  return {
    handleLogin: handleLogin
  }
}

const FormLogin = (props) => {
    const { handleLogin, loading, error, success } = props 
    return (
      <form onSubmit={handleLogin}>
        <Grid2>
          <img src="/Logo.png" />
        </Grid2>
        <TextField
          id="username-field"
          name="username"
          label="Nombre de Usuario"
          aria-label="Nombre de Usuario"
          fullWidth
          margin="normal"
          disabled={loading}
          required
        />
        <TextField
          id="password-field"
          name="password"
          label="Contraseña"
          aria-label="Contraseña"
          type="password"
          fullWidth
          margin="normal"
          required
          disabled={loading}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
          aria-label="Botón para iniciar sesión"
          disabled={loading}
        >
          {!loading? "Iniciar Sesión" : "Iniciando Sesion..." }
        </Button>
        {
          success &&
          <Grid2 sx={{ marginTop: "10px" }}>
            <Alert severity="error">{error}</Alert>
          </Grid2>
        }
      </form>
    )
}

const PanelInfo = () => {
  return (
    <Box sx={styles.containerPanelLogin}>
       <video width="100%" height="100%" autoPlay muted loop>
        <source src="/videos/fondo.mp4" type="video/mp4" />
        Tu navegador no soporta el elemento <code>video</code>
      </video>
    </Box>
  )
}