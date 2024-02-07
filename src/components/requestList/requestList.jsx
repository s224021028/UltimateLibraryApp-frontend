import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useGetBooks from "../../hooks/useGetBooks";
import { Button, Box } from "@mui/material";
import RequestForm from "../requestForms/requestForm";
import { useState } from "react";
import { BASE_URL } from "../../variables";
import axios from "axios";
import RequestResp from "../../api_responses/user-view-requests-response.json";

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
  const [requests, setRequests] = useState([]);

  React.useEffect(() => {
    axios
      .get(`${BASE_URL}/user/view/requests`)
      .then((res) => {
        console.log("---get user requests success---", res);
        setRequests([...res.data]);
      })
      .catch((err) => {
        console.log("---get user requests failed---", err);
        setRequests([...RequestResp]);
      });
  }, []);
  //const requests = useGetRequests();
  const books = useGetBooks();
  const [requestFormOpen, setRequestFormOpen] = useState(false);

  const onClickRequest = () => {
    setRequestFormOpen(true);
  };

  const handleRequestSave = (newRequest) => {
    console.log("-----request book-----", newRequest);
    //setRequests([...requests, newRequest]);

    axios
      .post(`${BASE_URL}/user/make/request`, {...newRequest})
      .then((res) => {
        console.log("---post user requests success---", res);
        //setRequests([...res.data]);
      })
      .catch((err) => {
        console.log("---post user requests failed---", err);
        //setRequests([...RequestResp]);
      });

    axios
      .get(`${BASE_URL}/user/view/requests`)
      .then((res) => {
        console.log("---get user requests success---", res);
        setRequests([...res.data]);
      })
      .catch((err) => {
        console.log("---get user requests failed---", err);
        setRequests([...RequestResp]);
      });
    closeRequestDialog();
  };

  const closeRequestDialog = () => {
    setRequestFormOpen(!requestFormOpen);
  };

  if (!requests || !books) {
    return null;
  }

  function formatDate(dateString) {
    const options = { day: "numeric", month: "numeric", year: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "en-GB",
      options
    );
    return formattedDate;
  }

  function calculateExpiryDate(issuedate) {
    const issueDate = new Date(issuedate);
    const expiryDate = new Date(issueDate);

    expiryDate.setDate(issueDate.getDate() + 366);
    const options = { day: "numeric", month: "numeric", year: "numeric" };
    const ExpiryFomattedDate = expiryDate.toLocaleDateString("en-GB", options);
    return ExpiryFomattedDate;
  }

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 720 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>S.No</StyledTableCell>
              <StyledTableCell>Title</StyledTableCell>
              <StyledTableCell>Placed</StyledTableCell>
              <StyledTableCell>Expires</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Additional Information</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests &&
              requests.map((request) => (
                <TableRow key={request.book_id}>
                  <StyledTableCell component="th" scope="row">
                    {request.request_id}
                  </StyledTableCell>
                  <StyledTableCell style={{ width: "20%" }}>
                    {request.book_title}
                  </StyledTableCell>
                  <StyledTableCell>{formatDate(request.date)}</StyledTableCell>
                  <StyledTableCell>
                    {calculateExpiryDate(request.date)}
                  </StyledTableCell>
                  <StyledTableCell style={{ width: "20%" }}>
                    {request.status}
                  </StyledTableCell>
                  <StyledTableCell>
                    <ul> User ID: {request.user_id} </ul>
                    <ul>Author : {request.book_author}</ul>
                    <ul>Language: {request.book_language}</ul>
                    <ul>ISBN: {request.isbn} </ul>
                  </StyledTableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        sx={{
          backgroundColor: "#54989C",
          color: "white",
          margin: 5,
          marginLeft: "45%",
        }}
        onClick={onClickRequest}
      >
        Request A Book
      </Button>

      {requestFormOpen && (
        <RequestForm
          handleRequestSave={handleRequestSave}
          closeRequestDialog={closeRequestDialog}
        />
      )}
    </Box>
  );
}
