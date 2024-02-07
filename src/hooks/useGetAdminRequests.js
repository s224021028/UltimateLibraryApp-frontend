import { useState, useEffect } from "react";
import AdminRequestResp from "../api_responses/admin-view-requests-response.json";
import axios from "axios";
import { BASE_URL } from "../variables";

export default function useGetAdminRequests() {
  const [adminRequests, setAdminRequests] = useState(null);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/admin/view/requests`)
      .then((res) => {
        console.log("---get admin requets success---", res);
        setAdminRequests([...res.data]);
      })
      .catch((err) => {
        console.log("---get admin requets failed---", err);
        setAdminRequests([...AdminRequestResp]);
      });
  }, []);

  return adminRequests;
}
