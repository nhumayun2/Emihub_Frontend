import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { IProduct } from "@/types";

// Define the shape of a single item in the cart
export interface CartItem {
  product: IProduct;
  quantity: number;
}

// 1. Define the shape of our cart state
interface CartState {
  items: CartItem[];
  // We can add total price, etc. here later
}

// 2. Define the shape of our actions (functions to change state)
interface CartActions {
  addItem: (product: IProduct, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
}

// 3. Define the initial state
const initialState: CartState = {
  items: [],
};

// 4. Create the store
export const useCartStore = create<CartState & CartActions>()(
  // 5. Use the 'persist' middleware
  persist(
    (set) => ({
      ...initialState,

      // --- Implement Actions ---

      addItem: (product, quantity) =>
        set((state) => {
          // Check if the item is already in the cart
          const existingItem = state.items.find(
            (item) => item.product._id === product._id
          );

          if (existingItem) {
            // If it exists, update its quantity
            const updatedItems = state.items.map((item) =>
              item.product._id === product._id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
            return { items: updatedItems };
          } else {
            // If it's a new item, add it to the array
            const newItem: CartItem = { product, quantity };
            return { items: [...state.items, newItem] };
          }
        }),

      removeItem: (productId) =>
        set((state) => ({
          // Filter out the item with the matching productId
          items: state.items.filter(
            (item) => item.product._id !== productId
          ),
        })),

      clearCart: () => set(initialState), // Reset state to initial values
    }),
    {
      // 6. Configure the persistence
      name: "emihub-cart-storage", // Unique name for localStorage key
      storage: createJSONStorage(() => localStorage), // Use localStorage
    }
  )
);