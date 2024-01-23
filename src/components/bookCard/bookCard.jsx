import * as React from "react";
import {
  CardActionArea,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

export default function BookCard() {
  return (
    <Card sx={{ maxWidth: 150, maxHeight: 200 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="100"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="book1"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Book 1
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Author
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
