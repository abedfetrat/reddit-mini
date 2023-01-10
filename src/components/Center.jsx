import { Grid } from "@mui/material";

function Center({ children }) {
  return (
    <Grid
      container
      width={1}
      height={1}
      justifyContent="center"
      alignContent="center"
    >
      {children}
    </Grid>
  );
}

export default Center;
