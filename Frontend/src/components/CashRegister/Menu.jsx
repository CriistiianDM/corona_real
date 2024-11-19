import React from "react"

// Styles
import styles from "../../css/jscss/root"

// Material IU
import { Button, TextField, Drawer, Box, MenuItem } from "@mui/material";

export default function ({ openModal, isLoadSave, handlers }) {
    const [formValues, setFormValues] = React.useState({
      type_cash_register: "",
      cash_balance: "",
      note: "",
    });
  
    const handler = handlersFunc({...{ formValues, setFormValues, handlers }})

    return (
      <Drawer sx={styles.drawer} anchor="right" open={openModal} onClose={handlers.closeModal}>
        <Box>
          <h2>Crear Caja Registradora</h2>
          <form onSubmit={handler.handleSubmit}>
            <TextField
              label="Tipo de Registro"
              name="type_cash_register"
              select
              fullWidth
              margin="normal"
              value={formValues.type_cash_register}
              onChange={handler.handleChange}
            >
              <MenuItem value="1">Facturados</MenuItem>
              <MenuItem value="2">Secundaria</MenuItem>
              <MenuItem value="3">Productos</MenuItem>
            </TextField>
  
            <TextField
              label="Balance de Caja"
              name="cash_balance"
              type="number"
              fullWidth
              margin="normal"
              value={formValues.cash_balance}
              onChange={handler.handleChange}
              inputProps={{ step: "0.01" }}
            />
  
            <TextField
              label="Nota"
              name="note"
              multiline
              rows={4}
              fullWidth
              margin="normal"
              value={formValues.note}
              onChange={handler.handleChange}
            />
  
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              {
                !isLoadSave? 'Crear Registro': 'Creando...'
              }
            </Button>
          </form>
        </Box>
      </Drawer>
    )
}

const handlersFunc = (props) => {
    const {
        formValues,
        setFormValues,
        handlers
    } = props

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        handlers.loadForm()
        const res = await handlers.createCashRegister(formValues)
    
        if (res.id) {
          alert("Creacion Exitosa")
          handlers.updateList()
          handlers.closeModal()
        } else {
          alert("Error Al Crear")
        }
    
        // Quitar Load
        setTimeout(() => {
          handlers.loadForm()
        }, (600));
    };

    return {
        handleChange: handleChange,
        handleSubmit: handleSubmit
    }
}