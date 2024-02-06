import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import useGetAdminRequests from '../../hooks/useGetAdminRequests';
import { Button, Box } from '@mui/material';

const StyledTableCell = styled(TableCell)(() => ({
  
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#D9D9D9",
    color: 'black',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    wordWrap:'break-word',
    whiteSpace: 'normal',
  },
}));

export default function CustomizedTables() {
  const adminRequests = useGetAdminRequests();

  function formatDate(dateString) {
    const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString('en-GB', options);
    return formattedDate;
  }

  return (
    <Box>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 720, height:192 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>S.No</StyledTableCell>
            <StyledTableCell>Title</StyledTableCell>
            <StyledTableCell>Additional Information</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {adminRequests && adminRequests.map((adminRequest) => (
            <TableRow key={adminRequest.book_id}>
              <StyledTableCell component="th" scope="row">{adminRequest.request_id}</StyledTableCell>
              <StyledTableCell style={{width:'20%'}}>{adminRequest.book_title}</StyledTableCell>
              <StyledTableCell
              sx={{display:'flex',
              flexDirection:'row',
              justifyContent:'space-around'

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
                    display:"flex",
                    flexDirection:'column',
                    justifyContent:'center'
                }}
                >
                    <Button
                    sx={{
                        backgroundColor:'#54989C',
                        color:'white',
                        '&:hover': {
                            backgroundColor: '#3e868c',
                        },
                        borderRadius:20,
                        margin:1
                    }}
                    >Accept</Button>
                    <Button
                    sx={{backgroundColor:'#54989C',
                    color:'white',
                    '&:hover': {
                        backgroundColor: '#3e868c',
                    },
                    borderRadius:20,
                    margin:1
                }}

                    >Decline</Button>
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