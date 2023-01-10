import { Box, Button, Typography } from "@mui/material";
import ErrorIcon from "@mui/icons-material/ErrorOutline";

function Error({ text, retry }) {
  return (
    <Box textAlign="center">
      <ErrorIcon fontSize="large" htmlColor="grey" />
      <Typography fontSize={18} fontWeight={500} color="grey" sx={{ my: 2 }}>
        {text}
      </Typography>
      {retry && <Button onClick={retry}>Retry</Button>}
    </Box>
  );
}

export default Error;
