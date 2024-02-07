import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

export default function Notification({ handleCloseNotification, message }) {
    const [open, setOpen] = useState(true);
    React.useEffect(() => {
        setTimeout(() => {
            setOpen(false);
        }, 3000)
    },[])
  return (
    <Box sx={{ width: 500 }}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        onClose={() => {
          handleCloseNotification();
          setOpen(false);
        }}
        message={message}
        onClick={() => {
          handleCloseNotification();
          setOpen(false);
        }}
      />
    </Box>
  );
}
