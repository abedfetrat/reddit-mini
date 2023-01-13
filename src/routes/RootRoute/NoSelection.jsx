import { Typography } from "@mui/material";
import Center from "../../components/Center";

function NoSelection() {
  return (
    <Center>
      <Typography fontSize={18} fontWeight={500} color="grey">
        Select a subreddit from the menu to view posts
      </Typography>
    </Center>
  );
}

export default NoSelection;
