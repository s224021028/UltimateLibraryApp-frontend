import { Box } from "@mui/material";
import AdminReservationList from '../adminReservationsList/adminReservationsList'

export default function AdminReservation(){
    return(
            <AdminReservationList style={{ 
                width: "100%", 
                display: "flex", 
                backgroundColor:'white',
                alignItems: "center", 
                justifyContent: "center" }} />
    )
}