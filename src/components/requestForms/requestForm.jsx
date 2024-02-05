import * as React from 'react';
import Box from '@mui/material/Box';
import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useState } from 'react';
import { Button, TextField } from '@mui/material';

export default function ComposedTextField() {

    const [RequestFormClose, setRequestFormClose]=useState();

  const onClickRequest =()=>{
    setRequestFormClose(false);
  }

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

        {/* <Box sx={{margin:4,
        display:'flex',
        justifyContent:'space-around',
        alignItems:'center'
        }}>
        <Button
        style={{ 
            backgroundColor:'#54989C',
            color:'white',
            }}

        onClick={onClickRequest}
        >
            Close
        </Button>
        <Button
        style={{ 
            backgroundColor:'#54989C',
            color:'white',
            }}
        >
            Submit
        </Button>
        </Box> */}
    </Box>
  );
}