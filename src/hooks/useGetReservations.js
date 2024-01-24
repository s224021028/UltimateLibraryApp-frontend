import { useState, useEffect } from "react";
import ReserveResp from "../api_responses/user-view-reservations-response.json";
import axios from "axios";

const BASE_URL="https://onedrive.live.com/?authkey=%21ACcvQjo0JeZuH7U&cid=47D3B2D6AF52A4EC&id=47D3B2D6AF52A4EC%212969&parId=47D3B2D6AF52A4EC%212961&o=OneUp"

export default function useGetReservations(){
    const [reservations, setReservations]=useState(null)

    useEffect(()=>{
        axios
        .get(BASE_URL)
        .then((res)=>{
            console.log("Response", ReserveResp);
            setReservations([...ReserveResp])
        })
        .catch(()=>{
            console.log("Response", ReserveResp);
            setReservations([...ReserveResp])
        })
    }, [])

    return reservations;
}
