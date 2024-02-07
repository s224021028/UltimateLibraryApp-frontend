import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import { visuallyHidden } from "@mui/utils";
import AddBook from "../addBook/addBook";
import { useStore } from "../../store/store";
import { Button } from "@mui/material";
import axios from "axios";
import DeleteBook from "../deleteBook/deleteBook";
import EditBook from "../editBook/editBook";
import { BASE_URL } from "../../variables";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
  {
    id: "cover",
    numeric: false,
    disablePadding: true,
    label: "Book",
  },
  {
    id: "title",
    numeric: false,
    disablePadding: false,
    label: "Title",
  },
  {
    id: "author",
    numeric: false,
    disablePadding: false,
    label: "Author",
  },
  {
    id: "category",
    numeric: false,
    disablePadding: false,
    label: "Category",
  },
  {
    id: "book_id",
    numeric: false,
    disablePadding: false,
    label: "ID",
  },
  {
    id: "edit",
    numeric: false,
    disablePadding: false,
    label: "Edit",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    rows,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox"></TableCell>
        {headCells?.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            style={{ fontWeight: 600 }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  rows: PropTypes.func.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected, rows, discardRows, tempBooks, selected } = props;
  const closeAddNewBook = useStore((state) => state.closeAddNewBook);
  const updateBooksData = useStore((state) => state.updateBooksData);

  const isDeleteBook = useStore((state) => state.isDeleteBook);
  const closeDeleteBook = useStore((state) => state.closeDeleteBook);

  // save new books
  const handleSave = () => {
    console.log("-------save books--------", tempBooks);
    axios
      .post(`${BASE_URL}/admin/add/books`, tempBooks)
      .then((response) => {
        // Handle the response here
        console.log("Response:", response.data);
        updateBooksData([...response.data]);
      })
      .catch((error) => {
        // Handle the error here
        console.error("Error:", error);
        updateBooksData([...rows]);
      });
  };

  // dicard changes
  const handleDiscard = () => {
    discardRows();
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        ></Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon onClick={() => {
              //open delete dialog 
              closeDeleteBook(true)
            } } />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Add">
          <>
            <IconButton>
              <AddCircleOutlineIcon
                onClick={() => {
                  //open add new dialog
                  closeAddNewBook(true);
                }}
              />
            </IconButton>
            <Button onClick={handleDiscard} variant="outlined">
              Discard
            </Button>
            <Button
              onClick={handleSave}
              variant="contained"
              style={{ background: "#54989C", marginLeft: "12px" }}
            >
              Save
            </Button>
          </>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  rows: PropTypes.func.isRequired,
  discardRows: PropTypes.func.isRequired,
  tempBooks: PropTypes.func.isRequired,
  selected: PropTypes.func.isRequired,
};

export default function AdminCatalog() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("title");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const isAddNewBook = useStore((state) => state.isAddNewBook);
  const closeAddNewBook = useStore((state) => state.closeAddNewBook);

  const isDeleteBook = useStore((state) => state.isDeleteBook);
  const closeDeleteBook = useStore((state) => state.closeDeleteBook);

  const isEditBook = useStore((state) => state.isEditBook);
  const closeEditBook = useStore((state) => state.closeEditBook);

  const [deleteBookIds, setDeleteBookIds] = React.useState([]);
  const [rows, setRows] = React.useState([]);

  const [editBookDetails, setEditBookDetails] = React.useState([]);

  const closeAddNewBookDialog = () => {
    closeAddNewBook(!isAddNewBook);
    //setBookId(null);
  };

  const closeEditBookDialog = () => {
    closeEditBook(!isEditBook);
    //setBookId(null);
  };

  const closeDeleteBookDialog = () => {
    closeDeleteBook(!isDeleteBook);
    setSelected([]);
  };

  const booksData = useStore((state) => state.booksData);
  const updateBooksData = useStore((state) => state.updateBooksData);

  const handleEditBook = (editedBookDetails) => {
    console.log("---------handleEditBook---------", editedBookDetails);

    axios
      .post(`${BASE_URL}/admin/update/book`, editedBookDetails)
      .then((response) => {
        // Handle the response here
        console.log("Response:", response.data);
      })
      .catch((error) => {
        // Handle the error here
        console.error("Error:", error);
      });

    const updatedRows = rows.map((row) => {
      if (row.book_id === editedBookDetails.book_id) {
        console.log("-----match--------", editedBookDetails)
        return editedBookDetails;
      }
      else {
        return row;
      }
    });
    console.log("---------new updatedRows-----", updatedRows);
    setRows([...updatedRows]);
    updateBooksData([...updatedRows]);
    closeEditBookDialog();
  }

  //delete book
  const handleDelete = () => {
    console.log("---delete--selected-------", selected);
    const data = [...selected];
    axios.get(`${BASE_URL}/admin/delete/books?data=${data}`)
      .then(response => {
        // Handle success
        console.log('Deleted successfully', response);
      })
      .catch(error => {
        // Handle error
        console.error('There was an error!', error);
      });

    closeDeleteBookDialog();
    let newRows = rows.filter((row) => {
      if (selected.indexOf(row.book_id) === -1) {
        return row;
      }
    })
    console.log("-----newRows-----", newRows);
    setRows([...newRows]);
    updateBooksData(newRows);
  }

  
  const [tempBooks, setTempBooks] = React.useState([]);

  console.log("---adminCatalogBooks------", rows);

  React.useEffect(() => {
    console.log("--------use effect--------");
    booksData.length > 0 && setRows([...booksData]);
  }, [booksData]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows?.map((n) => n.book_id);
      console.log("----rows secled----", rows)
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  function stableSort(array, comparator) {
    const stabilizedThis =
      array.length > 0 ? array?.map((el, index) => [el, index]) : rows;
    stabilizedThis?.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis?.map((el) => el[0]);
  }

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    console.log("---selectedIndex---", selectedIndex)
    console.log("---newSelected---", newSelected)
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const addNewBook = (bookDetails) => {
    console.log("--------new book details-----", bookDetails);
    setRows([...rows, bookDetails]);
    setTempBooks([...tempBooks, bookDetails]);
  };

  const discardRows = () => {
    setRows([...booksData]);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows =
    rows &&
    stableSort(rows, getComparator(order, orderBy)).slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );

  if (!rows) {
    return null;
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        {isAddNewBook && (
          <AddBook
            closeAddNewBookDialog={closeAddNewBookDialog}
            addNewBook={addNewBook}
          />
        )}
        {isDeleteBook && (
          <DeleteBook
            closeDeleteBookDialog={closeDeleteBookDialog}
            selected={selected}
            handleDelete = {handleDelete}
          />
        )}
        {isEditBook && (
          <EditBook
            closeEditBookDialog={closeEditBookDialog}
            editBookDetails={editBookDetails}
            handleEditBook = {handleEditBook}
          />
        )}
        <EnhancedTableToolbar
          numSelected={selected.length}
          rows={rows}
          discardRows={discardRows}
          tempBooks={tempBooks}
          selected = {selected}
        />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              rows={rows}
            />
            <TableBody>
              {visibleRows?.map((row, index) => {
                const isItemSelected = isSelected(row.book_id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.book_id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="normal"
                    >
                      <img
                        src={row.cover}
                        width={100}
                        height={120}
                        alt="book"
                      />
                    </TableCell>
                    <TableCell align="left">{row.title}</TableCell>
                    <TableCell align="left">{row.author}</TableCell>
                    <TableCell align="left">{row.category}</TableCell>
                    <TableCell align="left">{row.book_id}</TableCell>
                    <TableCell align="left">
                      <IconButton>
                        <EditIcon
                          onClick={(e) => {
                            e.stopPropagation();
                            closeEditBook(true);
                            setEditBookDetails({...row})
                          }}
                        />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
