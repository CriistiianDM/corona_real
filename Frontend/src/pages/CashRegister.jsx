import React from "react"

// Styles
import styles from "../css/jscss/root"

// Fetchs
import { getCashRegister,postCashRegister } from "../tools/api/transaction/api";

// Material IU
import { Grid2, Button, TextField, Typography, Fab, Card, CardContent, Drawer, Box, MenuItem } from "@mui/material";

// Iconst Material IU
import AddIcon from "@mui/icons-material/Add";

// Components
import For from "../components/For/For"

/** TODO: Me Falta separarlo en componentes!!!!! */
export default function (props) {
  return (
      <React.Fragment>
          <ContainerPrimary />
      </React.Fragment>
  )
}

const handlersFunc = (props) => {
  const {
    openModal,
    isLoadSave,
    setGlobal
  } = props

  const closeModal = () => setGlobal((prev) => ({
     ...prev,
     openModal: !openModal
  }))

  const loadForm = () => setGlobal((prev) => ({
    ...prev,
    isLoadSave: !isLoadSave
 }))

  const createCashRegister = async (data) => {
    const response = await postCashRegister({
       data: data
    })
    return response
  }

  const listCashRegister = async (data) => {
    const response = await getCashRegister()
    setGlobal((prev) => ({
      ...prev,
      list: response
   }))  
  }

  const updateList = () => {
    setGlobal((prev) => ({
      ...prev,
      update: new Date(Date.now())
   }))  
  }
  
  return {
    closeModal: closeModal,
    createCashRegister: createCashRegister,
    loadForm: loadForm,
    listCashRegister: listCashRegister,
    updateList: updateList
  }
}

/** BODY */
const ContainerPrimary = () => {
   const [ global , setGlobal ] = React.useState({
      openModal: false,
      isLoadSave: false,
      list: [],
      update: null
   })
   const handlers = handlersFunc({...{ ...global, setGlobal }})

   React.useEffect(() => {
    handlers.listCashRegister()
   }, [global.update])

   return (
      <Grid2 sx={styles.containerPrimary}>
        <ActionsForms {...{ ...global, handlers}} />
        <ListCashRegister {...{ ...global, handlers}} />
      </Grid2>
   )
}


/** Actions FORMS */
const ActionsForms = (props) => {
  const { handlers } = props

  return (
    <section>
      <AddNewCashRegister {...props} />
      <Fab aria-label="add" onClick={handlers.closeModal}>
        <AddIcon />
      </Fab>
    </section>
  )
}

const ListCashRegister = ({ list }) => {
   return (
      <section>
          <For func={cardCashRegister} list={list} />
      </section>
   )
}

const cardCashRegister = (element, index) => {
  const names = {
    "1": "Facturados",
    "2": "Secundaria",
    "3": "Productos"
  }
  return (
    <Grid2>
      <Card sx={{ margin: 2, padding: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {names[element.type_cash_register]}
          </Typography>

          <Typography variant="body1" color="textSecondary">
            Balance: ${element.cash_balance}
          </Typography>

          <Button
            variant="outlined"
            color="primary"
            sx={{ marginTop: 2 }}
          >
            Editar
          </Button>
        </CardContent>
      </Card>
    </Grid2>
  )
}

const AddNewCashRegister = ({ openModal, isLoadSave, handlers }) => {
  const [formValues, setFormValues] = React.useState({
    type_cash_register: "",
    cash_balance: "",
    note: "",
  });

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

  return (
    <Drawer sx={styles.drawer} anchor="right" open={openModal} onClose={handlers.closeModal}>
      <Box>
        <h2>Crear Registro de Caja</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Tipo de Registro"
            name="type_cash_register"
            select
            fullWidth
            margin="normal"
            value={formValues.type_cash_register}
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
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