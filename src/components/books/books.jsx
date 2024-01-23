import BookCard from "../bookCard/bookCard";
import { Box, Grid } from "@mui/material";
import useGetBooks from "../../hooks/useGetBooks";
import Category from "../category/category";

export default function Books() {
  const booksList = useGetBooks();
  console.log("--------books--------", booksList);

  if (!booksList) {
    return null;
  }
  return (
    <Box sx={{ marginTop: "-10px" }}>
      <Grid
        container
        spacing={4}
        justifyContent={"center"}
        sx={{ marginBottom: "20px" }}
      >
        <Grid item justifyContent={"center"}>
          <Category />
        </Grid>
      </Grid>

      <Grid container spacing={3} justifyContent={"center"}>
        {booksList &&
          booksList.map((book) => (
            <Grid item spacing={3} key={book.book_id}>
              <BookCard bookDetails={book} />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}
