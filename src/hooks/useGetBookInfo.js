import { useState, useEffect } from "react";
import bookInfoResp from "../api_responses/book-info-response.json";
import axios from "axios";

const BASE_URL =
  "https://onedrive.live.com/?authkey=%21ACcvQjo0JeZuH7U&cid=47D3B2D6AF52A4EC&id=47D3B2D6AF52A4EC%212969&parId=47D3B2D6AF52A4EC%212961&o=OneUp";

export default function useGetBookInfo(bookId) {
  console.log("------bookId---------");
  const [bookInfo, setBookInfo] = useState(null);

  useEffect(() => {
    axios
      .get(BASE_URL)
      .then((res) => {
        console.log("bookInfoResp", bookInfoResp);
        setBookInfo(bookInfoResp);
      })
      .catch(() => {
        console.log("bookInfoResp", bookInfoResp);
        setBookInfo(bookInfoResp);
      });
  }, []);

  return bookInfo;
}
