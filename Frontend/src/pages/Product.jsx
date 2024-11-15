import React, { useState } from "react";
import { Grid, Card, CardContent, Typography, Button, Drawer, TextField, Box, Fab } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

const initialProducts = [
  { id: 1, name: "Coca Cola", quantity: 30, type_product: 1, stock: 30, price: 1000, isActive: true, imageUrl: "/public/Coca Cola.webp" },
  { id: 2, name: "Doritos", quantity: 15, type_product: 1, stock: 15, price: 2000, isActive: true, imageUrl: "/public/Doritos.webp" },
  { id: 3, name: "Manzana", quantity: 50, type_product: 2, stock: 50, price: 500, isActive: true, imageUrl: "/public/Manzana.webp" },
  // Agrega más productos aquí
];

const Product = () => {
  const [products, setProducts] = useState(initialProducts);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [transactionType, setTransactionType] = useState(""); // "compra", "venta", o "obsolescencia"
  const [transactionAmount, setTransactionAmount] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [isNewProductDrawerOpen, setIsNewProductDrawerOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: "", quantity: 0, type_product: 0, stock: 0, price: 0, imageUrl: "" });
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
            stock: transactionType === "obsolescencia"
              ? Math.max(0, product.stock - transactionAmount)
              : product.stock
          }
        : product
    );
    setProducts(updatedProducts);
    closeDrawer();
  };

  const handleAmountChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value, 10));
    if ((transactionType === "venta" || transactionType === "obsolescencia") && value > selectedProduct.stock) {
      setErrorMessage("No hay stock disponible para realizar la operación");
      setTransactionAmount(selectedProduct.stock);
    } else {
      setErrorMessage("");
      setTransactionAmount(value);
    }
  };

  const openEditDrawer = (product) => {
    setSelectedProduct(product);
    setIsEditDrawerOpen(true);
    setNewProduct({ ...product });
    setImagePreview(product.imageUrl); // Mostrar la imagen actual al editar
  };

  const closeEditDrawer = () => {
    setIsEditDrawerOpen(false);
    setSelectedProduct(null);
  };

  const handleEditProductChange = (field, value) => {
    setNewProduct({ ...newProduct, [field]: value });
  };

  const updateProduct = () => {
    const updatedProducts = products.map(product =>
      product.id === newProduct.id ? newProduct : product
    );
    setProducts(updatedProducts);
    closeEditDrawer();
  };

  const openNewProductDrawer = () => {
    setIsNewProductDrawerOpen(true);
    setNewProduct({ name: "", quantity: 0, type_product: 0, stock: 0, price: 0, imageUrl: "" });
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
                <Button variant="contained" color="info" sx={{ flex: 1 }} onClick={() => openEditDrawer(product)}>
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
              <Typography variant="h5">Confirmar Obsolescencia para {selectedProduct?.name}</Typography>
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
            </>
          )}
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button variant="outlined" onClick={closeDrawer}>Cancelar</Button>
            <Button variant="contained" color="primary" onClick={handleTransaction}>Aceptar</Button>
          </Box>
        </Box>
      </Drawer>

      {/* Drawer para Editar Producto */}
      <Drawer anchor="right" open={isEditDrawerOpen} onClose={closeEditDrawer}>
        <Box sx={{ width: 300, padding: 3, marginTop: 10 }}>
          <Typography variant="h5" gutterBottom>Editar Producto</Typography>
          <TextField
            label="Nombre"
            value={newProduct.name}
            onChange={(e) => handleEditProductChange('name', e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Cantidad"
            type="number"
            value={newProduct.quantity}
            onChange={(e) => handleEditProductChange('quantity', parseInt(e.target.value, 10))}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Tipo de Producto"
            value={newProduct.type_product}
            onChange={(e) => handleEditProductChange('type_product', parseInt(e.target.value, 10))}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Stock"
            type="number"
            value={newProduct.stock}
            onChange={(e) => handleEditProductChange('stock', parseInt(e.target.value, 10))}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Precio"
            type="number"
            value={newProduct.price}
            onChange={(e) => handleEditProductChange('price', parseFloat(e.target.value))}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" component="label" sx={{ marginTop: 2 }}>
            Subir Imagen
            <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
          </Button>
          {imagePreview && (
            <img src={imagePreview} alt="Vista Previa" style={{ width: "100%", marginTop: 10, maxHeight: 100, objectFit: "contain" }} />
          )}
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button variant="outlined" onClick={closeEditDrawer}>Cancelar</Button>
            <Button variant="contained" onClick={updateProduct}>Actualizar</Button>
          </Box>
        </Box>
      </Drawer>

      {/* Drawer para Agregar Producto */}
      <Drawer anchor="right" open={isNewProductDrawerOpen} onClose={closeNewProductDrawer}>
        <Box sx={{ width: 300, padding: 3, marginTop: 10 }}>
          <Typography variant="h5" gutterBottom>Agregar Producto</Typography>
          <TextField
            label="Nombre"
            value={newProduct.name}
            onChange={(e) => handleNewProductChange('name', e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Cantidad"
            type="number"
            value={newProduct.quantity}
            onChange={(e) => handleNewProductChange('quantity', parseInt(e.target.value, 10))}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Tipo de Producto"
            value={newProduct.type_product}
            onChange={(e) => handleNewProductChange('type_product', parseInt(e.target.value, 10))}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Stock"
            type="number"
            value={newProduct.stock}
            onChange={(e) => handleNewProductChange('stock', parseInt(e.target.value, 10))}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Precio"
            type="number"
            value={newProduct.price}
            onChange={(e) => handleNewProductChange('price', parseFloat(e.target.value))}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" component="label" sx={{ marginTop: 2 }}>
            Subir Imagen
            <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
          </Button>
          {imagePreview && (
            <img src={imagePreview} alt="Vista Previa" style={{ width: "100%", marginTop: 10, maxHeight: 100, objectFit: "contain" }} />
          )}
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button variant="outlined" onClick={closeNewProductDrawer}>Cancelar</Button>
            <Button variant="contained" onClick={addNewProduct}>Agregar</Button>
          </Box>
        </Box>
      </Drawer>

      <Fab color="primary" aria-label="add" onClick={openNewProductDrawer} sx={{ position: "fixed", bottom: 16, right: 16 }}>
        <AddIcon />
      </Fab>
    </div>
  );
};

export default Product;
