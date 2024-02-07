import { useState } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import useGetBookInfo from "../../hooks/useGetBookInfo";
import { Grid } from "@mui/material";
import axios from "axios";
import { BASE_URL } from "../../variables";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function BookInfo(props) {
  console.log("------props--------", props);
  const { closeDialog, open, bookId } = props;
  const bookInfo = useGetBookInfo(bookId);

  console.log("----bookInfo hook-------", bookInfo);

  const [isReserved, setIsReserved] = useState(false);

  const handleReserve = () => {
    axios.post(`${BASE_URL}/user/make/reservation`, {book_id:bookId}).then((res) => {
      console.log("------book reserve request success------");
      setIsReserved(true);
    }).catch((err) => {
      console.log("------book reserve request failed------");
      setIsReserved(true);
    })
  }

  if (!bookInfo) {
    return null;
  }

  return (
    <BootstrapDialog
      onClose={closeDialog}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Book Information
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={closeDialog}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <Grid container spacing={3} justifyContent={"center"}>
          <Grid item spacing={3}>
            <img src={bookInfo.cover} width={140} height={170} alt="book" />
        </Grid>
                  
          <Grid item spacing={3}>
            <Typography gutterBottom variant="title" component="div" style={{fontWeight:"600"}}>
              {bookInfo.title.toUpperCase()}
            </Typography>
            <Typography variant="inherit" color="text.secondary">
              {bookInfo.author}
            </Typography>
            <Typography variant="inherit">{bookInfo.category}</Typography>
            <Button disabled={isReserved} variant="contained" size="small" style={{backgroundColor:"#54989C", marginTop:"50px"}} onClick={handleReserve}>
              {isReserved ? "Reserve request sent":"Reserve"}
            </Button>
          </Grid>
          
        </Grid>
      </DialogContent>
      <DialogContent dividers>
        <b>About</b>
        <Typography gutterBottom>{bookInfo.description}</Typography>
      </DialogContent>
    </BootstrapDialog>
  );
}
