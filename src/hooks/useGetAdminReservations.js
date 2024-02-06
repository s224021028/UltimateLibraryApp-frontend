import { useState, useEffect } from "react";
import AdminReserveResp from '../api_responses/admin-view-reservations-response.json'
import axios from "axios";

const BASE_URL="https://onedrive.live.com/?authkey=%21ACcvQjo0JeZuH7U&cid=47D3B2D6AF52A4EC&id=47D3B2D6AF52A4EC%213043&parId=47D3B2D6AF52A4EC%212961&o=OneUp"

export default function useGetAdminReservations(){
    const [adminReservations, setAdminReservations]=useState(null)

    useEffect(()=>{
        axios
        .get(BASE_URL)
        .then((res)=>{
            console.log("Response", AdminReserveResp);
            setAdminReservations([...AdminReserveResp])
        })
        .catch(()=>{
            console.log("Response", AdminReserveResp);
            setAdminReservations([...AdminReserveResp])
        })
    }, [])

    return adminReservations;
}
