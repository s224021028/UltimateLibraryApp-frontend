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

// function createData(_id, book_id, issue_date, status, user_id) {
//   return { _id, book_id, issue_date, status, user_id};
//  }


export default function CustomizedTables() {
  const reservations = useGetReservations();

  if (!reservations) {
    return null;
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
              <StyledTableCell style={{width:'20%'}}>{reservation.book_id}</StyledTableCell>
              <StyledTableCell>{reservation.issue_date}</StyledTableCell>
              <StyledTableCell>{reservation.issue_date}</StyledTableCell>
              <StyledTableCell style={{width: '20%'}}>{reservation.status}</StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}