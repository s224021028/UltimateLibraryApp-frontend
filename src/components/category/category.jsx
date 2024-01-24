import ButtonGroup from "@mui/material-next/ButtonGroup";
import { Button } from "@mui/material";

export default function Category() {
  return (
    <ButtonGroup variant="elevated">
      <Button
        sx={{
          color: "White",
          marginLeft: "20px",
          backgroundColor: "#54989C",
        }}
      >
        All
      </Button>
      <Button sx={{ color: "black" }}>Sci-Fi</Button>
      <Button sx={{ color: "black" }}>Fantasy</Button>
      <Button sx={{ color: "black" }}>Fiction</Button>
      <Button
        sx={{
          marginRight: "20px",
          color: "black",
        }}
      >
        Comedy
      </Button>
    </ButtonGroup>
  );
}
