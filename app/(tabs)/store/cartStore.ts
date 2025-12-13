import { create } from "zustand";

export const useCartStore = create((set) => ({
  cart: [],

  addToCart: (item:any) =>
    set((state: any) => {
      const found = state.cart.find((x) => x.id === item.id);
      if (found) {
        return {
          cart: state.cart.map((x) =>
            x.id === item.id ? { ...x, qty: x.qty + 1 } : x
          ),
        };
      }
      return { cart: [...state.cart, { ...item, qty: 1 }] };
    }),

  removeOne: (id) =>
    set((state) => ({
      cart: state.cart
        .map((x) => (x.id === id ? { ...x, qty: x.qty - 1 } : x))
        .filter((x) => x.qty > 0),
    })),

  getTotalCount: () =>
    set((state) => state.cart.reduce((sum, item) => sum + item.qty, 0)),
}));
