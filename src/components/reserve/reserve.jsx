import { Box } from "@mui/material";
import ReservationList from "../reserveList/reserveList";

export default function Reservation(){
    return(
            <ReservationList style={{ 
                width: "100%", 
                display: "flex", 
                backgroundColor:'white',
                alignItems: "center", 
                justifyContent: "center" }} />
    )
}