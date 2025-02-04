import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  id: number;
  name: string;
  price: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
}

export const useCartStore = create(
  persist<CartStore>(
    (set) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          // Check if the item already exists in the cart
          const existingItemIndex = state.items.findIndex((i) => i.id === item.id);

          if (existingItemIndex !== -1) {
            // If the item exists, replace it with the new item (quantity will always be 1)
            const updatedItems = [...state.items];
            updatedItems[existingItemIndex] = { ...item, quantity: 1 };
            return { items: updatedItems };
          }

          // If the item doesn't exist, add it to the cart with quantity 1
          return { items: [...state.items, { ...item, quantity: 1 }] };
        }),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),
    }),
    {
      name: "cart-storage", // Unique name for localStorage
    }
  )
);