import { create } from "zustand";

export const useStore = create((set) => ({
  category: "ALL",
  updateCategory: (selCategory) =>
    set((state) => ({
      category: selCategory,
    })),
  isAddNewBook: false,
  closeAddNewBook: (status) =>
    set((state) => ({
      isAddNewBook: status,
    })),
  isDeleteBook: false,
  closeDeleteBook: (status) =>
    set((state) => ({
      isDeleteBook: status,
    })),
  booksData: [],
  updateBooksData: (bookDetails) =>
    set((state) => ({
      booksData: bookDetails,
    })),
}));
