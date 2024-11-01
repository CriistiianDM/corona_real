import React, { useState } from "react";
import { Grid, Card, CardContent, Typography, Button, Drawer, TextField, Box, Fab, IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import UploadFileIcon from '@mui/icons-material/UploadFile';

const initialProducts = [
  { id: 1, name: "Coca Cola", quantity: 30, type_product: 1, stock: 30, price: 1000, iva: 0.19, isActive: true, imageUrl: "/public/Coca Cola.webp" },
  { id: 2, name: "Doritos", quantity: 15, type_product: 1, stock: 15, price: 2000, iva: 0.19, isActive: true, imageUrl: "/public/Doritos.webp" },
  { id: 3, name: "Manzana", quantity: 50, type_product: 2, stock: 50, price: 500, iva: 0.05, isActive: true, imageUrl: "/public/Manzana.webp" },
  // Agrega más productos aquí
];

const Product = () => {
  const [products, setProducts] = useState(initialProducts);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [transactionType, setTransactionType] = useState(""); // "compra" o "venta"
  const [transactionAmount, setTransactionAmount] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const [isNewProductDrawerOpen, setIsNewProductDrawerOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: "", quantity: 0, type_product: 0, stock: 0, price: 0, iva: 0.19, imageUrl: "" });
  const [imagePreview, setImagePreview] = useState(null);

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

  const handleTransaction = () => {
    const updatedProducts = products.map(product =>
      product.id === selectedProduct.id
        ? {
            ...product,
            quantity: transactionType === "compra"
              ? product.quantity + transactionAmount
              : Math.max(0, product.quantity - transactionAmount),
          }
        : product
    );
    setProducts(updatedProducts);
    closeDrawer();
  };

  const handleAmountChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value, 10));
    if (transactionType === "venta" && value > selectedProduct.stock) {
      setErrorMessage("No hay stock disponible para vender");
      setTransactionAmount(selectedProduct.stock);
    } else {
      setErrorMessage("");
      setTransactionAmount(value);
    }
  };

  const openNewProductDrawer = () => {
    setIsNewProductDrawerOpen(true);
    setNewProduct({ name: "", quantity: 0, type_product: 0, stock: 0, price: 0, iva: 0, imageUrl: "" });
    setImagePreview(null);
  };

  const closeNewProductDrawer = () => {
    setIsNewProductDrawerOpen(false);
  };

  const handleNewProductChange = (field, value) => {
    setNewProduct({ ...newProduct, [field]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      setNewProduct({ ...newProduct, imageUrl });
    }
  };

  const addNewProduct = () => {
    const newProductData = { ...newProduct, id: products.length + 1, isActive: true };
    setProducts([...products, newProductData]);
    closeNewProductDrawer();
  };

  return (
    <div style={{ display: "flex" }}>
      <Grid container spacing={3} style={{ flex: 1 }}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <Card sx={{ display: "flex", flexDirection: "column", alignItems: "center", padding: 1, textAlign: "center", height: "100%", maxWidth: 250 }}>
              <Box className="image-container" sx={{ width: "100%", maxHeight: 200, display: "flex", justifyContent: "center" }}>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  style={{ width: "100%", height: "100%", objectFit: "contain", maxHeight: 150 }}
                />
              </Box>
              <CardContent sx={{ width: "100%", padding: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: "1rem" }}>{product.name}</Typography>
                <Typography variant="body2" color="textSecondary">Cantidad: {product.quantity}</Typography>
                <Typography variant="body2" color="textSecondary">Precio: ${product.price}</Typography>
              </CardContent>
              <Box display="flex" justifyContent="space-around" width="100%" sx={{ padding: 1 }}>
                <Button variant="contained" color="primary" sx={{ flex: 1, marginRight: 1 }} onClick={() => openDrawer(product, "compra")}>
                  Compra
                </Button>
                <Button variant="contained" color="secondary" sx={{ flex: 1 }} onClick={() => openDrawer(product, "venta")}>
                  Venta
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Drawer para Transacciones */}
      <Drawer anchor="right" open={isDrawerOpen} onClose={closeDrawer}>
        <Box sx={{ width: 300, padding: 3, marginTop: 10 }}>
          {transactionType === "compra" ? (
            <>
              <Typography variant="h6" gutterBottom>¿Cuántos desea comprar?</Typography>
              <TextField
                label="Cantidad"
                type="number"
                value={transactionAmount}
                onChange={(e) => setTransactionAmount(Math.max(1, parseInt(e.target.value, 10)))}
                fullWidth
                margin="normal"
              />
            </>
          ) : (
            <>
              <Typography variant="h5">Editar Venta para {selectedProduct?.name}</Typography>
              <TextField
                label="Tipo de Producto"
                value={selectedProduct?.type_product || ""}
                fullWidth
                margin="normal"
                disabled
              />
              <TextField
                label="Stock"
                value={selectedProduct?.stock || ""}
                fullWidth
                margin="normal"
                disabled
              />
              <TextField
                label="Precio"
                value={selectedProduct?.price || ""}
                fullWidth
                margin="normal"
                disabled
              />
              <TextField
                label="IVA"
                value={selectedProduct?.iva || ""}
                fullWidth
                margin="normal"
                disabled
              />
              <TextField
                label="Cantidad a Vender"
                type="number"
                value={transactionAmount}
                onChange={handleAmountChange}
                fullWidth
                margin="normal"
                error={!!errorMessage}
                helperText={errorMessage}
              />
            </>
          )}
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button variant="outlined" onClick={closeDrawer}>Cancelar</Button>
            <Button variant="contained" color="primary" onClick={handleTransaction}>Aceptar</Button>
          </Box>
        </Box>
      </Drawer>

      {/* Drawer para Agregar Nuevo Producto */}
      <Drawer anchor="right" open={isNewProductDrawerOpen} onClose={closeNewProductDrawer}>
        <Box sx={{ width: 300, padding: 3, marginTop: 10 }}>
          <Typography variant="h5" gutterBottom>Agregar Nuevo Producto</Typography>
          <TextField
            label="Nombre"
            value={newProduct.name}
            onChange={(e) => handleNewProductChange("name", e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Cantidad"
            type="number"
            value={newProduct.quantity}
            onChange={(e) => handleNewProductChange("quantity", parseInt(e.target.value, 10))}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Tipo de Producto"
            type="number"
            value={newProduct.type_product}
            onChange={(e) => handleNewProductChange("type_product", parseInt(e.target.value, 10))}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Stock"
            type="number"
            value={newProduct.stock}
            onChange={(e) => handleNewProductChange("stock", parseInt(e.target.value, 10))}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Precio"
            type="number"
            value={newProduct.price}
            onChange={(e) => handleNewProductChange("price", parseInt(e.target.value, 10))}
            fullWidth
            margin="normal"
          />
          <TextField
            label="IVA"
            type="number"
            value={newProduct.iva}
            onChange={(e) => handleNewProductChange("iva", parseFloat(e.target.value))}
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            component="label"
            fullWidth
            sx={{ mt: 2 }}
            startIcon={<UploadFileIcon />}
          >
            Subir Imagen
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageUpload}
            />
          </Button>
          {imagePreview && (
            <Box mt={2} display="flex" justifyContent="center">
              <img src={imagePreview} alt="Vista previa" style={{ width: "100%", maxHeight: 150, objectFit: "contain" }} />
            </Box>
          )}
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button variant="outlined" onClick={closeNewProductDrawer}>Cancelar</Button>
            <Button variant="contained" color="primary" onClick={addNewProduct}>Agregar</Button>
          </Box>
        </Box>
      </Drawer>

      {/* Botón flotante para agregar nuevo producto */}
      <Fab color="primary" aria-label="add" onClick={openNewProductDrawer} style={{ position: "fixed", bottom: 16, right: 16 }}>
        <AddIcon />
      </Fab>
    </div>
  );
};

export default Product;
