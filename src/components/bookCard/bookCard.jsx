import {useState} from "react";
import {
  CardActionArea,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import BookInfo from "../bookInfo/bookInfo";

export default function BookCard({ bookDetails }) {
  console.log("-------bookDetails-------", bookDetails);
  const [open, setOpen] = useState(false);
  const [bookId, setBookId] = useState(null);

  const handleClick = () => {
    console.log("-------book clicked------");
    setOpen(true);
    setBookId(bookDetails.book_id);
  }

  const closeDialog = () => {
    setOpen(false);
    setBookId(null);
  }
  
  return (
    <>
    <Card sx={{ width: 160, height: 300}} onClick={handleClick}>
      <CardActionArea>
        <img src={bookDetails.cover} width={160} height={200} alt="book"/>
        <CardContent>
          <Typography gutterBottom variant="title" component="div">
            {bookDetails.title.toUpperCase()}
          </Typography>
          <Typography variant="inherit" color="text.secondary">
            {bookDetails.author}
          </Typography>
        </CardContent>
      </CardActionArea>
      </Card>
      <BookInfo closeDialog={closeDialog} bookId={bookId} open={open} />
      </>
  );
}
