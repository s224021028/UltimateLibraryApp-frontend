import { useState } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import useGetBookInfo from "../../hooks/useGetBookInfo";
import { Grid } from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function DeleteBook(props) {
  // console.log("------props--------", props);
  const { closeDeleteBookDialog, selected, handleDelete } = props;

  return (
    <BootstrapDialog
      //onClose={closeDialog}
      aria-labelledby="customized-dialog-title"
      open={true}
    >
      <DialogContent>
        <Typography>Are you sure you want to  delete {selected.length} books</Typography>
      </DialogContent>
      <DialogContent>
        <Grid container spacing={3} justifyContent={"end"}>
          <Grid item spacing={3}>
             <Button onClick={closeDeleteBookDialog} variant="outlined">No</Button>
          <Button onClick={handleDelete} variant="contained" style={{backgroundColor:"#54989C", marginLeft:"10px"}}>Yes</Button>
        </Grid>
          </Grid>
      </DialogContent>
    </BootstrapDialog>
  );
}
