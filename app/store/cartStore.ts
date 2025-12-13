import { create } from "zustand";

export const useCartStore = create((set) => ({
    cartItems: [],

  addToCart: (item:any) =>
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

}));
