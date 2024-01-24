import * as React from "react";
import {
  CardActionArea,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

export default function BookCard({ bookDetails }) {
  console.log("-------bookDetails-------", bookDetails);
  return (
    <Card sx={{ width: 160, height: 300}}>
      <CardActionArea>
        <img src={bookDetails.cover} width={160} height={200} alt='Large Pizza' />
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
  );
}
