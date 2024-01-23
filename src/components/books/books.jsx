import BookCard from "../bookCard/bookCard";
import { Box } from "@mui/material";
import useGetBooks from "../../hooks/useGetBooks"

const BASE_URL = "https://onedrive.live.com/";

export default function Books() {
    const booksList = useGetBooks();
    console.log("--------books--------", booksList)
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        p: 1,
        m: 1,
        bgcolor: "#f5f5f5",
        borderRadius: 1,
        height: "400px",
      }}
    >
      <BookCard />
      <div style={{ marginRight: "20px" }} />
      <BookCard />
      <div style={{ marginRight: "20px" }} />
          <BookCard />
          {/* {
              booksList && booksList.map((book) => (
                  <div style={{ marginRight: "20px" }} ><BookCard /></div>
              ))
          } */}
    </Box>
  );
}
