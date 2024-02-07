import { useState, useEffect } from "react";
import axios from "axios";
import booksRsp from "../api_responses/home-response.json";
import { useStore } from "../store/store";
import { BASE_URL } from "../variables";

export default function useGetBooks() {
  const [books, setBooks] = useState(null);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/home`)
      .then((res) => {
        console.log("------------response-----", res.data);
        setBooks([...res.data]);
      })
      .catch(() => {
        console.log("------------response-----", booksRsp);
        setBooks([...booksRsp]);
      });
  }, []);

  const selCategory = useStore((state) => state.category);
  const updateBooksData = useStore((state) => state.updateBooksData);

  let selCategoryBooks = [];
  let booksList = [];
  let totalBooks = 0;
  if (selCategory !== "ALL") {
    selCategoryBooks = books?.filter(
      (book) => book.category.toUpperCase() === selCategory.toUpperCase()
    );
  } else {
    selCategoryBooks = books?.length > 0 && [...books];
  }
  updateBooksData(selCategoryBooks);
  return selCategoryBooks;
}
