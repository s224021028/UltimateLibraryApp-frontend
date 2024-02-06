import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useGetAdminReservations from '../../hooks/useGetAdminReservations';
import useGetBooks from '../../hooks/useGetBooks';
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
  const adminReservations = useGetAdminReservations();
  const books= useGetBooks();

  if (!adminReservations || !books) {
    return null;
  }

  function formatDate(dateString) {
    const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString('en-GB', options);
    return formattedDate;
  }

  function getBookTitles(bookTitle){
    const book=books.find((book)=>book.book_id === bookTitle);
    return book ? book.title: "Not Found"
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 720 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>S.No</StyledTableCell>
            <StyledTableCell>Title</StyledTableCell>
            <StyledTableCell>Additional Information</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {adminReservations && adminReservations.map((adminReservation) => (
            <TableRow key={adminReservation.book_id}>
              <StyledTableCell component="th" scope="row">{adminReservation.reservation_id}</StyledTableCell>
              <StyledTableCell>{getBookTitles(adminReservation.book_id)}</StyledTableCell>
              <StyledTableCell
                sx={{display:'flex',
                flexDirection:'row',
                justifyContent:'space-between'
              }}>
                <Box>
                <ul>UserID : {adminReservation.user_id}</ul>
                <ul>{formatDate(adminReservation.issue_date)}</ul>
                </Box>
              <Box
              sx={{
                display:"flex",
                flexDirection:'column',
                justifyContent:'center'
            }}
              >
                    <Button
                    sx={{backgroundColor:'#54989C',
                    color:'white',
                    '&:hover': {
                        backgroundColor: '#3e868c',
                    },
                    borderRadius:20,
                }}
                    >{adminReservation.status}</Button>
                </Box>
              </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}