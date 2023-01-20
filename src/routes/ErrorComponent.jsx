import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button, Typography } from "@mui/material";
import { Link, useRouteError } from "react-router-dom";
import Center from "../components/Center";

function ErrorComponent() {
  const error = useRouteError();

  return (
    <Center>
      <div>
        <Typography
          variant="h2"
          component="h1"
          textAlign="center"
          marginBottom={3}
        >
          {error.status}
          <Typography variant="h5" paragraph>
            {error.statusText}
          </Typography>
        </Typography>
        <Button
          startIcon={<ArrowBackIcon />}
          variant="outlined"
          component={Link}
          to="/"
        >
          Go back to home
        </Button>
      </div>
    </Center>
  );
}

export default ErrorComponent;
