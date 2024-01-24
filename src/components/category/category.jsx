import ButtonGroup from "@mui/material-next/ButtonGroup";
import { Button } from "@mui/material";
import { useStore } from "../../store/store";

export default function Category() {


  const selCategory = useStore(state => state.category);
  const updateCategory = useStore(state => state.updateCategory);
  const genres = ['ALL', 'Fantasy', 'Science Fiction', 'Horror', 'Romance', 'Suspense and Thriller', 'Fiction'];

  return (
    <ButtonGroup variant='elevated'>
      {genres.map((genre, index) => (
        <Button
          key={genre}
          sx={{
            color: selCategory === genre ? 'white' : 'black',
            marginLeft: index === 0 ? '20px' : 0,
            marginRight: index === genres.length-1 ? '20px' : 0,
            backgroundColor: selCategory === genre && '#54989C',
            '&:hover': {
              color: selCategory !== genre ? '#54989C' : 'white',
              backgroundColor: selCategory === genre && '#54989C',
            },
          }}
          onClick={() => updateCategory(genre)}
        >
          {genre}
        </Button>
      ))}
    </ButtonGroup>
  );
}
