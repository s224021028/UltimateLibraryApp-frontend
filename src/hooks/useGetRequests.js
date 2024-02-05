

import { useState, useEffect } from "react";
import RequestResp from '../api_responses/user-view-requests-response.json'
import axios from "axios";

const BASE_URL="https://onedrive.live.com/?authkey=%21ACcvQjo0JeZuH7U&cid=47D3B2D6AF52A4EC&id=47D3B2D6AF52A4EC%213038&parId=47D3B2D6AF52A4EC%212961&o=OneUp"
export default function useGetRequests(){
    const [requests, setRequests]=useState(null)

    useEffect(()=>{
        axios
        .get(BASE_URL)
        .then((res)=>{
            console.log("Response", RequestResp);
            setRequests([...RequestResp])
        })
        .catch(()=>{
            console.log("Response", RequestResp);
            setRequests([...RequestResp])
        })
    }, [])

    return requests;
}
