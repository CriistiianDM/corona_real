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
import AddNewCashRegister from "../components/CashRegister/Menu"
import ListCashRegister from "../components/CashRegister/ListItems"
import BoxPrimary from "../components/Share/BoxPrimary.jsx"

/** Cash Register */
export default function (props) {
  return (
      <React.Fragment>
          <ContainerPrimary />
      </React.Fragment>
  )
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
    <BoxPrimary>
      <Grid2 sx={styles.containerPrimary}>
        <ActionsForms {...{ ...global, handlers}} />
        <ListCashRegister {...{ ...global, handlers}} />
      </Grid2>
    </BoxPrimary>
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