import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],

      addToCart: (item: any) =>
        set((state: any) => {
          const found = state.cartItems.find((x) => x.id === item.id);
          if (found) {
            return {
              cartItems: state.cartItems.map((x) =>
                x.id === item.id ? { ...x, qty: x.qty + 1 } : x
              ),
            };
          }
          return { cartItems: [...state.cartItems, { ...item, qty: 1 }] };
        }),

      removeOne: (id: any) =>
        set((state: any) => ({
          cartItems: state.cartItems
            .map((x) => (x.id === id ? { ...x, qty: x.qty - 1 } : x))
            .filter((x) => x.qty > 0),
        })),

      // remove entire item from cart
      removeItem: (id: any) =>
        set((state: any) => ({ cartItems: state.cartItems.filter((x) => x.id !== id) })),

      clearCart: () => set({ cartItems: [] }),
    }),
    {
      name: "cart-storage", // 🔑 storage key
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
