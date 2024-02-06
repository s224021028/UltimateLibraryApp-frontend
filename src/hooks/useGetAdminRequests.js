

import { useState, useEffect } from "react";
import AdminRequestResp from '../api_responses/admin-view-requests-response.json'
import axios from "axios";

const BASE_URL="https://onedrive.live.com/?authkey=%21ACcvQjo0JeZuH7U&cid=47D3B2D6AF52A4EC&id=47D3B2D6AF52A4EC%213042&parId=47D3B2D6AF52A4EC%212961&o=OneUp"
export default function useGetAdminRequests(){
    const [adminRequests, setAdminRequests]=useState(null)

    useEffect(()=>{
        axios
        .get(BASE_URL)
        .then((res)=>{
            console.log("Response", AdminRequestResp);
            setAdminRequests([...AdminRequestResp])
        })
        .catch(()=>{
            console.log("Response", AdminRequestResp);
            setAdminRequests([...AdminRequestResp])
        })
    }, [])

    return adminRequests;
}
