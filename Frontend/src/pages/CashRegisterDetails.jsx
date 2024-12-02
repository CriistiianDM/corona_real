import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Typography, Grid, Card, CardContent, Button, Drawer, Box, TextField } from "@mui/material";
import { getTransactionsByCashRegisterId, getCashRegisterById, putCashRegister, postTransaction } from "../tools/api/transaction/api";
import AlertService from "./utils/AlertService";

// Componets
import BoxPrimary from "../components/Share/BoxPrimary.jsx"

const CashRegisterDetails = () => {
  const { id } = useParams(); // Obtiene el ID de la caja registradora desde la URL
  const navigate = useNavigate();
  const [deductionDescription, setDeductionDescription] = useState(""); // Descripción de la resta
  const [transactions, setTransactions] = useState([]);
  const [cashBalance, setCashBalance] = useState(null); // Almacena el balance actual de la caja
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // Controla el estado del Drawer
  const [deductionAmount, setDeductionAmount] = useState(""); // Almacena el valor a restar

  // Manejar la resta
  const handleDeduction = async () => {
    try {
      if (!deductionAmount || isNaN(deductionAmount) || deductionAmount <= 0) {
        AlertService.warning("Por favor, ingresa un valor válido.", "Advertencia", "top-start");
        return;
      }
  
      // Obtener la caja registradora
      const cashRegister = await getCashRegisterById(id);
      if (!cashRegister?.id) {
        AlertService.error("No se pudo obtener la caja registradora.", "Error", "top-start");
        return;
      }
  
      // Determinar el tipo de transacción según el ID de la caja
      const typeTransaction = cashRegister.id === 2 ? 1 : 2;
  
      // Calcular el nuevo balance
      const newBalance = cashRegister.cash_balance - parseFloat(deductionAmount);
      if (newBalance < 0) {
        AlertService.warning("El balance no puede ser negativo.", "Advertencia", "top-start");
        return;
      }
  
      // Actualizar el balance de la caja registradora
      const updateResponse = await putCashRegister({
        id: cashRegister.id,
        data: { ...cashRegister, cash_balance: newBalance },
      });
  
      if (!updateResponse?.id) {
        AlertService.error("No se pudo actualizar el balance de la caja.", "Error", "top-start");
        return;
      }
  
      // Crear la transacción de resta
      const transactionResponse = await postTransaction({
        data: {
          type_transaction: typeTransaction, // Asignado dinámicamente
          cash_register: cashRegister.id,
          description: deductionDescription, // Descripción ingresada
          value: parseFloat(deductionAmount),
        },
      });
  
      if (!transactionResponse?.id) {
        AlertService.error("No se pudo registrar la transacción.", "Error", "top-start");
        return;
      }
  
      // Éxito
      AlertService.success("Resta aplicada y transacción registrada con éxito.", "Éxito", "top-start");
      setIsDrawerOpen(false);
      setDeductionAmount(""); // Resetea el valor
      setDeductionDescription(""); // Resetea la descripción
      await fetchTransactions(); // Refresca las transacciones
      await fetchCashBalance();  // Refresca el balance actual
    } catch (error) {
      console.error("Error al restar a la caja:", error);
      AlertService.error("Error al restar a la caja.", "Error", "top-start");
    }
  };
  
  

  // Obtener las transacciones
  const fetchTransactions = async () => {
    try {
      const response = await getTransactionsByCashRegisterId(id); // Llama a la API
      setTransactions(response || []); // Establece las transacciones
    } catch (error) {
      console.error("Error al cargar las transacciones:", error);
      const errorMessage = error.response?.data?.message || error.message || "Error al cargar las transacciones.";
      AlertService.error(errorMessage, "Error", "top-start");
    }
  };

  const fetchCashBalance = async () => {
    try {
      const cashRegister = await getCashRegisterById(id);
      if (cashRegister?.id) {
        setCashBalance(cashRegister.cash_balance);
      }
    } catch (error) {
      console.error("Error al cargar el balance de la caja:", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
    fetchCashBalance();
  }, [id]);

  return (
    <BoxPrimary
  title={
    <Typography variant="h5" sx={{ display: "inline" }}>
      {`Transacciones para la Caja ${id} `}
      <Typography
        variant="h5"
        component="span"
        sx={{ color: "#000000", fontWeight: "bold" }} // Cambia el color y estilo
      >
        {`- Balance actual: $${cashBalance !== null ? cashBalance.toLocaleString() : "Cargando..."}`}
      </Typography>
    </Typography>
  }
>
      {transactions.length > 0 ? (
        <Grid container spacing={2}>
          {transactions.map((transaction, index) => (
            <Grid item xs={12} sm={6} md={4} key={transaction.id || index}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Transacción #{transaction.id}</Typography>
                  <Typography variant="body2">
                    Tipo: {transaction.type_transaction === 1 ? "Venta" : transaction.type_transaction === 2 ? "Compra o pago" : "Otro"}
                  </Typography>
                  <Typography variant="body2">Valor: ${transaction.value}</Typography>
                  <Typography variant="body2">
                    Fecha: {new Date(transaction.create_at).toLocaleString("es-ES", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </Typography>
                  <Typography variant="body2">Descripción: {transaction.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1" color="textSecondary">
          No se encontraron transacciones para esta caja registradora.
        </Typography>
      )}

      {/* Botón para abrir el Drawer */}
      <Button
        variant="contained"
        color="error"
        sx={{
          fontWeight: "bold",
          padding: "10px 20px",
          marginTop: "20px",
          "&:hover": {
            backgroundColor: "#b71c1c", // Rojo más oscuro
          },
        }}
        onClick={() => setIsDrawerOpen(true)}
      >
        Restar a la Caja
      </Button>

      {/* Drawer para restar */}
      <Drawer anchor="right" open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <Box sx={{ width: 300, padding: 2 }}>
          <Typography variant="h6" gutterBottom>
            Restar a la Caja
          </Typography>
          <TextField
            label="Valor a Restar"
            type="number"
            value={deductionAmount}
            onChange={(e) => setDeductionAmount(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Descripción"
            value={deductionDescription}
            onChange={(e) => setDeductionDescription(e.target.value)}
            fullWidth
            margin="normal"
            multiline
            rows={3}
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={handleDeduction}
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Confirmar Resta
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setIsDrawerOpen(false)}
            fullWidth
            sx={{ marginTop: 1 }}
          >
            Cancelar
          </Button>
        </Box>
      </Drawer>
      </BoxPrimary>
  );
};

export default CashRegisterDetails;
