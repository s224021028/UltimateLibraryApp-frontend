import { useState, useEffect } from "react";
import AdminReserveResp from "../api_responses/admin-view-reservations-response.json";
import axios from "axios";
import { BASE_URL } from "../variables";

export default function useGetAdminReservations() {
  const [adminReservations, setAdminReservations] = useState(null);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/admin/view/reservations`)
      .then((res) => {
        console.log("-----admin view reservations success-------", res);
        setAdminReservations([...res.data]);
      })
      .catch((err) => {
        console.log("----admin view reservations failed-----", err);
        setAdminReservations([...AdminReserveResp]);
      });
  }, []);

  return adminReservations;
}
