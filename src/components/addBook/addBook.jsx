import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextareaAutosize, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function AddBook(props) {
  console.log("------props--------", props);
  const { closeAddNewBookDialog, addNewBook } = props;
  //   const bookInfo = useGetBookInfo(bookId);

  const [preview, setPreview] = React.useState(null);

  const initialBookData = {
    title: "",
    author: "",
    cover: "",
    description: "",
    language: "",
    edition: "",
    count: 0,
    category: "",
  };

  const [newBookDetails, setNewBookDetails] = React.useState({
    ...initialBookData,
  });

  const [file, setFile] = React.useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the first file
    console.log("---file------", file);
    setFile(file);
    const fileData = new FileReader();

    fileData.onload = function () {
      setPreview(fileData.result);
      console.log("----file data-----", fileData.result);
      setNewBookDetails({ ...newBookDetails, cover: fileData.result });
    };
    fileData.readAsDataURL(file);
  };

  const handleCancel = () => {
    setNewBookDetails({ ...initialBookData });
    closeAddNewBookDialog();
  };

  return (
    <Dialog onClose={closeAddNewBookDialog} open={true}>
      <DialogTitle>Add New Book</DialogTitle>
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
          value={newBookDetails.title}
          onChange={(e) => {
            setNewBookDetails({ ...newBookDetails, title: e.target.value });
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
          value={newBookDetails.author}
          onChange={(e) => {
            setNewBookDetails({ ...newBookDetails, author: e.target.value });
          }}
        />
        <TextField
          autoFocus
          required
          margin="dense"
          id="category"
          name="category"
          label="Category"
          type="text"
          fullWidth
          variant="standard"
          value={newBookDetails.category}
          onChange={(e) => {
            setNewBookDetails({ ...newBookDetails, category: e.target.value });
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
          value={newBookDetails.language}
          onChange={(e) => {
            setNewBookDetails({ ...newBookDetails, language: e.target.value });
          }}
        />
        <TextField
          autoFocus
          required
          margin="dense"
          id="edition"
          name="edition"
          label="Edition"
          type="text"
          fullWidth
          variant="standard"
          value={newBookDetails.edition}
          onChange={(e) => {
            setNewBookDetails({ ...newBookDetails, edition: e.target.value });
          }}
        />
        <TextField
          autoFocus
          required
          margin="dense"
          id="count"
          name="count"
          label="Count"
          type="number"
          fullWidth
          variant="standard"
          value={newBookDetails.count}
          onChange={(e) => {
            setNewBookDetails({ ...newBookDetails, count: e.target.value });
          }}
        />
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
          style={{
            backgroundColor: "#54989C",
            marginTop: "16px",
            marginBottom: "16px",
          }}
        >
          Upload Cover Image
          <VisuallyHiddenInput type="file" onChange={handleFileChange} />
        </Button>
        {file && <Typography>{file.name}</Typography>}
        {preview && <img src={preview} width={100} height={120} alt="book" />}
        <Typography>Description</Typography>
        <TextareaAutosize
          minRows={3}
          maxRows={5}
          style={{ width: "500px" }}
          autoFocus
          required
          margin="dense"
          id="description"
          name="description"
          label="Description"
          type="text"
          fullWidth
          variant="standard"
          value={newBookDetails.description}
          onChange={(e) => {
            setNewBookDetails({
              ...newBookDetails,
              description: e.target.value,
            });
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleCancel}>
          Cancel
        </Button>
        <Button
          variant="contained"
          style={{ backgroundColor: "#54989C" }}
          onClick={() => {
            addNewBook({ ...newBookDetails });
            closeAddNewBookDialog();
          }}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
