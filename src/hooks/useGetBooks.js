import { useState, useEffect } from "react";
import axios from "axios";
import booksRsp from "../api_responses/home-response.json";
import { useStore } from "../store/store";
const BASE_URL =
  "https://onedrive.live.com/?authkey=%21ACcvQjo0JeZuH7U&cid=47D3B2D6AF52A4EC&id=47D3B2D6AF52A4EC%212962&parId=47D3B2D6AF52A4EC%212961&o=OneUp";

export default function useGetBooks() {
  const [books, setBooks] = useState(null);

  useEffect(() => {
    axios
      .get(BASE_URL)
      .then((res) => {
        console.log("------------response-----", booksRsp);
        setBooks([...booksRsp]);
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
