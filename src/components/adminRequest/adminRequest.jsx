import AdminRequestList from '../AdminRequestList/adminRequestList'
export default function AdminRequest(){
    return(
            <AdminRequestList style={{ 
                width: "100%", 
                display: "flex", 
                backgroundColor:'white',
                alignItems: "center", 
                justifyContent: "center" }} />
    )
}