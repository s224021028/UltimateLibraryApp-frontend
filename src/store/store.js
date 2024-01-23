import { create } from "zustand";

export const useStore = create((set) => ({
  category: "ALL",
  updateCategory: (selCategory) =>
    set((state) => ({
      category: selCategory,
    })),
}));
