import React from "react";

// Styles
import styles from "../../css/jscss/root";

// Material UI
import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom"; // Importar Link para navegación

// Icons Local
import cashRegisterlogo from "../../assets/icons/cashRegister.png";
import edit from "../../assets/icons/edit.png";

// Names mapping for type_cash_register
const names = {
  "1": "Facturados",
  "2": "Secundaria",
  "3": "Productos",
};

export default function ListItems({ list }) {
  return (
    <section>
        {list.map((element, index) => (
            <Card>
              <CardContent>
                <Grid>
                  <img
                    src={cashRegisterlogo}
                    alt="cash register logo"
                  />
                </Grid>
                <Typography variant="h6" gutterBottom>
                  {names[element.type_cash_register]}
                </Typography>

                <Typography variant="body1" color="textSecondary">
                  Balance: ${element.cash_balance}
                </Typography>

                <Link
                  to={`/cash_register/${element.id}`} // Redirige a la página de detalles
                  style={{ textDecoration: "none" }}
                >
                  <Button sx={{ width: '100%',marginTop: 2 }}>
                    <Grid container alignItems="center">
                      <img
                        src={edit}
                        alt="edit"
                        style={{ width: "20px", height: "20px", marginRight: "5px" }}
                      />
                      Ver Detalles
                    </Grid>
                  </Button>
                </Link>
              </CardContent>
            </Card>
        ))}
    </section>
  );
}
