import React, { useEffect, useState } from "react";
import {
  Navbar,
  Home,
  Products,
  Cart,
  Footer,
  ProductDetails,
  Checkout,
} from "./components/index";
import {
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
  Container,
  Typography,
  CircularProgress,
} from "@mui/material";
import { commerce } from "./lib/commerce";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

let theme = createTheme();
theme = responsiveFontSizes(theme);

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  const handleAddCart = async (productId, quantity, variantId, optionId) => {
    const { cart } = await commerce.cart.add(productId, quantity, {
      [variantId]: optionId,
    });
    setCart(cart);
  };

  const handleUpdateQty = async (productId, quantity, variantId, optionId) => {
    const { cart } = await commerce.cart.update(productId, {
      quantity: quantity,
      [variantId]: optionId,
    });
    setCart(cart);
  };

  const handleRemoveItem = async (productId) => {
    const { cart } = await commerce.cart.remove(productId);
    setCart(cart);
  };

  const deleteCart = async () => {
    setCart(await commerce.cart.empty());
  };

  const refreshCart = async () => {
    const newCart = commerce.cart.refresh();
    setCart(newCart);
  };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      );
      setOrder(incomingOrder);
      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  if (!products.length) {
    return (
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
        }}
      >
        <CircularProgress color="inherit" />
        <Typography variant="h5">Loading...</Typography>
      </Container>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar totalitems={cart.total_items} />
        <Routes>
          <Route
            exact
            element={
              <>
                <Home />
                <Products products={products} onAddToCart={handleAddCart} />
              </>
            }
            path="/"
          />
          <Route
            element={
              <Cart
                cart={cart}
                onUpdateCartQty={handleUpdateQty}
                onRemoveItem={handleRemoveItem}
                onRemoveAll={deleteCart}
              />
            }
            path="/cart"
          />
          <Route
            element={
              <Products products={products} onAddToCart={handleAddCart} />
            }
            path="/products"
          />
          <Route
            element={
              <ProductDetails products={products} onAddToCart={handleAddCart} />
            }
            path="/product/:id"
          />
          <Route
            element={
              <Checkout
                cart={cart}
                order={order}
                handleCaptureCheckout={handleCaptureCheckout}
                error={errorMessage}
                setOrder={setOrder}
              />
            }
            path="/cart/checkout"
          />
        </Routes>
      </Router>
      <Footer />
    </ThemeProvider>
  );
};

export default App;
