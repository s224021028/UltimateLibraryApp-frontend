import BookCard from "../bookCard/bookCard";
import { Box, Grid } from "@mui/material";
import useGetBooks from "../../hooks/useGetBooks";
import { useState } from "react";
import Pagination from "@mui/material/Pagination";
import Category from "../category/category";

export default function Books() {
  const [page, setPage] = useState(1);
  const { booksList, totalBooks } = useGetBooks(page, 12);
  console.log("--------books--------", booksList);
  const handleChange = (event, value) => {
    setPage(value);
  };

  if (!booksList) {
    return null;
  }
  return (
    <Box sx={{ marginTop: "-10px" }}>
      <Grid
        container
        spacing={4}
        justifyContent={"space-between"}
        sx={{ marginBottom: "20px" }}
      >
        <Grid item justifyContent={"space-between"}>
          <Category />
        </Grid>
        <Grid item justifyContent={"space-between"}>
          <Pagination
            count={Math.ceil(totalBooks / 12)}
            page={page}
            onChange={handleChange}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3} justifyContent={"center"}>
        {booksList &&
          booksList.map((book) => (
            <Grid item spacing={3}>
              <BookCard bookDetails={book} />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}
