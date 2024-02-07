import { useState, useEffect } from "react";
import bookInfoResp from "../api_responses/book-info-response.json";
import axios from "axios";
import { BASE_URL } from "../variables";

export default function useGetBookInfo(bookId) {
  console.log("------bookId---------");
  const [bookInfo, setBookInfo] = useState(null);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/view/book?book_id=${bookId}`)
      .then((res) => {
        console.log("------bookInfoResp--hook----", res);
        if (res?.data) {
          setBookInfo({ ...res.data });
        } else {
          setBookInfo({ ...res });
        }
      })
      .catch((err) => {
        console.log("----error bookInfoResp--hook---", err);
        setBookInfo(bookInfoResp);
      });
  }, []);

  return bookInfo;
}
