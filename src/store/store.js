import { create } from "zustand";

export const useStore = create((set) => ({
  userId: null,
  updateUserId: (userId) =>
    set((state) => ({
      userId: userId,
    })),
  isAdmin: "false",
  updateIsAdmin: (admin) =>
    set((state) => ({
      isAdmin: admin,
    })),
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
  isEditBook: false,
  closeEditBook: (status) =>
    set((state) => ({
      isEditBook: status,
    })),
  booksData: [],
  updateBooksData: (bookDetails) =>
    set((state) => ({
      booksData: bookDetails,
    })),
}));
