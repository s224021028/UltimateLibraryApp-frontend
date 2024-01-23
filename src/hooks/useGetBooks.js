import { useState, useEffect } from "react";
import axios from "axios";
import booksRsp from "../api_responses/home-response.json";

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

  return books;
}
