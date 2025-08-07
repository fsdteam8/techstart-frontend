import { create } from "zustand";

interface Price {
  unit: string;
  quantity: number;
  price: number;
}

interface QuantityState {
  quantity: number;
  setQuantity: (value: number) => void;
  price?: Price; // Optional price property
  setPrice?: (value: Price) => void; // Optional setter for price
}

const useCartStore = create<QuantityState>((set) => ({
  quantity: 1, // Initial quantity
  setQuantity: (value: number) => set({ quantity: value }),
  price: undefined, // Initial price is undefined
  setPrice: (value: Price) => set({ price: value }),
}));

export default useCartStore;
