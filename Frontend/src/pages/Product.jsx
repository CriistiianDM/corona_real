import React, { useState, useEffect } from "react";
import { Grid, Card, CardContent, Typography, Button, Drawer, TextField, Box, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { getProducts, createProduct, updateProduct, createSellerProduct} from "../tools/api/inventory/api";
import { getData } from "../tools/utils/utils";

// Componets
import BoxPrimary from "../components/Share/BoxPrimary.jsx"

// Styles
import styles from "../css/jscss/root"

const Product = () => {
  const [products, setProducts] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [transactionType, setTransactionType] = useState(""); // "compra", "venta", "obsolescencia"
  const [transactionAmount, setTransactionAmount] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [Updateproducts, setUpdateProducts] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [transactionCost, setTransactionCost] = useState(0);


  const openEditDrawer = (product) => {
    setEditingProduct(product);
    setNewProduct({
      name: product.name,
      stock: product.stock,
      price: product.price,
      is_active: product.is_active,
      update_by: product.update_by,
      image_url: product.image_url || "",
    });
    setIsNewProductDrawerOpen(true);
  };

  const [isNewProductDrawerOpen, setIsNewProductDrawerOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    stock: 0,
    price: 0,
    is_active: true,
    update_by: 1, 
    // image_url: "", 
});

  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.log("Error al cargar productos:", error);
      }
    };

    fetchProducts();
  }, [Updateproducts]);

  const openDrawer = (product, type) => {
    setSelectedProduct(product);
    setTransactionType(type);
    setTransactionAmount(1);
    setErrorMessage("");
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setSelectedProduct(null);
    setTransactionType("");
    setTransactionAmount(1);
    setTransactionCost(0); // Resetea el costo
    setIsDrawerOpen(false);
  };
  

  const handleSellerProduct = async () => {
    try {
      if (!selectedProduct || !transactionType) {
        alert("Por favor, selecciona un producto y un tipo de transacción.");
        return;
      }
  
      // Delegar a funciones específicas según el tipo de transacción
      if (transactionType === "obsolescencia") {
        await handleObsolescence(); // Llama a la lógica de obsolescencia
      } else {
        await handleSell(); // Llama a la lógica para compra/venta
      }
  
      closeDrawer(); // Cierra el Drawer después de completar la acción
    } catch (error) {
      console.error("Error en handleSellerProduct:", error);
      alert("Ocurrió un error al procesar la transacción.");
    }
  };

  const handleObsolescence = async () => {
    const updatedProduct = {
      ...selectedProduct, // Copia los datos actuales del producto seleccionado
      stock: Math.max(0, selectedProduct.stock - transactionAmount), // Reduce el stock pero no permite valores negativos
    };
  
    try {
      // Actualiza el producto en el backend
      await updateProduct(selectedProduct.id, updatedProduct);
  
      // Recarga los productos desde el backend para mantener sincronización
      const updatedProducts = await getProducts();
      setProducts(updatedProducts); // Sincroniza el estado del frontend con el backend
    } catch (error) {
      console.error("Error al realizar la transacción:", error);
    }
  
    closeDrawer(); // Cierra el Drawer después de la operación
  };

  

  // // opcion 1
  // const handleSell = async () => {
  //   try {
  //     if (!selectedProduct || !transactionType) {
  //       alert("Por favor, selecciona un producto y un tipo de transacción.");
  //       return;
  //     }
  
  //     const dbClient = await getData() ?? {} // Obtén el usuario actual desde el almacenamiento
  //     if (!dbClient?.user_data) {
  //       alert("No se pudo obtener la información del usuario.");
  //       return;
  //     }
  
  //     // Calcula el nuevo stock según el tipo de transacción
  //     const newStock =
  //       transactionType === "compra"
  //         ? selectedProduct.stock + transactionAmount
  //         : Math.max(0, selectedProduct.stock - transactionAmount);
  
  //     // Crea una copia del producto seleccionado y actualiza solo el stock
  //     const updatedProduct = {
  //       ...selectedProduct,
  //       stock: newStock,
  //     };
  
  //     // Prepara los datos para la transacción
  //     const dataSend = {
  //       data_product: updatedProduct,
  //       data_user: dbClient.user_data, // Usuario que realiza la operación
  //       data_transactions: {
  //         value: transactionAmount * selectedProduct.price, // Calcula el valor de la transacción
  //       },
  //     };
  
  //     // Llama a la API con los datos
  //     const response = await createSellerProduct({ data: dataSend });
  
  //     if (response?.success) {
  //       alert("Transacción completada con éxito");
  //       const updatedProducts = await getProducts(); // Refresca los productos
  //       setProducts(updatedProducts);
  //       closeDrawer();
  //     } else {
  //       alert("No se pudo completar la transacción.");
  //     }
  //   } catch (error) {
  //     console.error("Error al realizar la transacción:", error);
  //     alert("Error al realizar la transacción.");
  //   }
  // };
  const handleSell = async () => {
    try {
      if (!selectedProduct || !transactionType) {
        alert("Por favor, selecciona un producto y un tipo de transacción.");
        return;
      }
  
      const dbClient = await getData(); // Obtener datos del usuario desde el almacenamiento local
      if (!dbClient?.user_data) {
        alert("No se pudo obtener la información del usuario.");
        return;
      }
  
      // Calcular el nuevo stock
      const newStock =
        transactionType === "compra"
          ? selectedProduct.stock + transactionAmount
          : Math.max(0, selectedProduct.stock - transactionAmount);
  
      // Calcular el valor de la transacción
      const transactionValue =
        transactionType === "compra"
          ? transactionCost // Valor ingresado en el frontend para compras
          : transactionAmount * selectedProduct.price; // Precio del producto en ventas
  
      // Preparar los datos a enviar
      const dataSend = {
        data_product: {
          ...selectedProduct,
          stock: newStock, // Actualiza el stock
        },
        data_transactions: {
          type_transaction: transactionType === "compra" ? 2 : 1, // 2: Compra, 1: Venta
          value: transactionValue, // Valor de la transacción calculado
          amount: transactionAmount, // Cantidad transaccionada
          user_id: dbClient.user_data.id, // ID del usuario que realiza la operación
        },
      };
  
      // Llamar a `createSellerProduct` para manejar la lógica completa
      const response = await createSellerProduct({ data: dataSend });
  
      if (response?.success) {
        alert("Transacción completada con éxito.");
        const updatedProducts = await getProducts(); // Refrescar la lista de productos
        setProducts(updatedProducts);
        closeDrawer(); // Cerrar el Drawer
      } else {
        alert("No se pudo completar la transacción.");
      }
    } catch (error) {
      console.error("Error al realizar la transacción:", error);
      alert("Error al realizar la transacción.");
    }
  };
  
  
  
  
  const handleAmountChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value, 10));
    if ((transactionType === "venta" || transactionType === "obsolescencia") && value > selectedProduct.stock) {
      setErrorMessage("No hay stock suficiente para realizar la operación");
      setTransactionAmount(selectedProduct.stock);
    } else {
      setErrorMessage("");
      setTransactionAmount(value);
    }
  };

  const saveProduct = async () => {
    try {
      if (editingProduct) {
        // Incluye todos los campos necesarios, conservando los datos originales
        const updatedProduct = {
          ...editingProduct, // Conserva los datos originales del producto
          name: newProduct.name, // Actualiza el nombre
          price: newProduct.price, // Actualiza el precio
        };
  
        console.log("Datos enviados al backend:", updatedProduct);
  
        // Llama a la función `updateProduct` para enviar la solicitud PUT al backend
        await updateProduct(editingProduct.id, updatedProduct);
      } else {
        // Crear un nuevo producto
        await createProduct(newProduct);
      }
  
      // Obtén la lista actualizada de productos después de la operación
      const updatedProducts = await getProducts();
      setProducts(updatedProducts);
  
      closeNewProductDrawer(); // Cierra el Drawer después de guardar
    } catch (error) {
      console.error("Error al guardar producto:", error);
    }
  };
  
  const closeNewProductDrawer = () => {
    setIsNewProductDrawerOpen(false);
    setEditingProduct(null); // Salir del modo edición
    setNewProduct({
      name: "",
      stock: 0,
      price: 0,
      is_active: true,
      update_by: 1,
      image_url: "",
    });
  };

  const handleNewProductChange = (field, value) => {
    setNewProduct((prevProduct) => ({
        ...prevProduct,
        [field]: field === "stock" || field === "price" || field === "type_product" || field === "update_by"
            ? parseInt(value, 10) || 0 // Asegura que campos numéricos nunca tengan NaN, usa 0 por defecto
            : value, // Para otros campos como strings, pasa el valor directamente
    }));
};


  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      setNewProduct({ ...newProduct, imageUrl });
    }
  };

  return (
    <BoxPrimary title={"Productos"}>
    <div style={{ width: '100%' }}>
      <Grid container spacing={3} style={{ flex: 1 }}>
        {products?.length>0 && products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: 1,
                textAlign: "center",
                height: "100%",
                background: "#f8f9fb",
                maxWidth: 300,
                margin: 'auto'
              }}
            >
              <Box
                className="image-container"
                sx={{
                  width: "100%",
                  maxHeight: 200,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img
                  src={"/Products.avif"}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    maxHeight: 150,
                  }}
                />
              </Box>
              <CardContent sx={{ width: "100%", padding: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                  {product.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Cantidad: {product.stock}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Precio: ${product.price}
                </Typography>
              </CardContent>
              <Box display="flex" flexDirection="column" justifyContent="space-around" width="100%" sx={{ padding: 1 }}>
              <Button variant="contained" color="secondary" sx={{ flex: 1, marginBottom: 1, background: '#79665a' }} onClick={() => openDrawer(product, "venta")}>
                  Venta
                </Button>
                <Button variant="contained" color="primary" sx={{ flex: 1, marginBottom: 1, background: '#a58f80' }} onClick={() => openDrawer(product, "compra")}>
                  Compra
                </Button>
                <Button variant="contained" color="warning" sx={{ flex: 1, marginBottom: 1, background: '#897373cf' }} onClick={() => openDrawer(product, "obsolescencia")}>
                  Obsolescencia
                </Button>
                <Button variant="contained" color="info" sx={{ flex: 1, marginBottom: 1, background: '#9e9e9e' }} onClick={() => openEditDrawer(product)}>
                  Editar
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Drawer para Transacciones */}
      <Drawer 
        anchor="right" 
        open={isDrawerOpen}
        onClose={closeDrawer}
        sx={{
          '& .MuiPaper-root': {
            background: '#FFFEEE'
          }
        }}
        >
        <Box sx={{ width: 300, padding: 3, marginTop: 10 }}>
          <Typography variant="h5" gutterBottom>
            {transactionType === "compra"
              ? "¿Cuántos desea comprar y a qué costo?"
              : "¿Cuántos desea vender?"}
          </Typography>

          <TextField
            label="Cantidad"
            type="number"
            value={transactionAmount}
            onChange={handleAmountChange}
            fullWidth
            margin="normal"
            error={!!errorMessage}
            helperText={errorMessage}
          />

          {transactionType === "compra" && (
            <TextField
              label="Costo Total de la Compra"
              type="number"
              value={transactionCost} // Estado adicional para el costo
              onChange={(e) => setTransactionCost(Number(e.target.value))}
              fullWidth
              margin="normal"
              error={!transactionCost || transactionCost <= 0}
              helperText={!transactionCost ? "El costo es obligatorio" : ""}
            />
          )}

          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button sx={{ color: '#320001', background: '#dad0d0', border: '1px solid #320001'}} variant="outlined" onClick={closeDrawer}>
              Cancelar
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSellerProduct}
              sx={{ color: '#fff', background: '#320001'}}
              disabled={transactionType === "compra" && (!transactionCost || transactionCost <= 0)}
            >
              Aceptar
            </Button>
          </Box>
        </Box>
      </Drawer>


      {/* Drawer para agregar producto */}
      <Drawer 
        anchor="right" 
        open={isNewProductDrawerOpen} 
        onClose={closeNewProductDrawer}
        sx={{
          '& .MuiPaper-root': {
            background: '#FFFEEE'
          }
        }}
        >
        <Box sx={{ width: 300, padding: 3, marginTop: 10 }}>
          <Typography variant="h5" gutterBottom>
            {editingProduct ? "Editar Producto" : "Agregar Producto"}
          </Typography>
          <TextField
            label="Nombre"
            value={newProduct.name}
            onChange={(e) => handleNewProductChange("name", e.target.value)}
            fullWidth
            margin="normal"
          />
          {!editingProduct && (
            <TextField
              label="Stock"
              type="number"
              value={newProduct.stock}
              onChange={(e) => handleNewProductChange("stock", e.target.value)}
              fullWidth
              margin="normal"
            />
          )}
          <TextField
            label="Precio"
            type="number"
            value={newProduct.price}
            onChange={(e) => handleNewProductChange("price", e.target.value)}
            fullWidth
            margin="normal"
          />
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button sx={{ color: '#320001', background: '#dad0d0', border: '1px solid #320001'}} variant="outlined" onClick={closeNewProductDrawer}>
              Cancelar
            </Button>
            <Button sx={{ color: '#fff', background: '#320001'}} variant="contained" onClick={saveProduct}>
              {editingProduct ? "Guardar Cambios" : "Agregar"}
            </Button>
          </Box>
        </Box>
      </Drawer>


      <Fab
        className="boton-flotante"
        color="primary"
        aria-label="add"
        onClick={() => setIsNewProductDrawerOpen(true)}
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        <AddIcon />
      </Fab>
    </div>
    </BoxPrimary>
  );
};

export default Product;
