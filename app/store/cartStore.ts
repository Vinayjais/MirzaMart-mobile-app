import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

      clearCart: () => set({ cartItems: [] }),
    }),
    {
      name: "cart-storage", // 🔑 storage key
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
