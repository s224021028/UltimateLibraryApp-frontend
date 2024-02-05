import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import {TextField } from '@mui/material';

export default function ComposedTextField() {

  return (
    <Box
      component="form"
      autoComplete="off"

      sx={{
        display:'flow'}}
    >
        <InputLabel required>Title</InputLabel>
        <TextField fullWidth id="component-simple" placeholder='Title of the Book' />

        <InputLabel required>Author</InputLabel>
        <TextField fullWidth id="component-simple" placeholder='Author of the Book' />

        <InputLabel>Language</InputLabel>
        <TextField fullWidth id="component-simple" placeholder='Language of the Book' />

        <InputLabel>ISBN</InputLabel>
        <TextField fullWidth id="component-simple" placeholder='ISBN of the Book' />
    </Box>
  );
}