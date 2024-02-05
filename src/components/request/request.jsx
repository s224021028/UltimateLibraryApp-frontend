import { Box } from "@mui/material";
import RequestList from '../requestList/requestList'

export default function Request(){
    return(
            <RequestList style={{ 
                width: "100%", 
                display: "flex", 
                backgroundColor:'white',
                alignItems: "center", 
                justifyContent: "center" }} />
    )
}