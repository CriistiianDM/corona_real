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
  const [transactions, setTransactions] = useState([]);
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

      if (response?.id) {
        AlertService.success("Resta aplicada con éxito.", "Éxito", "top-start");
        setIsDrawerOpen(false);
        setDeductionAmount(""); // Resetea el valor
        fetchTransactions(); // Refrescar transacciones
      } else {
        AlertService.error("No se pudo aplicar la resta.", "Error", "top-start");
      }
  
      // Crear la transacción de resta
      const transactionResponse = await postTransaction({
        data: {
          type_transaction: typeTransaction, // Asignado dinámicamente
          cash_register: cashRegister.id,
          description: `Resta manual aplicada en la caja ${cashRegister.id}`,
          value: parseFloat(deductionAmount),
        },
      });
  
      if (!transactionResponse?.id) {
        alert("No se pudo registrar la transacción.");
        return;
      }
  
      alert("Resta aplicada y transacción registrada con éxito.");
      setIsDrawerOpen(false);
      setDeductionAmount(""); // Resetea el valor
      fetchTransactions(); // Refresca las transacciones
    } catch (error) {
      console.error("Error al restar a la caja:", error);
      AlertService.error("Error al restar a la caja:", "Error", "top-start");
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

  useEffect(() => {
    fetchTransactions();
  }, [id]);

  return (
    <BoxPrimary title={`Transacciones para la Caja ${id}`}>
      {transactions.length > 0 ? (
        <Grid container spacing={2}>
          {transactions.map((transaction, index) => (
            <Grid item xs={12} sm={6} md={4} key={transaction.id || index}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Transacción #{transaction.id}</Typography>
                  <Typography variant="body2">
                    Tipo: {transaction.type_transaction === 1 ? "Venta" : transaction.type_transaction === 2 ? "Compra" : "Otro"}
                  </Typography>
                  <Typography variant="body2">Valor: ${transaction.value}</Typography>
                  <Typography variant="body2">Fecha: {new Date(transaction.date).toLocaleString()}</Typography>
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
        variant="outlined"
        color="secondary"
        sx={{ marginTop: 2 }}
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
