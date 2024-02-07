import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AdminRequestResp from "../../api_responses/admin-view-requests-response.json";
import { Button, Box, Typography, Grid } from "@mui/material";
import axios from "axios";
import { BASE_URL } from "../../variables";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#D9D9D9",
    color: "black",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    wordWrap: "break-word",
    whiteSpace: "normal",
  },
}));

export default function CustomizedTables() {
  const [adminRequests, setAdminRequests] = React.useState([]);
  const getRequests = () => {
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
  };
  React.useEffect(() => {
    getRequests();
  }, []);

  const updateRequest = (requestId, status) => {
    axios
      .post(`${BASE_URL}/admin/update/request`, {
        request_id: requestId,
        status: status,
      })
      .then((res) => {
        console.log("---post admin requets success---", res);
        getRequests();
      })
      .catch((err) => {
        console.log("---post admin requets failed---", err);
        setAdminRequests([...AdminRequestResp]);
      });
  };

  function formatDate(dateString) {
    const options = { day: "numeric", month: "numeric", year: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "en-GB",
      options
    );
    return formattedDate;
  }

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 720, height: 192 }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>S.No</StyledTableCell>
              <StyledTableCell>Title</StyledTableCell>
              <StyledTableCell>Additional Information</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {adminRequests &&
              adminRequests.map((adminRequest) => (
                <TableRow key={adminRequest.book_id}>
                  <StyledTableCell component="th" scope="row">
                    {adminRequest.request_id}
                  </StyledTableCell>
                  <StyledTableCell style={{ width: "20%" }}>
                    {adminRequest.book_title}
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box>
                      <ul>Placed Date: {formatDate(adminRequest.date)}</ul>
                      <ul> User ID: {adminRequest.user_id} </ul>
                      <ul>Author : {adminRequest.book_author}</ul>
                      <ul>Language: {adminRequest.book_language}</ul>
                      <ul>ISBN: {adminRequest.isbn} </ul>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <Typography style={{ marginLeft: "50px" }}>{adminRequest.status}</Typography>
                      {
                        adminRequest.status === "Received" && <Grid container spacing={3} justifyContent={"start"}>
                        <Grid item spacing={3}>
                          <Button
                            size="small"
                            sx={{
                              backgroundColor: "#54989C",
                              color: "white",
                              "&:hover": {
                                backgroundColor: "#3e868c",
                              },
                              borderRadius: 20,
                              margin: 1,
                            }}
                            onClick={() => {
                              updateRequest(
                                adminRequest.request_id,
                                "Processing"
                              );
                            }}
                          >
                            Accept
                          </Button>
                          <Button
                            size="small"
                            onClick={() => {
                              updateRequest(
                                adminRequest.request_id,
                                "Declined"
                              );
                            }}
                            sx={{
                              backgroundColor: "#54989C",
                              color: "white",
                              "&:hover": {
                                backgroundColor: "#3e868c",
                              },
                              borderRadius: 20,
                              margin: 1,
                            }}
                          >
                            Decline
                          </Button>
                        </Grid>
                      </Grid>
                      }
                      
                    </Box>
                  </StyledTableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
