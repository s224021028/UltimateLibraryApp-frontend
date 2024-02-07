import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function RequestForm({ handleRequestSave, closeRequestDialog }) {
  const initialBookRequestData = {
    book_title: "",
    book_author: "",
    isbn: "",
    book_language: "",
  };

  const [newBookRequestDetails, setNewBookRequestDetails] = React.useState({
    ...initialBookRequestData,
  });

  return (
    <Dialog onClose={closeRequestDialog} open={true}>
      <DialogTitle>Request A New Book</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          required
          margin="dense"
          id="title"
          name="title"
          label="Title"
          type="text"
          fullWidth
          variant="standard"
          value={newBookRequestDetails.book_title}
          onChange={(e) => {
            setNewBookRequestDetails({
              ...newBookRequestDetails,
              book_title: e.target.value,
            });
          }}
        />
        <TextField
          autoFocus
          required
          margin="dense"
          id="author"
          name="author"
          label="Author"
          type="text"
          fullWidth
          variant="standard"
          value={newBookRequestDetails.book_author}
          onChange={(e) => {
            setNewBookRequestDetails({
              ...newBookRequestDetails,
              book_author: e.target.value,
            });
          }}
        />
        <TextField
          autoFocus
          required
          margin="dense"
          id="isbn"
          name="isbn"
          label="ISBN"
          type="text"
          fullWidth
          variant="standard"
          value={newBookRequestDetails.isbn}
          onChange={(e) => {
            setNewBookRequestDetails({
              ...newBookRequestDetails,
              isbn: e.target.value,
            });
          }}
        />
        <TextField
          autoFocus
          required
          margin="dense"
          id="language"
          name="language"
          label="Language"
          type="text"
          fullWidth
          variant="standard"
          value={newBookRequestDetails.book_language}
          onChange={(e) => {
            setNewBookRequestDetails({
              ...newBookRequestDetails,
              book_language: e.target.value,
            });
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          onClick={() => {
            setNewBookRequestDetails({ ...initialBookRequestData });
            closeRequestDialog();
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          style={{ backgroundColor: "#54989C" }}
          onClick={() => {
            handleRequestSave(newBookRequestDetails);
          }}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
