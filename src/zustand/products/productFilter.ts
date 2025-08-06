// store/useFormStore.ts
import { create } from "zustand";

interface FormState {
  location: string;
  category: string;
  experience: string;
  dosage: string;
  setLocation: (location: string) => void;
  setCategory: (category: string) => void;
  setExperience: (experience: string) => void;
  setDosage: (dosage: string) => void;
  reset: () => void;
}

const initialState = {
  location: "",
  category: "",
  experience: "",
  dosage: "",
};

export const useProductFilterState = create<FormState>((set) => ({
  ...initialState,
  setLocation: (location) => set({ location }),
  setCategory: (category) => set({ category }),
  setExperience: (experience) => set({ experience }),
  setDosage: (dosage) => set({ dosage }),
  reset: () => set(initialState),
}));
