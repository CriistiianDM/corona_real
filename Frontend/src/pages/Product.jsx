import React, { useState } from "react";
import { Grid, Card, CardContent, Typography, Button } from "@mui/material";

const initialProducts = [
  { name: "Coca Cola", quantity: 30 },
  { name: "Doritos", quantity: 15 },
  { name: "Manzana", quantity: 50 },
  // Agrega más productos aquí
  // Los nombres de los productos deben ser igual al del archivo PNG
];

const Product = () => {
  const [products, setProducts] = useState(initialProducts);

  const updateQuantity = (index, amount) => {
    const updatedProducts = products.map((product, i) =>
      i === index ? { ...product, quantity: product.quantity + amount } : product
    );
    setProducts(updatedProducts);
  };

  return (
    <Grid container spacing={3}>
      {products.map((product, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={product.name}>
          <Card>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <img
                src={`/public/${product.name}.png`}
                alt={product.name}
                style={{ width: 100, height: 100 }}
              />
              <Typography variant="h6" sx={{ mt: 2 }}>{product.name}</Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>Cantidad: {product.quantity}</Typography>
              <Button variant="contained" onClick={() => updateQuantity(index, 1)}>
                +1
              </Button>
              <Button variant="contained" onClick={() => updateQuantity(index, -1)} sx={{ mt: 1 }}>
                -1
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Product;
