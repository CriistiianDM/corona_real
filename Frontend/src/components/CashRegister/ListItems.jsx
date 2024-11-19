import React from "react"

// Styles
import styles from "../../css/jscss/root"

// Material IU
import { Button, Card, CardContent, Grid2, Typography } from "@mui/material";

// Icons Local
import cashRegisterlogo from "../../assets/icons/cashRegister.png"
import edit from "../../assets/icons/edit.png"

// Components
import For from "../For/For"

const names = {
    "1": "Facturados",
    "2": "Secundaria",
    "3": "Productos"
}

export default function({ list }) {
    return (
       <section>
           <For func={cardCashRegister} list={list} />
       </section>
    )
 }
 
const cardCashRegister = (element, index) => {
   return (
     <Grid2 key={index}>
       <Card sx={{ margin: 2, padding: 2 }}>
         <CardContent>
            <Grid2>
                <img src={cashRegisterlogo} alt="a" />
            </Grid2>
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
            <Grid2>
                <img src={edit} alt="a" />
            </Grid2>
           </Button>
         </CardContent>
       </Card>
     </Grid2>
   )
}