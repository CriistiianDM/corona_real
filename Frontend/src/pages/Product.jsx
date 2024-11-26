import React, { useState, useEffect } from "react";
import { Grid, Card, CardContent, Typography, Button, Drawer, TextField, Box, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { getProducts, createProduct, updateProduct } from "../tools/api/inventory/api";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [transactionType, setTransactionType] = useState(""); // "compra", "venta", "obsolescencia"
  const [transactionAmount, setTransactionAmount] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [Updateproducts, setUpdateProducts] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);

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
    setIsDrawerOpen(false);
  };

  const handleTransaction = async () => {
    // Crear el producto actualizado para obsolescencia
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
    <div style={{ display: "flex" }}>
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
                maxWidth: 250,
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
                  src={product.imageUrl}
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
                <Button variant="contained" color="primary" sx={{ flex: 1, marginBottom: 1 }} onClick={() => openDrawer(product, "compra")}>
                  Compra
                </Button>
                <Button variant="contained" color="secondary" sx={{ flex: 1, marginBottom: 1 }} onClick={() => openDrawer(product, "venta")}>
                  Venta
                </Button>
                <Button variant="contained" color="warning" sx={{ flex: 1, marginBottom: 1 }} onClick={() => openDrawer(product, "obsolescencia")}>
                  Obsolescencia
                </Button>
                <Button variant="contained" color="info" sx={{ flex: 1, marginBottom: 1 }} onClick={() => openEditDrawer(product)}>
                  Editar
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Drawer para Transacciones */}
      <Drawer anchor="right" open={isDrawerOpen} onClose={closeDrawer}>
        <Box sx={{ width: 300, padding: 3, marginTop: 10 }}>
          <Typography variant="h5" gutterBottom>
            {transactionType === "compra" ? "¿Cuántos desea comprar?" : "¿Confirmar la operación?"}
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
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button variant="outlined" onClick={closeDrawer}>
              Cancelar
            </Button>
            <Button variant="contained" color="primary" onClick={handleTransaction}>
              Aceptar
            </Button>
          </Box>
        </Box>
      </Drawer>

      {/* Drawer para agregar producto */}
      <Drawer anchor="right" open={isNewProductDrawerOpen} onClose={closeNewProductDrawer}>
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
            <Button variant="outlined" onClick={closeNewProductDrawer}>
              Cancelar
            </Button>
            <Button variant="contained" onClick={saveProduct}>
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
  );
};

export default Product;
