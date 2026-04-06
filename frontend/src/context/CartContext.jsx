import { createContext, useState, useEffect, useCallback } from "react";
import cartService from "../services/cartService";
import toast from "react-hot-toast";
import { useAuth } from "./AuthContext";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totals, setTotals] = useState({ subtotal: 0, tax: 0, total: 0 });
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  const fetchCart = useCallback(async () => {
    try {
      setLoading(true);
      const data = await cartService.getCart();
      const cart = data.cart || {};
      setCartItems(cart.items || []);
      setTotals({
        subtotal: cart.subtotal || 0,
        tax: cart.tax || 0,
        total: cart.total || 0,
      });
    } catch (error) {
      console.error("Failed to fetch cart:", error);
      toast.error("Không thể tải giỏ hàng");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    } else {
      setCartItems([]);
      setTotals({ subtotal: 0, tax: 0, total: 0 });
      setLoading(false);
    }
  }, [fetchCart, isAuthenticated]);

  const updateQuantity = async (itemId, quantity) => {
    if (quantity < 1) return;
    try {
      const data = await cartService.updateCartItem(itemId, quantity);
      const cart = data.cart || {};
      if (cart.items) {
        setCartItems(cart.items);
        setTotals({
          subtotal: cart.subtotal || 0,
          tax: cart.tax || 0,
          total: cart.total || 0,
        });
      } else {
        await fetchCart();
      }
    } catch (error) {
      console.error("Failed to update quantity:", error);
      toast.error("Không thể cập nhật số lượng");
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      const data = await cartService.removeCartItem(itemId);
      const cart = data.cart || {};
      if (cart.items) {
        setCartItems(cart.items);
        setTotals({
          subtotal: cart.subtotal || 0,
          tax: cart.tax || 0,
          total: cart.total || 0,
        });
      } else {
        await fetchCart();
      }
      toast.success("Đã xóa khỏi giỏ hàng");
    } catch (error) {
      console.error("Failed to remove from cart:", error);
      toast.error("Không thể xóa sản phẩm");
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
      const cart = data.cart || {};
      if (cart.items) {
        setCartItems(cart.items);
        setTotals({
          subtotal: cart.subtotal || 0,
          tax: cart.tax || 0,
          total: cart.total || 0,
        });
      } else {
        await fetchCart();
      }
      toast.success("Đã thêm vào giỏ hàng!");
    } catch (error) {
      console.error("Failed to add to cart:", error);
      toast.error("Không thể thêm vào giỏ hàng");
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
