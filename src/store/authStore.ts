import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { IUser } from "@/types"; // Import our User type

// 1. Define the shape of our state
interface AuthState {
  user: IUser | null;
  token: string | null;
}

// 2. Define the shape of our actions (functions to change state)
interface AuthActions {
  login: (user: IUser, token: string) => void;
  logout: () => void;
}

// 3. Define the initial state
const initialState: AuthState = {
  user: null,
  token: null,
};

// 4. Create the store
export const useAuthStore = create<AuthState & AuthActions>()(
  // 5. Use the 'persist' middleware
  persist(
    (set) => ({
      ...initialState, // Set the initial state

      // Implement the 'login' action
      login: (user, token) => {
        set({ user, token });
      },

      // Implement the 'logout' action
      logout: () => {
        set(initialState); // Reset state back to initial values
      },
    }),
    {
      // 6. Configure the persistence
      name: "emihub-auth-storage", // Unique name for localStorage key
      storage: createJSONStorage(() => localStorage), // Use localStorage
    }
  )
);