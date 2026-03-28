import { createContext, useState, useEffect, useCallback } from "react";
import cartService from "../services/cartService";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totals, setTotals] = useState({ subtotal: 0, tax: 0, total: 0 });
  const [loading, setLoading] = useState(true);

  const fetchCart = useCallback(async () => {
    try {
      setLoading(true);
      const data = await cartService.getCart();
      setCartItems(data.items || []);
      setTotals({
          subtotal: data.subtotal || 0,
          tax: data.tax || 0,
          total: data.total || 0,
      });
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const updateQuantity = async (itemId, quantity) => {
    if (quantity < 1) return;
    try {
      const data = await cartService.updateCartItem(itemId, quantity);
      if (data.items) {
        setCartItems(data.items);
        setTotals({
            subtotal: data.subtotal || 0,
            tax: data.tax || 0,
            total: data.total || 0,
        });
      } else {
        await fetchCart();
      }
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      const data = await cartService.removeCartItem(itemId);
      if (data.items) {
        setCartItems(data.items);
        setTotals({
            subtotal: data.subtotal || 0,
            tax: data.tax || 0,
            total: data.total || 0,
        });
      } else {
        await fetchCart();
      }
    } catch (error) {
      console.error("Failed to remove from cart:", error);
    }
  };

  const addToCart = async (product, quantity = 1) => {
    try {
      const data = await cartService.addToCart(
        product.id || product.productId,
        quantity,
        product.color,
        product.size
      );
      if (data.items) {
        setCartItems(data.items);
        setTotals({
            subtotal: data.subtotal || 0,
            tax: data.tax || 0,
            total: data.total || 0,
        });
      } else {
        await fetchCart();
      }
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      ...totals,
      loading,
      updateQuantity,
      removeFromCart,
      addToCart,
      refreshCart: fetchCart
    }}>
      {children}
    </CartContext.Provider>
  );
};
