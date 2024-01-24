import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useGetReservations from '../../hooks/useGetReservations';
import useGetBooks from '../../hooks/useGetBooks';

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
  const reservations = useGetReservations();
  const books= useGetBooks();

  if (!reservations || !books) {
    return null;
  }

  function formatDate(dateString) {
    const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString('en-GB', options);
    return formattedDate;
  }

  function calculateExpiryDate(issuedate){
    const issueDate= new Date(issuedate);
    const expiryDate= new Date(issueDate);

    expiryDate.setDate(issueDate.getDate()+30);
    const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    const ExpiryFomattedDate=expiryDate.toLocaleDateString('en-GB', options)
    return ExpiryFomattedDate
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
            <StyledTableCell>Placed</StyledTableCell>
            <StyledTableCell>Expires</StyledTableCell>
            <StyledTableCell>Status</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reservations && reservations.map((reservation) => (
            <TableRow key={reservation.book_id}>
              <StyledTableCell component="th" scope="row">{reservation.reservation_id}</StyledTableCell>
              <StyledTableCell style={{width:'20%'}}>{getBookTitles(reservation.book_id)}</StyledTableCell>
              <StyledTableCell>{formatDate(reservation.issue_date)}</StyledTableCell>
              <StyledTableCell>{calculateExpiryDate(reservation.issue_date)}</StyledTableCell>
              <StyledTableCell style={{width: '20%'}}>{reservation.status}</StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}