import { useState, useEffect } from "react";
import axios from "axios";
import booksRsp from "../api_responses/home-response.json";

const BASE_URL =
  "https://onedrive.live.com/?authkey=%21ACcvQjo0JeZuH7U&cid=47D3B2D6AF52A4EC&id=47D3B2D6AF52A4EC%212962&parId=47D3B2D6AF52A4EC%212961&o=OneUp";

export default function useGetBooks(from, count) {
  const [books, setBooks] = useState(null);
  const startIndex = (from - 1) * 10;
  const endIndex = startIndex + count;
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

  const booksList = books?.slice(startIndex, endIndex);
  const totalBooks = books?.length;

  return { booksList, totalBooks };
}
