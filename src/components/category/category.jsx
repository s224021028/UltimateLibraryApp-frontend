import ButtonGroup from "@mui/material-next/ButtonGroup";
import { Button, Box } from "@mui/material";
import Books from "../books/books";
import { Fragment } from "react";

export default function Category() {
  return (
    <Fragment>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          p: 1,
          m: 1,
          bgcolor: "background.paper",
          borderRadius: 1,
        }}
      >
        <ButtonGroup variant="elevated">
          <Button
            style={{
              color: "red",
              marginLeft: "20px",
              backgroundColor: "grey",
            }}
          >
            All
          </Button>
          <Button>Sci-Fi</Button>
          <Button>Fantasy</Button>
          <Button>Fiction</Button>
          <Button
            style={{
              marginRight: "20px",
            }}
          >
            Comedy
          </Button>
        </ButtonGroup>
      </Box>
      <Books />
    </Fragment>
  );
}
