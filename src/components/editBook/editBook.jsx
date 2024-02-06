import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid, TextareaAutosize, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import bookInfoResp from "../../api_responses/book-info-response.json";

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

export default function EditBook(props) {
  console.log("----edit--props--------", props);
  const { closeEditBookDialog, editBookDetails, handleEditBook } = props;
  //   const bookInfo = useGetBookInfo(bookId);
console.log("---editBookDetails 1------", editBookDetails);
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

  const [bookDetails, setBookDetails] = React.useState({
    ...editBookDetails
  });

  React.useEffect(() => {
    axios
      .get("BASE_URL")
      .then((res) => {
        console.log("bookInfoResp", bookInfoResp);
        setBookDetails(bookInfoResp);
        setPreview(bookInfoResp.cover);
      })
      .catch(() => {
        console.log("bookInfoResp", bookInfoResp);
        setBookDetails(bookInfoResp);
        setPreview(bookInfoResp.cover);
      });
  }, []);

  //setBookDetails({...editBookDetails});

  const [file, setFile] = React.useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the first file
    console.log("---file------", file);
    setFile(file);
    const fileData = new FileReader();

    fileData.onload = function () {
      setPreview(fileData.result);
      console.log("----file data-----", fileData.result);
      setBookDetails({ ...bookDetails, cover: fileData.result });
    };
    fileData.readAsDataURL(file);
  };

  return (
    <Dialog onClose={closeEditBookDialog} open={true}>
      <DialogTitle>Edit Book</DialogTitle>
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
          value={bookDetails.title}
          onChange={(e) => {
            setBookDetails({ ...bookDetails, title: e.target.value });
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
          value={bookDetails.author}
          onChange={(e) => {
            setBookDetails({ ...bookDetails, author: e.target.value });
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
          value={bookDetails.category}
          onChange={(e) => {
            setBookDetails({ ...bookDetails, category: e.target.value });
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
          value={bookDetails.language}
          onChange={(e) => {
            setBookDetails({ ...bookDetails, language: e.target.value });
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
          value={bookDetails.edition}
          onChange={(e) => {
            setBookDetails({ ...bookDetails, edition: e.target.value });
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
          value={bookDetails.count}
          onChange={(e) => {
            setBookDetails({ ...bookDetails, count: parseInt(e.target.value) });
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
        <Grid container spacing={3} justifyContent={"start"}>
          <Grid item spacing={3}>
            {preview && <img src={preview} width={100} height={120} alt="book" />}
          </Grid>
          </Grid>
        
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
          value={bookDetails.description}
          onChange={(e) => {
            setBookDetails({
              ...bookDetails,
              description: e.target.value,
            });
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={closeEditBookDialog}>
          Cancel
        </Button>
        <Button
          variant="contained"
          style={{ backgroundColor: "#54989C" }}
          onClick={() => {
            handleEditBook({ ...bookDetails });
          }}
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}
