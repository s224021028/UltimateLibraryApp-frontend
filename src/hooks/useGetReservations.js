import { useState, useEffect } from "react";
import ReserveResp from "../api_responses/user-view-reservations-response.json";
import axios from "axios";
import { BASE_URL } from "../variables";

export default function useGetReservations() {
  const [reservations, setReservations] = useState(null);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/user/view/reservations`)
      .then((res) => {
        console.log("----get reservation success----", res);
        setReservations([...res.data]);
      })
      .catch(() => {
        console.log("Response", ReserveResp);
        setReservations([...ReserveResp]);
      });
  }, []);

  return reservations;
}
